export const designWorkData = {
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

  projects: [
    // Example project structure - replace with your actual Cloudinary files
    {
      id: 1,
      title: "FIFA 22 Gaming Match Poster",
      category: "Poster",
      client: "Gaming Community",
      duration: "1 week",
      tools: ["Adobe Photoshop", "Illustrator"],
      description:
        "Dynamic gaming poster featuring two players in a FIFA 22 match with vibrant neon effects, game controllers, and Amharic text elements.",
      thumbnail:
        "https://res.cloudinary.com/dy233t3yl/image/upload/v1752757789/%E1%8B%98%E1%8B%8D%E1%89%B5%E1%88%AD_%E1%8A%A5%E1%88%81%E1%8B%B5_yqyhtx.png",
      documents: [
        {
          type: "image",
          title: "FIFA 22 Match Poster",
          file: "https://res.cloudinary.com/dy233t3yl/image/upload/v1752757789/%E1%8B%98%E1%8B%8D%E1%89%B5%E1%88%AD_%E1%8A%A5%E1%88%81%E1%8B%B5_yqyhtx.png",
          preview:
            "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/fifa22-match-poster",
          size: "2.3MB",
          dimensions: "1920x1080px",
        },
      ],
      tags: ["Gaming", "Poster", "FIFA", "Amharic"],
    },

    {
      id: 2,
      title: "Easter Religious Graphics",
      category: "Others",
      client: "Church Community",
      duration: "3 days",
      tools: ["Adobe Photoshop", "Canva"],
      description:
        "Religious graphics and materials for Easter celebrations, featuring traditional symbols and modern design elements.",
      thumbnail:
        "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/easter-religious-graphics",
      documents: [
        {
          type: "image",
          title: "Easter Religious Graphics",
          file: "https://res.cloudinary.com/dy233t3yl/image/upload/v1/designs/easter-religious-graphics",
          preview:
            "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/easter-religious-graphics",
          size: "1.8MB",
          dimensions: "1080x1080px",
        },
      ],
      tags: ["Religious", "Easter", "Graphics", "Church"],
    },

    {
      id: 3,
      title: "Blood Donation Campaign Banner",
      category: "Banner",
      client: "Health Organization",
      duration: "2 days",
      tools: ["Adobe Photoshop", "Illustrator"],
      description:
        "Promotional banner for blood donation campaign with compelling visuals and clear call-to-action messaging.",
      thumbnail:
        "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/blood-donation-campaign",
      documents: [
        {
          type: "image",
          title: "Blood Donation Campaign Banner",
          file: "https://res.cloudinary.com/dy233t3yl/image/upload/v1/designs/blood-donation-campaign",
          preview:
            "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/blood-donation-campaign",
          size: "3.1MB",
          dimensions: "1920x1080px",
        },
      ],
      tags: ["Health", "Campaign", "Banner", "Donation"],
    },

    {
      id: 4,
      title: "YouTube Gaming Thumbnail",
      category: "Thumbnail",
      client: "Gaming Channel",
      duration: "1 day",
      tools: ["Adobe Photoshop"],
      description:
        "Eye-catching YouTube thumbnail for gaming content with bold typography and vibrant colors.",
      thumbnail:
        "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/gaming-thumbnail",
      documents: [
        {
          type: "image",
          title: "Gaming Thumbnail",
          file: "https://res.cloudinary.com/dy233t3yl/image/upload/v1/designs/gaming-thumbnail",
          preview:
            "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/gaming-thumbnail",
          size: "1.2MB",
          dimensions: "1280x720px",
        },
      ],
      tags: ["Gaming", "YouTube", "Thumbnail", "Social Media"],
    },

    {
      id: 5,
      title: "Company Magazine Layout",
      category: "Magazine",
      client: "Corporate Client",
      duration: "2 weeks",
      tools: ["Adobe InDesign", "Photoshop", "Illustrator"],
      description:
        "Professional magazine layout featuring company profiles, articles, and high-quality imagery with modern typography.",
      thumbnail:
        "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/company-magazine",
      documents: [
        {
          type: "pdf",
          title: "Company Magazine PDF",
          file: "https://res.cloudinary.com/dy233t3yl/image/upload/v1/designs/company-magazine.pdf",
          preview:
            "https://res.cloudinary.com/dy233t3yl/image/upload/c_scale,w_400/v1/designs/company-magazine-preview",
          size: "8.5MB",
          dimensions: "A4",
        },
      ],
      tags: ["Magazine", "Corporate", "Layout", "Print"],
    },
  ],
};

export default designWorkData;
