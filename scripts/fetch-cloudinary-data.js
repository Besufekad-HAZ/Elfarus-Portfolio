// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('Cloud name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');
console.log('');

// Function to determine category based on folder structure and filename
const determineCategory = (publicId) => {
  const pathParts = publicId.split('/');

  // Check if it's in the designs folder structure
  if (pathParts.length >= 2 && pathParts[0] === 'designs') {
    const subfolder = pathParts[1];

    // Map subfolder names to categories
    switch (subfolder.toLowerCase()) {
      case 'posters':
      case 'poster':
        return 'Poster';
      case 'thumbnails':
      case 'thumbnail':
        return 'Thumbnail';
      case 'banners':
      case 'banner':
        return 'Banner';
      case 'magazines':
      case 'magazine':
        return 'Magazine';
      case 'others':
      case 'other':
        return 'Others';
      default:
                // If no subfolder, analyze filename for categorization
        const filename = pathParts[pathParts.length - 1].toLowerCase();

        // Manual categorization based on specific filenames
        if (filename.includes('የፐርፐዝብላክ') || filename.includes('purposeblack') ||
            filename.includes('company_profile') || filename.includes('company profile')) {
          return 'Magazine';
        }
        if (filename.includes('ኤልፋኡስ_ትንሳኤ') || filename.includes('easter') ||
            filename.includes('ዘውትር_እሁድ') || filename.includes('sunday')) {
          return 'Poster';
        }
        if (filename.includes('social_media') || filename.includes('social media') ||
            filename.includes('maxresdefault') || filename.includes('youtube')) {
          return 'Thumbnail';
        }
        if (filename.includes('blood_donor') || filename.includes('blood donor') ||
            filename.includes('donor')) {
          return 'Banner';
        }
        if (filename.includes('mom_day') || filename.includes('mother') ||
            filename.includes('artboard')) {
          return 'Poster';
        }
        if (filename.includes('heros') || filename.includes('hero')) {
          return 'Banner';
        }

        // Default categorization for numbered files (likely thumbnails)
        if (/^\d+/.test(filename) || filename.includes('_')) {
          return 'Thumbnail';
        }

        return 'Others';
    }
  }

  // Fallback to filename analysis if not in designs folder
  const path = publicId.toLowerCase();
  if (path.includes('poster')) return 'Poster';
  if (path.includes('thumbnail')) return 'Thumbnail';
  if (path.includes('banner')) return 'Banner';
  if (path.includes('magazine')) return 'Magazine';

  return 'Others';
};

// Function to generate project title from filename
const generateTitle = (publicId) => {
  const filename = publicId.split('/').pop();
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

  // Convert filename to title case
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim();
};

// Function to generate client name based on category
const generateClient = (category) => {
  const clients = {
    'Poster': 'Event Organizer',
    'Thumbnail': 'Content Creator',
    'Banner': 'Marketing Agency',
    'Magazine': 'Publishing House',
    'Others': 'Client'
  };
  return clients[category] || 'Client';
};

// Function to generate tools based on category
const generateTools = (category) => {
  const tools = {
    'Poster': ['Adobe Photoshop', 'Illustrator'],
    'Thumbnail': ['Adobe Photoshop', 'Canva'],
    'Banner': ['Adobe Photoshop', 'Illustrator'],
    'Magazine': ['Adobe InDesign', 'Photoshop', 'Illustrator'],
    'Others': ['Adobe Photoshop', 'Canva']
  };
  return tools[category] || ['Adobe Photoshop'];
};

// Function to generate tags based on category and title
const generateTags = (category, title) => {
  const baseTags = [category];
  const titleWords = title.toLowerCase().split(' ');

  // Add relevant tags based on title content
  if (titleWords.some(word => ['gaming', 'game', 'fifa', 'esports'].includes(word))) {
    baseTags.push('Gaming');
  }
  if (titleWords.some(word => ['church', 'religious', 'prophet', 'easter'].includes(word))) {
    baseTags.push('Religious');
  }
  if (titleWords.some(word => ['donation', 'blood', 'health'].includes(word))) {
    baseTags.push('Health');
  }
  if (titleWords.some(word => ['youtube', 'social', 'media'].includes(word))) {
    baseTags.push('Social Media');
  }

  return baseTags;
};

// Function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Main function to fetch and generate data
async function fetchCloudinaryData() {
  try {
    console.log('Fetching files from Cloudinary designs folder...');

    // Fetch files specifically from the designs folder and its subfolders
    const result = await cloudinary.search
      .expression('folder:designs/* AND resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    console.log(`Found ${result.resources.length} files in designs folder`);

    // Show what subfolders we found
    const subfolders = new Set();
    result.resources.forEach(resource => {
      const pathParts = resource.public_id.split('/');
      if (pathParts.length >= 2 && pathParts[0] === 'designs') {
        subfolders.add(pathParts[1]);
      }
    });

    console.log('Available subfolders in designs:', Array.from(subfolders));

    const projects = [];
    let projectId = 1;

    // Process each file from the designs folder
    result.resources.forEach(resource => {
      const category = determineCategory(resource.public_id);
      const title = generateTitle(resource.public_id);
      const client = generateClient(category);
      const tools = generateTools(category);
      const tags = generateTags(category, title);

      const project = {
        id: projectId++,
        title: title,
        category: category,
        client: client,
        duration: "1 week",
        tools: tools,
        description: `${category} design project featuring ${title.toLowerCase()}. Created with ${tools.join(' and ')}.`,
        thumbnail: resource.secure_url,
        documents: [
          {
            type: resource.format === 'pdf' ? 'pdf' : 'image',
            title: title,
            file: resource.secure_url,
            preview: resource.secure_url.replace('/upload/', '/upload/c_scale,w_400/'),
            size: formatFileSize(resource.bytes),
            dimensions: `${resource.width}x${resource.height}px`,
          }
        ],
        tags: tags,
      };

      projects.push(project);
    });

    // Generate the complete data structure
    const designWorkData = {
      categories: [
        {
          name: "All",
          description: "Complete portfolio overview",
          icon: "🎨",
        },
        {
          name: "Poster",
          description: "Event posters, promotional posters, artistic posters",
          icon: "🎭",
        },
        {
          name: "Thumbnail",
          description: "YouTube thumbnails, social media graphics",
          icon: "📺",
        },
        {
          name: "Banner",
          description: "Web banners, promotional banners, event banners",
          icon: "🖼️",
        },
        {
          name: "Magazine",
          description: "Magazine layouts, editorial design, print publications",
          icon: "📰",
        },
        {
          name: "Others",
          description: "Miscellaneous design work",
          icon: "📁",
        },
      ],
      projects: projects,
    };

    // Output the generated data
    console.log('\n=== GENERATED DESIGN WORK DATA ===\n');
    console.log(JSON.stringify(designWorkData, null, 2));

    // Also save to a file
    const fs = require('fs');
    const outputPath = './data/work/generated-designData.js';

    const fileContent = `// Auto-generated from Cloudinary designs folder
// Generated on: ${new Date().toISOString()}

export const designWorkData = ${JSON.stringify(designWorkData, null, 2)};

export default designWorkData;
`;

    fs.writeFileSync(outputPath, fileContent);
    console.log(`\n✅ Data saved to: ${outputPath}`);
    console.log(`\n📊 Summary:`);
    console.log(`- Total projects: ${projects.length}`);
    console.log(`- Categories found: ${[...new Set(projects.map(p => p.category))].join(', ')}`);

    // Show breakdown by category
    const categoryCount = {};
    projects.forEach(project => {
      categoryCount[project.category] = (categoryCount[project.category] || 0) + 1;
    });
    console.log(`- Projects by category:`);
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} projects`);
    });

    return designWorkData;

  } catch (error) {
    console.error('Error fetching Cloudinary data:', error);
    throw error;
  }
}

// Run the script if called directly
if (require.main === module) {
  fetchCloudinaryData()
    .then(() => {
      console.log('\n🎉 Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { fetchCloudinaryData };
