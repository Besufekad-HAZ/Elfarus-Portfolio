# 🚀 Cloudinary Design Data Automation

This guide helps you automatically generate your portfolio design data from files uploaded to Cloudinary.

## 📋 Prerequisites

1. **Cloudinary Account**: Make sure you have your Cloudinary credentials
2. **Environment Variables**: Add these to your `.env.local` file:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🗂️ File Organization

Organize your files in Cloudinary like this:
```
design/
├── posters/
│   ├── fifa22-match-poster.png
│   ├── easter-religious-poster.jpg
│   └── gaming-event-poster.png
├── thumbnails/
│   ├── youtube-gaming-thumbnail.jpg
│   └── social-media-thumbnail.png
├── banners/
│   ├── blood-donation-banner.jpg
│   └── event-promotion-banner.png
├── magazines/
│   ├── company-magazine.pdf
│   └── editorial-layout.pdf
└── others/
    ├── church-materials.jpg
    └── miscellaneous-design.png
```

## 🎯 How to Use

### Step 1: Install Cloudinary SDK (if not already installed)
```bash
npm install cloudinary
```

### Step 2: Run the Automation Script
```bash
npm run update-designs
```

### Step 3: Review and Customize
The script will:
- ✅ Fetch all files from your Cloudinary `design` folder
- ✅ Automatically categorize them based on folder structure
- ✅ Generate project titles from filenames
- ✅ Create appropriate metadata (client, tools, tags)
- ✅ Save the data to `data/work/designData.js`
- ✅ Create a backup of your current data

## 🔧 Customization Options

### Automatic Category Detection
The script automatically detects categories based on:
- **Folder names**: `posters/`, `thumbnails/`, `banners/`, `magazines/`
- **File names**: Contains keywords like "poster", "thumbnail", "banner"
- **File types**: PDFs are automatically categorized as "Magazine"

### Customizing Generated Data
After running the script, you can manually edit `data/work/designData.js` to:
- **Update project titles** to be more descriptive
- **Modify descriptions** to better describe your work
- **Change client names** to actual client names
- **Adjust tools used** for each project
- **Add custom tags** relevant to your work

### Example Customization
```javascript
{
  id: 1,
  title: "FIFA 22 Gaming Match Poster", // Custom title
  category: "Poster",
  client: "Gaming Community", // Custom client
  duration: "1 week",
  tools: ["Adobe Photoshop", "Illustrator"], // Custom tools
  description: "Dynamic gaming poster featuring two players in a FIFA 22 match with vibrant neon effects, game controllers, and Amharic text elements.", // Custom description
  thumbnail: "https://res.cloudinary.com/...",
  documents: [...],
  tags: ["Gaming", "Poster", "FIFA", "Amharic"], // Custom tags
}
```

## 📊 What the Script Generates

### Project Structure
```javascript
{
  id: 1,
  title: "Generated from filename",
  category: "Auto-detected from folder/name",
  client: "Default client for category",
  duration: "1 week",
  tools: ["Default tools for category"],
  description: "Auto-generated description",
  thumbnail: "Cloudinary URL",
  documents: [
    {
      type: "image" or "pdf",
      title: "Document title",
      file: "Full resolution URL",
      preview: "Thumbnail URL",
      size: "Formatted file size",
      dimensions: "Width x Height"
    }
  ],
  tags: ["Auto-generated tags"]
}
```

### Automatic Features
- **Smart categorization** based on folder structure and filenames
- **File size formatting** (KB, MB, GB)
- **Dimension detection** from Cloudinary metadata
- **Preview URL generation** with automatic scaling
- **Tag generation** based on content keywords

## 🔄 Updating Your Portfolio

### After Running the Script
1. **Review the generated data** in `data/work/designData.js`
2. **Customize project details** as needed
3. **Restart your dev server**: `npm run dev`
4. **Check your work page**: Visit `/work` to see the updates

### Regular Updates
- **Upload new files** to Cloudinary in the appropriate folders
- **Run the script again**: `npm run update-designs`
- **Review and customize** the new entries
- **Restart dev server** to see changes

## 🛠️ Troubleshooting

### Common Issues

**"Cloudinary not configured"**
- Check your environment variables in `.env.local`
- Ensure you have the correct API credentials

**"No files found"**
- Verify files are uploaded to the `design` folder in Cloudinary
- Check folder structure matches the expected format

**"Permission denied"**
- Make sure you have read access to your Cloudinary account
- Verify API key and secret are correct

### Backup and Restore
- **Backup location**: `data/work/designData.backup.js`
- **Restore command**: Copy backup file to `designData.js`
- **Manual backup**: Always backup before running the script

## 🎨 Tips for Best Results

1. **Use descriptive filenames**: `fifa22-gaming-poster.png` instead of `image1.png`
2. **Organize by folders**: Keep related files in the same folder
3. **Consistent naming**: Use similar naming patterns for similar projects
4. **Review generated data**: Always check and customize the auto-generated content
5. **Regular updates**: Run the script whenever you add new files

## 📞 Support

If you encounter issues:
1. Check the console output for error messages
2. Verify your Cloudinary credentials
3. Ensure your file structure follows the recommended format
4. Check the backup file if data was overwritten incorrectly

---

**Happy automating! 🚀**
