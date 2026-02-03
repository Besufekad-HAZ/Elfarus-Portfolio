import fs from "fs";
import path from "path";

// Helper function to get testimonials file path
const getTestimonialsFilePath = () => {
  return path.join(process.cwd(), "data", "testimonials.json");
};

// Helper function to read testimonials from file
const readTestimonials = () => {
  try {
    const filePath = getTestimonialsFilePath();
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading testimonials:", error);
    return [];
  }
};

// API endpoint to get all testimonials
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { status, limit = 50, page = 1 } = req.query;

    // Read testimonials from file
    const allTestimonials = readTestimonials();

    // Sort by submittedAt (newest first)
    const sortedTestimonials = [...allTestimonials].sort((a, b) => {
      return new Date(b.submittedAt) - new Date(a.submittedAt);
    });

    // Filter by status if provided
    let filteredTestimonials = sortedTestimonials;
    if (status) {
      filteredTestimonials = sortedTestimonials.filter(
        (t) => t.status === status
      );
    }

    // Apply pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedTestimonials = filteredTestimonials.slice(
      startIndex,
      endIndex
    );

    // Get counts for different statuses
    const counts = {
      total: allTestimonials.length,
      pending: allTestimonials.filter((t) => t.status === "pending").length,
      approved: allTestimonials.filter((t) => t.status === "approved").length,
      rejected: allTestimonials.filter((t) => t.status === "rejected").length,
    };

    res.status(200).json({
      testimonials: paginatedTestimonials,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredTestimonials.length,
        pages: Math.ceil(filteredTestimonials.length / parseInt(limit)),
      },
      counts,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
