import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// Upload base64 image to Cloudinary
const uploadAvatarToCloudinary = async (base64Image) => {
  try {
    // Extract base64 data (remove data:image/...;base64, prefix)
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64Data}`,
      {
        folder: "testimonials/avatars",
        resource_type: "image",
        transformation: [
          { width: 200, height: 200, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" },
        ],
      }
    );

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading avatar to Cloudinary:", error);
    throw new Error("Failed to upload avatar image");
  }
};

// API endpoint for testimonial submissions
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, position, message, avatar } = req.body;

    // Validate required fields
    if (!name || !position || !message || !avatar) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Validate message length
    if (message.length < 20 || message.length > 300) {
      return res.status(400).json({
        message: "Message must be between 20 and 300 characters",
      });
    }

    // Validate name length
    if (name.length > 50) {
      return res.status(400).json({
        message: "Name must be 50 characters or less",
      });
    }

    // Validate position length
    if (position.length > 30) {
      return res.status(400).json({
        message: "Position must be 30 characters or less",
      });
    }

    // Upload avatar to Cloudinary
    let avatarUrl;
    try {
      avatarUrl = await uploadAvatarToCloudinary(avatar);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to upload avatar image. Please try again.",
      });
    }

    // Read existing testimonials
    const testimonials = readTestimonials();

    // Generate new ID (highest existing ID + 1)
    const maxId =
      testimonials.length > 0 ? Math.max(...testimonials.map((t) => t.id)) : 0;

    // Create testimonial object
    const testimonial = {
      id: maxId + 1,
      name: name.trim(),
      position: position.trim(),
      message: message.trim(),
      avatar: avatarUrl,
      status: "pending", // For admin approval
      submittedAt: new Date().toISOString(),
    };

    // Add to testimonials array
    testimonials.push(testimonial);

    // Save to file
    if (!writeTestimonials(testimonials)) {
      return res.status(500).json({
        message: "Failed to save testimonial",
      });
    }

    res.status(200).json({
      message: "Testimonial submitted successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
