#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Cloudinary Setup for Your Portfolio\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('📝 Creating .env.local file...');

  const envContent = `# Cloudinary Configuration
# Get these values from your Cloudinary Dashboard: https://cloudinary.com/console

# Your Cloudinary Cloud Name (found in Dashboard)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dy233t3yl

# Your Cloudinary API Key (found in Dashboard > Settings > Access Keys)
CLOUDINARY_API_KEY=your_api_key_here

# Your Cloudinary API Secret (found in Dashboard > Settings > Access Keys)
CLOUDINARY_API_SECRET=your_api_secret_here

# Optional: Custom folder structure for uploads
NEXT_PUBLIC_CLOUDINARY_FOLDER=designs
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created!');
  console.log('⚠️  Please update the values with your actual Cloudinary credentials.\n');
} else {
  console.log('✅ .env.local file already exists!\n');
}

// Check if cloudinary package is installed
const packagePath = path.join(process.cwd(), 'package.json');
const packageExists = fs.existsSync(packagePath);

if (packageExists) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const hasCloudinary = packageJson.dependencies && packageJson.dependencies.cloudinary;

  if (!hasCloudinary) {
    console.log('📦 Installing cloudinary package...');
    console.log('Run: npm install cloudinary\n');
  } else {
    console.log('✅ Cloudinary package is installed!\n');
  }
}

console.log('📋 Next Steps:');
console.log('1. Go to https://cloudinary.com/console');
console.log('2. Copy your Cloud Name, API Key, and API Secret');
console.log('3. Update the values in .env.local');
console.log('4. Run: npm install cloudinary (if not already installed)');
console.log('5. Run: npm run dev');
console.log('6. Visit: http://localhost:3000/admin to test uploads\n');

console.log('📁 Create these folders in your Cloudinary Dashboard:');
console.log('   designs/');
console.log('   ├── posters/');
console.log('   ├── thumbnails/');
console.log('   ├── banners/');
console.log('   ├── magazines/');
console.log('   └── others/\n');

console.log('🎯 Test the setup:');
console.log('- Visit http://localhost:3000/admin');
console.log('- Try uploading a test image or PDF');
console.log('- Check your Cloudinary Dashboard to see the uploaded file');
console.log('- Copy the generated URLs to your data structure\n');

console.log('📚 For detailed instructions, see: CLOUDINARY_SETUP.md');
console.log('📚 For file management guide, see: FILE_MANAGEMENT_GUIDE.md\n');

console.log('🎉 Happy uploading!');
