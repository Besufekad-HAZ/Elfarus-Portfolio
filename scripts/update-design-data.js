#!/usr/bin/env node

const { fetchCloudinaryData } = require('./fetch-cloudinary-data');
const fs = require('fs');
const path = require('path');

async function updateDesignData() {
  try {
    console.log('🚀 Starting Cloudinary data fetch...\n');

    // Fetch data from Cloudinary
    const designWorkData = await fetchCloudinaryData();

    // Update the main designData.js file
    const mainDataPath = path.join(__dirname, '../data/work/designData.js');
    const generatedDataPath = path.join(__dirname, '../data/work/generated-designData.js');

    // Read the generated data
    const generatedContent = fs.readFileSync(generatedDataPath, 'utf8');

    // Create backup of current data
    const backupPath = path.join(__dirname, '../data/work/designData.backup.js');
    if (fs.existsSync(mainDataPath)) {
      fs.copyFileSync(mainDataPath, backupPath);
      console.log(`📦 Backup created: ${backupPath}`);
    }

    // Update the main data file
    fs.writeFileSync(mainDataPath, generatedContent);
    console.log(`✅ Main data file updated: ${mainDataPath}`);

    console.log('\n🎉 Design data updated successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the generated data in data/work/designData.js');
    console.log('2. Customize project titles, descriptions, and metadata as needed');
    console.log('3. Restart your dev server to see the changes');
    console.log('4. If needed, restore from backup: data/work/designData.backup.js');

  } catch (error) {
    console.error('❌ Error updating design data:', error);
    process.exit(1);
  }
}

// Run the script
updateDesignData();
