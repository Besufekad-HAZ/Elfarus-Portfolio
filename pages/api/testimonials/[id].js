// API endpoint for managing individual testimonials
export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Testimonial ID is required' });
  }

  switch (req.method) {
    case 'GET':
      return getTestimonial(req, res, id);
    case 'PATCH':
      return updateTestimonial(req, res, id);
    case 'DELETE':
      return deleteTestimonial(req, res, id);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Get a specific testimonial
async function getTestimonial(req, res, id) {
  try {
    // Here you would fetch from your database
    // const testimonial = await db.testimonials.findUnique({ where: { id: parseInt(id) } });

    // Mock response for now
    const testimonial = {
      id: parseInt(id),
      name: "John Doe",
      position: "Client",
      message: "Elfarus did an amazing job on our project. Highly recommended!",
      avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
      status: "pending",
      submittedAt: "2024-01-15T10:30:00Z"
    };

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update a testimonial (approve/reject)
async function updateTestimonial(req, res, id) {
  try {
    const { status } = req.body;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Valid status (pending, approved, rejected) is required'
      });
    }

    // Here you would update in your database
    // const updatedTestimonial = await db.testimonials.update({
    //   where: { id: parseInt(id) },
    //   data: { status, updatedAt: new Date() }
    // });

    // Mock response for now
    const updatedTestimonial = {
      id: parseInt(id),
      status,
      updatedAt: new Date().toISOString()
    };

    res.status(200).json({
      message: 'Testimonial updated successfully',
      testimonial: updatedTestimonial
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete a testimonial
async function deleteTestimonial(req, res, id) {
  try {
    // Here you would delete from your database
    // await db.testimonials.delete({ where: { id: parseInt(id) } });

    // Mock response for now
    res.status(200).json({
      message: 'Testimonial deleted successfully',
      id: parseInt(id)
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
