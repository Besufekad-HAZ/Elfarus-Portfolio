import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import OptimizedImage from './OptimizedImage';
import { IoEye, IoDocument, IoFolder } from 'react-icons/io5';

// Import swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import data
import designWorkData from '../data/work/clean-designData';
import DocumentPreviewModal from './DocumentPreviewModal';

const DesignWorkSlider = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [...designWorkData.categories.map(cat => cat.name)];

  const filteredProjects = selectedCategory === 'All'
    ? designWorkData.projects
    : designWorkData.projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-accent text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            {/* Project Thumbnail */}
            <div className="relative w-full h-48 overflow-hidden">
              <OptimizedImage
                src={project.thumbnail}
                alt={project.title}
                className="group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <IoEye className="w-4 h-4" />
                    <span>View Documents</span>
                  </div>
                </div>
              </div>

              {/* Document Count Badge */}
              <div className="absolute top-3 right-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                {project.documents.length} docs
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>

              <p className="text-white/70 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>

              {/* Project Meta */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Client: {project.client}</span>
                  <span>{project.duration}</span>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-1">
                  {project.tools.slice(0, 3).map((tool, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-xs text-white/60">+{project.tools.length - 3} more</span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-accent/20 text-accent px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <IoFolder className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl text-white/70 mb-2">No projects found</h3>
          <p className="text-white/50">Try selecting a different category</p>
        </div>
      )}

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
};

export default DesignWorkSlider;
