# 🎨 Design Portfolio Setup Guide

## 📋 Overview
Your portfolio now has a complete design work showcase system with document previews, categories, and interactive features. Here's how to customize it with your actual design work.

## 🗂️ File Structure Setup

### 1. Create Document Folders
Create these folders in your `public` directory:
```
public/
├── design-docs/          # Your PDF files
├── design-thumbnails/    # Project thumbnail images
└── design-previews/      # Document preview images
```

### 2. Add Your Files
- **PDFs**: Place in `public/design-docs/`
- **Thumbnails**: Place in `public/design-thumbnails/` (400x300px recommended)
- **Previews**: Place in `public/design-previews/` (400x300px recommended)

## 📝 How to Add Your Projects

### Step 1: Edit the Data File
Open `data/work/designData.js` and replace the example projects with your own:

```javascript
{
  id: 1,
  title: "Your Project Title",
  category: "UI/UX Design", // Choose from: UI/UX Design, Brand Identity, Print Design, Digital Marketing, Case Studies
  client: "Client Name",
  duration: "2 months",
  tools: ["Figma", "Adobe Illustrator", "Photoshop"], // Tools you used
  description: "Brief description of your project...",
  thumbnail: "/design-thumbnails/your-project-thumbnail.jpg",
  documents: [
    {
      type: "pdf", // or "image"
      title: "Document Title",
      file: "/design-docs/your-document.pdf",
      preview: "/design-previews/your-preview.jpg"
    }
  ],
  tags: ["Tag1", "Tag2", "Tag3"] // Relevant tags
}
```

### Step 2: Supported Document Types
- **PDFs**: Design specs, case studies, brand guidelines
- **Images**: Mockups, wireframes, final designs
- **Presentations**: Export as PDF from PowerPoint/Keynote

## 🎯 Project Categories

### UI/UX Design
- Mobile app designs
- Website interfaces
- User flow diagrams
- Wireframes and prototypes

### Brand Identity
- Logo designs
- Brand guidelines
- Color palettes
- Typography systems

### Print Design
- Brochures and flyers
- Business cards
- Posters and banners
- Packaging design

### Digital Marketing
- Social media graphics
- Email templates
- Banner ads
- Campaign materials

### Case Studies
- Complete project documentation
- Research findings
- Design process
- Final outcomes

## 🔧 Features Available

### Document Preview Modal
- **PDF Viewer**: Built-in PDF preview with zoom controls
- **Image Viewer**: High-resolution image viewing with zoom
- **Navigation**: Switch between documents in a project
- **Download**: Direct download of documents
- **Keyboard Shortcuts**:
  - `Esc` to close
  - `←` `→` to navigate documents

### Project Grid
- **Category Filtering**: Filter by design discipline
- **Project Cards**: Show thumbnails, descriptions, and metadata
- **Hover Effects**: Interactive previews and animations
- **Responsive Design**: Works on all screen sizes

### Project Information
- Client name and duration
- Tools and software used
- Project tags and categories
- Document count badges

## 📱 Responsive Features
- Mobile-optimized document viewing
- Touch-friendly navigation
- Adaptive layouts for all screen sizes
- Optimized image loading

## 🎨 Customization Options

### Colors and Styling
- Edit `tailwind.config.js` to change accent colors
- Modify component styles in individual files
- Update global styles in `styles/globals.css`

### Layout and Animations
- Adjust grid layouts in `DesignWorkSlider.js`
- Modify animations in `DocumentPreviewModal.js`
- Customize transitions and effects

## 🚀 Quick Start Checklist

- [ ] Create the required folders in `public/`
- [ ] Add your design documents (PDFs and images)
- [ ] Update `data/work/designData.js` with your projects
- [ ] Test the document preview functionality
- [ ] Customize project categories if needed
- [ ] Update project descriptions and metadata
- [ ] Test on mobile devices

## 💡 Tips for Best Results

1. **Thumbnails**: Use consistent 400x300px images for best display
2. **PDFs**: Keep file sizes reasonable for fast loading
3. **Descriptions**: Write clear, concise project descriptions
4. **Tags**: Use relevant tags to help with project discovery
5. **Categories**: Choose the most appropriate category for each project

## 🔍 Testing Your Setup

1. Start the development server: `npm run dev`
2. Navigate to the Work page
3. Click on project cards to test document previews
4. Test category filtering
5. Verify mobile responsiveness
6. Test document downloads

## 📞 Need Help?

If you need assistance with:
- Adding specific document types
- Customizing the layout
- Troubleshooting issues
- Adding new features

Just let me know and I'll help you customize it further!

---

**Your design portfolio is now ready to showcase your work professionally! 🎉**
