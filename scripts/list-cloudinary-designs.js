#!/usr/bin/env node

/**
 * Quick helper to inspect Cloudinary assets under the `designs` folder.
 * Usage: node scripts/list-cloudinary-designs.js [subfolder]
 */

require("dotenv").config({ path: ".env.local", override: true });
const { v2: cloudinary } = require("cloudinary");

const folderArg = process.argv[2];
const isAll = folderArg === "all";
const prefix = !folderArg
  ? "designs"
  : isAll
  ? undefined
  : `designs/${folderArg}`;

async function listAssets() {
  try {
    if (!process.env.CLOUDINARY_URL) {
      throw new Error("CLOUDINARY_URL env var missing");
    }

    const resources = [];
    let nextCursor;

    do {
      const params = {
        type: "upload",
        resource_type: "image",
        max_results: 500,
        next_cursor: nextCursor,
      };

      if (prefix) {
        params.prefix = prefix;
      }

      const response = await cloudinary.api.resources(params);

      resources.push(...response.resources);
      nextCursor = response.next_cursor;
    } while (nextCursor);

    console.log(
      `Found ${resources.length} assets under ${
        prefix ? `prefix ${prefix}` : "all upload images"
      }`
    );
    resources.forEach((resource) => {
      console.log(
        JSON.stringify(
          {
            public_id: resource.public_id,
            format: resource.format,
            bytes: resource.bytes,
            secure_url: resource.secure_url,
          },
          null,
          2
        )
      );
    });
  } catch (error) {
    console.error("Failed to list assets", error);
    process.exit(1);
  }
}

listAssets();
