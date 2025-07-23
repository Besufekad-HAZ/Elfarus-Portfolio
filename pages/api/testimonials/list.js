// API endpoint to get all testimonials
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { status, limit = 50, page = 1 } = req.query;

    // Here you would fetch from your database with pagination and filtering
    // const testimonials = await db.testimonials.findMany({
    //   where: status ? { status } : {},
    //   take: parseInt(limit),
    //   skip: (parseInt(page) - 1) * parseInt(limit),
    //   orderBy: { submittedAt: 'desc' }
    // });

    // Mock data for now
    const mockTestimonials = [
      {
        id: 1,
        name: "John Doe",
        position: "Client",
        message: "Elfarus did an amazing job on our project. Highly recommended!",
        avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
        status: "pending",
        submittedAt: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "Designer",
        message: "Working with Elfarus was a great experience. Professional and creative!",
        avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
        status: "approved",
        submittedAt: "2024-01-10T14:20:00Z"
      },
      {
        id: 3,
        name: "Mike Johnson",
        position: "Project Manager",
        message: "Excellent communication and delivery. Would work with again!",
        avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
        status: "approved",
        submittedAt: "2024-01-08T09:15:00Z"
      }
    ];

    // Filter by status if provided
    let filteredTestimonials = mockTestimonials;
    if (status) {
      filteredTestimonials = mockTestimonials.filter(t => t.status === status);
    }

    // Apply pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);

    // Get counts for different statuses
    const counts = {
      total: mockTestimonials.length,
      pending: mockTestimonials.filter(t => t.status === 'pending').length,
      approved: mockTestimonials.filter(t => t.status === 'approved').length,
      rejected: mockTestimonials.filter(t => t.status === 'rejected').length
    };

    res.status(200).json({
      testimonials: paginatedTestimonials,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredTestimonials.length,
        pages: Math.ceil(filteredTestimonials.length / parseInt(limit))
      },
      counts
    });

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
