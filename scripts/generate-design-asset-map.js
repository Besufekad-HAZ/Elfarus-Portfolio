#!/usr/bin/env node

/**
 * Generate a mapping of legacy asset ids (without Cloudinary cache-busting suffix)
 * to the latest secure URLs. This helps migrate data/work/clean-designData.js.
 */

require("dotenv").config({ path: ".env.local", override: true });
const { v2: cloudinary } = require("cloudinary");

const SUFFIX_REGEX = /^(.*)_([a-z0-9]{6})$/i;

function deriveLegacyId(publicId) {
  const match = publicId.match(SUFFIX_REGEX);
  if (match) {
    return match[1];
  }
  return publicId;
}

async function collectResources() {
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

  return resources;
}

async function main() {
  if (!process.env.CLOUDINARY_URL) {
    throw new Error("CLOUDINARY_URL env var missing");
  }

  const resources = await collectResources();
  const legacyMap = {};

  resources.forEach((resource) => {
    const legacyId = deriveLegacyId(resource.public_id);
    legacyMap[legacyId] = {
      public_id: resource.public_id,
      format: resource.format,
      secure_url: resource.secure_url,
      bytes: resource.bytes,
    };
  });

  console.log(JSON.stringify(legacyMap, null, 2));
}

main().catch((err) => {
  console.error("Failed to generate asset map", err);
  process.exit(1);
});
