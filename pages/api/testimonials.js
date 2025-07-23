// API endpoint for testimonial submissions
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, position, message, avatar } = req.body;

    // Validate required fields
    if (!name || !position || !message || !avatar) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    // Validate message length
    if (message.length < 20 || message.length > 300) {
      return res.status(400).json({
        message: 'Message must be between 20 and 300 characters'
      });
    }

    // Validate name length
    if (name.length > 50) {
      return res.status(400).json({
        message: 'Name must be 50 characters or less'
      });
    }

    // Validate position length
    if (position.length > 30) {
      return res.status(400).json({
        message: 'Position must be 30 characters or less'
      });
    }

    // Create testimonial object
    const testimonial = {
      id: Date.now(), // Simple ID generation
      name: name.trim(),
      position: position.trim(),
      message: message.trim(),
      avatar: avatar, // This would be the uploaded image URL
      status: 'pending', // For admin approval
      submittedAt: new Date().toISOString(),
    };

    // Here you would typically save to a database
    // For now, we'll just return success

    // You could save to a database like this:
    // await db.testimonials.create(testimonial);

    // Or save to a JSON file:
    // const fs = require('fs');
    // const testimonials = JSON.parse(fs.readFileSync('./data/testimonials.json', 'utf8'));
    // testimonials.push(testimonial);
    // fs.writeFileSync('./data/testimonials.json', JSON.stringify(testimonials, null, 2));

    // Send email notification to admin (optional)
    // await sendEmail({
    //   to: 'admin@elfarus.com',
    //   subject: 'New Testimonial Submission',
    //   body: `New testimonial from ${name} (${position}): ${message}`
    // });

    res.status(200).json({
      message: 'Testimonial submitted successfully',
      testimonial
    });

  } catch (error) {
    console.error('Error submitting testimonial:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}
