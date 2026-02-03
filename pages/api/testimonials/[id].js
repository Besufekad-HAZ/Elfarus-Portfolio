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

// Helper function to write testimonials to file
const writeTestimonials = (testimonials) => {
  try {
    const filePath = getTestimonialsFilePath();
    fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing testimonials:", error);
    return false;
  }
};

// API endpoint for managing individual testimonials
export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Testimonial ID is required" });
  }

  switch (req.method) {
    case "GET":
      return getTestimonial(req, res, id);
    case "PATCH":
      return updateTestimonial(req, res, id);
    case "DELETE":
      return deleteTestimonial(req, res, id);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// Get a specific testimonial
async function getTestimonial(req, res, id) {
  try {
    const testimonials = readTestimonials();
    const testimonial = testimonials.find((t) => t.id === parseInt(id));

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json(testimonial);
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update a testimonial (approve/reject)
async function updateTestimonial(req, res, id) {
  try {
    const { status } = req.body;

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Valid status (pending, approved, rejected) is required",
      });
    }

    const testimonials = readTestimonials();
    const testimonialIndex = testimonials.findIndex(
      (t) => t.id === parseInt(id)
    );

    if (testimonialIndex === -1) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Update testimonial
    testimonials[testimonialIndex] = {
      ...testimonials[testimonialIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    // Save to file
    if (!writeTestimonials(testimonials)) {
      return res.status(500).json({ message: "Failed to update testimonial" });
    }

    res.status(200).json({
      message: "Testimonial updated successfully",
      testimonial: testimonials[testimonialIndex],
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete a testimonial
async function deleteTestimonial(req, res, id) {
  try {
    const testimonials = readTestimonials();
    const filteredTestimonials = testimonials.filter(
      (t) => t.id !== parseInt(id)
    );

    if (filteredTestimonials.length === testimonials.length) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Save to file
    if (!writeTestimonials(filteredTestimonials)) {
      return res.status(500).json({ message: "Failed to delete testimonial" });
    }

    res.status(200).json({
      message: "Testimonial deleted successfully",
      id: parseInt(id),
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
