// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function debugFiles() {
  try {
    console.log('Fetching files from Cloudinary designs folder...');

    const result = await cloudinary.search
      .expression('folder:designs/* AND resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    console.log(`Found ${result.resources.length} files in designs folder\n`);

    result.resources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.public_id}`);
      console.log(`   Format: ${resource.format}`);
      console.log(`   Size: ${resource.bytes} bytes`);
      console.log(`   Dimensions: ${resource.width}x${resource.height}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

debugFiles();
