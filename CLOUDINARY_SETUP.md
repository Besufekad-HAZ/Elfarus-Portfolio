# 🚀 Cloudinary Setup Guide for Your Portfolio

## 📋 **Step 1: Install Dependencies**

The Cloudinary package is already installed. We're using the client-side Upload Widget approach.

## 🔑 **Step 2: Get Your Cloudinary Credentials**

1. **Go to your Cloudinary Dashboard**: https://cloudinary.com/console
2. **Copy your Cloud Name** (found at the top of your dashboard)
3. **That's it!** No API keys needed for client-side uploads

## ⚙️ **Step 3: Create Environment Variables**

Create a `.env.local` file in your project root:

```env
# Cloudinary Configuration
# Get this value from your Cloudinary Dashboard: https://cloudinary.com/console

# Your Cloudinary Cloud Name (found in Dashboard)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dy233t3yl_here

# Optional: Custom folder structure for uploads
NEXT_PUBLIC_CLOUDINARY_FOLDER=designs
```

**Replace `dy233t3yl_here` with your actual Cloudinary cloud name.**

## 📁 **Step 4: Create Cloudinary Folders (Optional)**

In your Cloudinary Dashboard, you can create these folders for organization:

```
designs/
├── posters/
├── thumbnails/
├── banners/
├── magazines/
└── others/
```

## 🎯 **Step 5: Test the Setup**

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test configuration**: Visit `http://localhost:3001/test-cloudinary`
3. **Test file upload**: Visit `http://localhost:3001/admin`
4. **Check Cloudinary Dashboard** to see uploaded files

## 📊 **Step 6: Update Your Data Structure**

When you upload files, update your `data/work/designData.js` with the Cloudinary URLs:

```javascript
// Example entry with Cloudinary URLs
{
  id: 1,
  title: "FIFA 22 Gaming Match Poster",
  category: "Poster",
  client: "Gaming Community",
  duration: "1 week",
  tools: ["Adobe Photoshop", "Illustrator"],
  description: "Dynamic gaming poster featuring two players in a FIFA 22 match with vibrant neon effects, game controllers, and Amharic text elements.",
  thumbnail: "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/posters/fifa22-match-poster",
  documents: [
    {
      type: "image",
      title: "FIFA 22 Match Poster",
      file: "https://res.cloudinary.com/dy233t3yl/image/upload/v1/designs/posters/fifa22-match-poster",
      preview: "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/posters/fifa22-match-poster",
      size: "2.3MB",
      dimensions: "1920x1080px"
    }
  ],
  tags: ["Gaming", "Poster", "FIFA", "Amharic"]
}
```

## 🔧 **Step 7: File Upload Process**

### **For Your Friend's Files:**

1. **Go to `/admin`** in your browser
2. **Select the appropriate category** from the dropdown
3. **Click "Open Upload Widget"** to start uploading
4. **Choose your files** (drag & drop or browse)
5. **Copy the generated URLs** from the uploaded files list
6. **Update your data structure** with the real URLs
7. **Test the portfolio** to ensure everything works

## 📏 **File Size Guidelines**

| Category | Recommended Size | Max Size | Format |
|----------|------------------|----------|---------|
| **Posters** | 2480x3508px (A4) | 10MB | JPG, PNG |
| **Thumbnails** | 1280x720px (16:9) | 2MB | JPG |
| **Banners** | 1920x1080px | 5MB | JPG, PNG |
| **Magazines** | A4 (2480x3508px) | 20MB | PDF |
| **Others** | Variable | 15MB | JPG, PNG, PDF |

## 🎨 **Cloudinary URL Transformations**

### **Thumbnail (400px width)**:
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/c_scale,w_400/v1/designs/filename
```

### **Medium size (800px width)**:
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/c_scale,w_800/v1/designs/filename
```

### **Full size (original)**:
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/designs/filename
```

### **PDF files**:
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/fl_attachment/v1/designs/filename.pdf
```

## 🚨 **Troubleshooting**

### **Upload Issues:**
- Check your cloud name in `.env.local`
- Ensure file size is under 50MB
- Verify file format is supported (JPG, PNG, GIF, WebP, PDF)
- Make sure you're using the Upload Widget (not direct file input)

### **URL Issues:**
- Make sure to replace `dy233t3yl` with your actual cloud name
- Check that the file path matches your Cloudinary folder structure

### **Performance Issues:**
- Use appropriate image sizes for thumbnails
- Enable Cloudinary's automatic optimization
- Consider using WebP format for better compression

## 📈 **Cloudinary Dashboard Features**

### **Monitor Usage:**
- Go to Dashboard > Usage to track storage and bandwidth
- Free tier: 25GB storage, 25GB bandwidth per month

### **Manage Files:**
- Use the Media Library to organize and manage uploaded files
- Create folders for better organization
- Delete unused files to save storage

### **Analytics:**
- Track file views and downloads
- Monitor bandwidth usage
- Analyze performance metrics

## ✅ **Setup Checklist**

- [ ] Installed `cloudinary-react` package
- [ ] Created `.env.local` with your cloud name
- [ ] Created folder structure in Cloudinary (optional)
- [ ] Tested file upload functionality at `/admin`
- [ ] Updated data structure with Cloudinary URLs
- [ ] Tested portfolio with uploaded files
- [ ] Verified all categories work correctly

## 🎉 **You're Ready!**

Your portfolio is now set up with Cloudinary for professional file management. You can:

- Upload files up to 50MB using the Upload Widget
- Automatically optimize images
- Serve files via CDN for fast loading
- Organize files by category
- Track usage and performance

Start uploading your friend's design files and showcase their amazing work!

## 🔄 **How the Upload Widget Works**

1. **Client-side uploads** - No server-side API keys needed
2. **Automatic optimization** - Cloudinary handles compression
3. **Drag & drop support** - Easy file selection
4. **Progress tracking** - Real-time upload progress
5. **Error handling** - Automatic retry and validation
6. **Secure uploads** - Direct to Cloudinary CDN
