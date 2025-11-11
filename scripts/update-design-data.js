#!/usr/bin/env node

/**
 * Update data/work/clean-designData.js to point to the latest Cloudinary assets
 * under the current cloud. Relies on asset ids remaining stable except for the
 * suffix Cloudinary adds when replacing files.
 */

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local", override: true });

const { v2: cloudinary } = require("cloudinary");

if (!process.env.CLOUDINARY_URL) {
  console.error("CLOUDINARY_URL missing. Aborting update.");
  process.exit(1);
}

const DATA_FILE = path.join(
  process.cwd(),
  "data",
  "work",
  "clean-designData.js"
);
const SUFFIX_REGEX = /^(.*)_([a-z0-9]{6})$/i;

function deriveLegacyId(publicId) {
  const match = publicId.match(SUFFIX_REGEX);
  if (match) {
    return match[1];
  }
  return publicId;
}

async function fetchAssetMap() {
  const resources = [];
  let nextCursor;

  do {
    const params = {
      type: "upload",
      resource_type: "image",
      max_results: 500,
      next_cursor: nextCursor,
    };

    const response = await cloudinary.api.resources(params);
    resources.push(...response.resources);
    nextCursor = response.next_cursor;
  } while (nextCursor);

  const map = {};
  resources.forEach((resource) => {
    const legacyId = deriveLegacyId(resource.public_id);
    map[legacyId] = {
      secureUrl: resource.secure_url,
      format: resource.format,
    };
  });

  return map;
}

function escapeForRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main() {
  const assetMap = await fetchAssetMap();

  let dataContent = fs.readFileSync(DATA_FILE, "utf8");

  Object.entries(assetMap).forEach(([legacyId, { secureUrl, format }]) => {
    const escapedId = escapeForRegex(legacyId);
    const extension = format.toLowerCase();

    const rawPattern = new RegExp(
      `https://res\\.cloudinary\\.com/dqlrwvoao/(?:image|raw)/upload/v\\d+/${escapedId}\\.[a-z0-9]+`,
      "g"
    );

    const transformedPattern = new RegExp(
      `https://res\\.cloudinary\\.com/dqlrwvoao/(?:image|raw)/upload/c_scale,w_400/v\\d+/${escapedId}\\.[a-z0-9]+`,
      "g"
    );

    const transformedUrl = secureUrl.replace(
      "/upload/",
      "/upload/c_scale,w_400/"
    );

    dataContent = dataContent.replace(rawPattern, secureUrl);
    dataContent = dataContent.replace(transformedPattern, transformedUrl);
  });

  fs.writeFileSync(DATA_FILE, dataContent, "utf8");

  console.log("clean-designData.js updated with latest Cloudinary asset URLs.");
}

main().catch((err) => {
  console.error("Failed to update design data", err);
  process.exit(1);
});
