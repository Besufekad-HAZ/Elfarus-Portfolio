import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../variants';
import FileUploader from '../../components/FileUploader';

const AdminPage = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('designs');

  const handleUploadComplete = (document) => {
    setUploadedDocuments(prev => [...prev, document]);
    console.log('Uploaded document:', document);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Create a temporary notification instead of alert
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = 'Copied to clipboard!';
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  return (
    <div className="admin-page bg-primary/30 py-24 md:py-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-8 md:p-12"
        >
          {/* Header */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-center mb-12"
          >
            <h1 className="h1 mb-4">
              Portfolio <span className="text-accent">Admin</span>
            </h1>
            <p className="max-w-2xl mx-auto">
              Upload and manage your design portfolio files. All files are automatically optimized and organized by category.
            </p>
          </motion.div>

          {/* Category Selection */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-8"
          >
            <label className="block text-sm font-medium text-white/80 mb-3">
              Upload Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder:text-white/30"
            >
              <option value="designs/posters">🎭 Posters</option>
              <option value="designs/thumbnails">📺 Thumbnails</option>
              <option value="designs/banners">🖼️ Banners</option>
              <option value="designs/magazines">📰 Magazines</option>
              <option value="designs/others">📁 Others</option>
            </select>
          </motion.div>

          {/* File Uploader */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-12"
          >
            <h2 className="h2 mb-6 text-center">
              Upload <span className="text-accent">Design Files</span>
            </h2>
            <FileUploader
              onUploadComplete={handleUploadComplete}
              category={selectedCategory}
            />
          </motion.div>

          {/* Uploaded Files */}
          <AnimatePresence>
            {uploadedDocuments.length > 0 && (
              <motion.div
                variants={fadeIn("up", 0.7)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="space-y-6 mb-12"
              >
                <h2 className="h2 text-center">
                  Uploaded <span className="text-accent">Files</span>
                </h2>

                <div className="grid gap-6">
                  {uploadedDocuments.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                        <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
                          {doc.size}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-white/70 mb-2">File URL:</p>
                          <div className="flex items-center space-x-2">
                            <code className="bg-white/10 px-3 py-2 rounded-lg text-xs truncate flex-1 text-white/80 border border-white/10">
                              {doc.file}
                            </code>
                            <button
                              onClick={() => copyToClipboard(doc.file)}
                              className="text-accent hover:text-white transition-colors text-xs bg-accent/20 px-3 py-2 rounded-lg hover:bg-accent/30"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <div>
                          <p className="text-white/70 mb-2">Preview URL:</p>
                          <div className="flex items-center space-x-2">
                            <code className="bg-white/10 px-3 py-2 rounded-lg text-xs truncate flex-1 text-white/80 border border-white/10">
                              {doc.preview}
                            </code>
                            <button
                              onClick={() => copyToClipboard(doc.preview)}
                              className="text-accent hover:text-white transition-colors text-xs bg-accent/20 px-3 py-2 rounded-lg hover:bg-accent/30"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-white/50 space-y-1">
                        <p>Type: {doc.type} • Dimensions: {doc.dimensions}</p>
                        <p>Public ID: {doc.public_id}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Data Structure Template */}
          <motion.div
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <h3 className="h2 mb-4 text-center">
              Data <span className="text-accent">Template</span>
            </h3>
            <p className="text-center text-white/70 mb-6">
              Copy this template and update your <code className="bg-white/10 px-2 py-1 rounded text-accent">data/work/designData.js</code> file:
            </p>
            <div className="bg-primary/50 border border-white/10 rounded-xl p-6 overflow-x-auto">
              <pre className="text-green-400 text-xs leading-relaxed">
{`{
  id: ${uploadedDocuments.length + 1},
  title: "Your Project Title",
  category: "${selectedCategory.split('/')[1]?.charAt(0).toUpperCase() + selectedCategory.split('/')[1]?.slice(1) || 'Poster'}",
  client: "Client Name",
  duration: "1 week",
  tools: ["Adobe Photoshop", "Illustrator"],
  description: "Your project description here.",
  thumbnail: "${uploadedDocuments[0]?.preview || 'YOUR_THUMBNAIL_URL'}",
  documents: [
    {
      type: "${uploadedDocuments[0]?.type || 'image'}",
      title: "${uploadedDocuments[0]?.title || 'Document Title'}",
      file: "${uploadedDocuments[0]?.file || 'YOUR_FILE_URL'}",
      preview: "${uploadedDocuments[0]?.preview || 'YOUR_PREVIEW_URL'}",
      size: "${uploadedDocuments[0]?.size || '2.3MB'}",
      dimensions: "${uploadedDocuments[0]?.dimensions || '1920x1080px'}"
    }
  ],
  tags: ["Tag1", "Tag2", "Tag3"]
}`}
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
