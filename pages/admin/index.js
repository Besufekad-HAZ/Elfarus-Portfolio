import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../variants";
import FileUploader from "../../components/FileUploader";
import AdminAuth from "../../components/AdminAuth";
import ConfirmationModal from "../../components/ConfirmationModal";
import {
  FaUsers,
  FaUpload,
  FaCheck,
  FaTimes,
  FaEye,
  FaTrash,
  FaFileAlt,
} from "react-icons/fa";

const AdminPage = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("designs");
  const [activeTab, setActiveTab] = useState("upload"); // 'upload' or 'testimonials'
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);

  // Load testimonials on component mount
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials/list");
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data.testimonials);
      } else {
        console.error("Failed to load testimonials");
        // Fallback to mock data if API fails
        const mockTestimonials = [
          {
            id: 1,
            name: "John Doe",
            position: "Client",
            message:
              "Elfarus did an amazing job on our project. Highly recommended!",
            avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
            status: "pending",
            submittedAt: "2024-01-15T10:30:00Z",
          },
          {
            id: 2,
            name: "Jane Smith",
            position: "Designer",
            message:
              "Working with Elfarus was a great experience. Professional and creative!",
            avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
            status: "approved",
            submittedAt: "2024-01-10T14:20:00Z",
          },
        ];
        setTestimonials(mockTestimonials);
      }
    } catch (error) {
      console.error("Error loading testimonials:", error);
      // Fallback to mock data
      const mockTestimonials = [
        {
          id: 1,
          name: "John Doe",
          position: "Client",
          message:
            "Elfarus did an amazing job on our project. Highly recommended!",
          avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
          status: "pending",
          submittedAt: "2024-01-15T10:30:00Z",
        },
      ];
      setTestimonials(mockTestimonials);
    }
  };

  const handleUploadComplete = (document) => {
    setUploadedDocuments((prev) => [...prev, document]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification("Copied to clipboard!");
  };

  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg z-50";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  // Testimonial management functions
  const handleApproveTestimonial = async (id) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });

      if (response.ok) {
        showNotification("Testimonial approved successfully!");
        // Reload testimonials from API to ensure sync
        await loadTestimonials();
      } else {
        const error = await response.json();
        showNotification(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error approving testimonial:", error);
      showNotification("Error approving testimonial");
    }
  };

  const handleRejectTestimonial = async (id) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (response.ok) {
        showNotification("Testimonial rejected");
        // Reload testimonials from API to ensure sync
        await loadTestimonials();
      } else {
        const error = await response.json();
        showNotification(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error rejecting testimonial:", error);
      showNotification("Error rejecting testimonial");
    }
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setTestimonialToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!testimonialToDelete) return;

    try {
      const response = await fetch(`/api/testimonials/${testimonialToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showNotification("Testimonial deleted successfully!");
        // Reload testimonials from API to ensure sync
        await loadTestimonials();
      } else {
        const error = await response.json();
        showNotification(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      showNotification("Error deleting testimonial");
    } finally {
      setShowDeleteConfirm(false);
      setTestimonialToDelete(null);
    }
  };

  const viewTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowTestimonialModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminAuth>
      <div className="admin-page bg-primary/30 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
          >
            {/* Header */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                Portfolio <span className="text-accent">Admin</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 sm:px-4 text-white/80 leading-relaxed">
                Manage your design portfolio files and client testimonials.
                Upload new content and approve user submissions.
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex justify-center mb-6 sm:mb-8 md:mb-10"
            >
              <div className="bg-white/10 rounded-lg p-1 flex flex-col sm:flex-row gap-2 sm:gap-1 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab("upload")}
                  className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                    activeTab === "upload"
                      ? "bg-accent text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FaUpload className="w-4 h-4" />
                  <span>File Upload</span>
                </button>
                <button
                  onClick={() => setActiveTab("testimonials")}
                  className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                    activeTab === "testimonials"
                      ? "bg-accent text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FaUsers className="w-4 h-4" />
                  <span>
                    Testimonials (
                    {testimonials.filter((t) => t.status === "pending").length})
                  </span>
                </button>
              </div>
            </motion.div>

            {/* File Upload Tab */}
            <AnimatePresence mode="wait">
              {activeTab === "upload" && (
                <motion.div
                  key="upload"
                  variants={fadeIn("up", 0.6)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  {/* Category Selection */}
                  <div className="mb-6 sm:mb-8">
                    <label className="block text-sm sm:text-base font-medium text-white/80 mb-2 sm:mb-3">
                      Upload Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder:text-white/30 text-sm sm:text-base"
                    >
                      <option value="designs/posters">🎭 Posters</option>
                      <option value="designs/thumbnails">📺 Thumbnails</option>
                      <option value="designs/banners">🖼️ Banners</option>
                      <option value="designs/magazines">📰 Magazines</option>
                      <option value="designs/others">📁 Others</option>
                    </select>
                  </div>

                  {/* File Uploader */}
                  <div className="mb-8 sm:mb-10 md:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-5 md:mb-6 text-center">
                      Upload <span className="text-accent">Design Files</span>
                    </h2>
                    <FileUploader
                      onUploadComplete={handleUploadComplete}
                      category={selectedCategory}
                    />
                  </div>

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
                                <h3 className="text-lg font-semibold text-white">
                                  {doc.title}
                                </h3>
                                <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
                                  {doc.size}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm mb-4">
                                <div>
                                  <p className="text-white/70 mb-2">
                                    File URL:
                                  </p>
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
                                  <p className="text-white/70 mb-2">
                                    Preview URL:
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <code className="bg-white/10 px-3 py-2 rounded-lg text-xs truncate flex-1 text-white/80 border border-white/10">
                                      {doc.preview}
                                    </code>
                                    <button
                                      onClick={() =>
                                        copyToClipboard(doc.preview)
                                      }
                                      className="text-accent hover:text-white transition-colors text-xs bg-accent/20 px-3 py-2 rounded-lg hover:bg-accent/30"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="text-xs text-white/50 space-y-1">
                                <p>
                                  Type: {doc.type} • Dimensions:{" "}
                                  {doc.dimensions}
                                </p>
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
                      Copy this template and update your{" "}
                      <code className="bg-white/10 px-2 py-1 rounded text-accent">
                        data/work/designData.js
                      </code>{" "}
                      file:
                    </p>
                    <div className="bg-primary/50 border border-white/10 rounded-xl p-6 overflow-x-auto">
                      <pre className="text-green-400 text-xs leading-relaxed">
                        {`{
  id: ${uploadedDocuments.length + 1},
  title: "Your Project Title",
  category: "${
    selectedCategory.split("/")[1]?.charAt(0).toUpperCase() +
      selectedCategory.split("/")[1]?.slice(1) || "Poster"
  }",
  client: "Client Name",
  duration: "1 week",
  tools: ["Adobe Photoshop", "Illustrator"],
  description: "Your project description here.",
  thumbnail: "${uploadedDocuments[0]?.preview || "YOUR_THUMBNAIL_URL"}",
  documents: [
    {
      type: "${uploadedDocuments[0]?.type || "image"}",
      title: "${uploadedDocuments[0]?.title || "Document Title"}",
      file: "${uploadedDocuments[0]?.file || "YOUR_FILE_URL"}",
      preview: "${uploadedDocuments[0]?.preview || "YOUR_PREVIEW_URL"}",
      size: "${uploadedDocuments[0]?.size || "2.3MB"}",
      dimensions: "${uploadedDocuments[0]?.dimensions || "1920x1080px"}"
    }
  ],
  tags: ["Tag1", "Tag2", "Tag3"]
}`}
                      </pre>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Testimonials Tab */}
              {activeTab === "testimonials" && (
                <motion.div
                  key="testimonials"
                  variants={fadeIn("up", 0.6)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-4 sm:mb-5 md:mb-6">
                      Manage <span className="text-accent">Testimonials</span>
                    </h2>
                    <p className="text-sm sm:text-base text-center text-white/70 mb-6 sm:mb-8 px-2">
                      Review and approve client testimonials submitted through
                      your portfolio.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6">
                    <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6">
                      <table className="w-full text-white min-w-[800px] sm:min-w-0">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                              Avatar
                            </th>
                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                              Name
                            </th>
                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm hidden md:table-cell">
                              Position
                            </th>
                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm hidden lg:table-cell">
                              Message
                            </th>
                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                              Status
                            </th>
                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm hidden sm:table-cell">
                              Date
                            </th>
                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {testimonials.map((testimonial) => (
                            <tr
                              key={testimonial.id}
                              className="border-b border-white/10"
                            >
                              <td className="py-2 sm:py-3 px-2 sm:px-4">
                                <Image
                                  src={testimonial.avatar}
                                  alt={testimonial.name}
                                  width={48}
                                  height={48}
                                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                />
                              </td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">
                                {testimonial.name}
                              </td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm hidden md:table-cell">
                                {testimonial.position}
                              </td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm hidden lg:table-cell">
                                <div className="max-w-xs truncate">
                                  {testimonial.message
                                    .replace(/<[^>]*>/g, "")
                                    .substring(0, 50)}
                                  ...
                                </div>
                              </td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                    testimonial.status
                                  )}`}
                                >
                                  {testimonial.status}
                                </span>
                              </td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm hidden sm:table-cell">
                                {new Date(
                                  testimonial.submittedAt
                                ).toLocaleDateString()}
                              </td>
                              <td className="py-2 sm:py-3 px-2 sm:px-4">
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                  <button
                                    onClick={() => viewTestimonial(testimonial)}
                                    className="p-1.5 sm:p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                    title="View Details"
                                  >
                                    <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </button>

                                  {testimonial.status === "pending" && (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleApproveTestimonial(
                                            testimonial.id
                                          )
                                        }
                                        className="p-1.5 sm:p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                        title="Approve"
                                      >
                                        <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleRejectTestimonial(
                                            testimonial.id
                                          )
                                        }
                                        className="p-1.5 sm:p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                        title="Reject"
                                      >
                                        <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
                                      </button>
                                    </>
                                  )}

                                  <button
                                    onClick={() =>
                                      handleDeleteClick(testimonial.id)
                                    }
                                    className="p-1.5 sm:p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {testimonials.length === 0 && (
                        <div className="text-center py-8 text-white/60">
                          No testimonials found
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
              isOpen={showDeleteConfirm}
              onClose={() => {
                setShowDeleteConfirm(false);
                setTestimonialToDelete(null);
              }}
              type="confirm"
              title="Delete Testimonial"
              message="Are you sure you want to delete this testimonial? This action cannot be undone."
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={handleDeleteConfirm}
            />

            {/* Testimonial Detail Modal */}
            {showTestimonialModal && selectedTestimonial && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-primary/95 backdrop-blur-sm rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">
                      Testimonial Details
                    </h3>
                    <button
                      onClick={() => setShowTestimonialModal(false)}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={selectedTestimonial.avatar}
                        alt={selectedTestimonial.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {selectedTestimonial.name}
                        </h4>
                        <p className="text-white/70">
                          {selectedTestimonial.position}
                        </p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            selectedTestimonial.status
                          )}`}
                        >
                          {selectedTestimonial.status}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-white leading-relaxed">
                        {selectedTestimonial.message}
                      </p>
                    </div>

                    <div className="text-sm text-white/60">
                      Submitted:{" "}
                      {new Date(
                        selectedTestimonial.submittedAt
                      ).toLocaleString()}
                    </div>

                    {selectedTestimonial.status === "pending" && (
                      <div className="flex space-x-4 pt-4">
                        <button
                          onClick={() => {
                            handleApproveTestimonial(selectedTestimonial.id);
                            setShowTestimonialModal(false);
                          }}
                          className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            handleRejectTestimonial(selectedTestimonial.id);
                            setShowTestimonialModal(false);
                          }}
                          className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AdminAuth>
  );
};

export default AdminPage;
