# Admin Panel Guide

## Overview

Your portfolio now includes a comprehensive admin panel for managing both design file uploads and client testimonials. Access it at `/admin`.

## 🔐 Authentication

### Login Credentials

- **Username**: `Elfarus`
- **Password**: `ELFA7@me`

### Accessing the Admin Panel

1. Navigate to `yourdomain.com/admin`
2. You will be redirected to the login page if not authenticated
3. Enter your credentials
4. Upon successful login, you'll be redirected to the admin dashboard
5. Your session will remain active for 24 hours

### Security Features

- **Session Management**: Automatic logout after 24 hours
- **Client-side Protection**: Authentication check on every admin page load
- **Secure Storage**: Credentials stored in sessionStorage (not localStorage)
- **Logout Function**: Red logout button in top-right corner

## Features

### 🎨 File Upload Management

- **Upload Design Files**: Upload images, PDFs, and other design files
- **Category Organization**: Organize files by category (Posters, Thumbnails, Banners, Magazines, Others)
- **Automatic Optimization**: Files are automatically optimized and stored in Cloudinary
- **URL Generation**: Get direct URLs and preview URLs for your files
- **Data Templates**: Copy-paste templates for adding files to your portfolio data

### 👥 Testimonial Management

- **Review Submissions**: View all client testimonial submissions
- **Approve/Reject**: Approve testimonials to display on your portfolio or reject inappropriate ones
- **Status Tracking**: Track pending, approved, and rejected testimonials
- **Detail View**: View full testimonial details including avatar and message
- **Delete Management**: Remove unwanted testimonials

## How to Use

### First Time Access

1. Go to `yourdomain.com/admin`
2. You'll be redirected to the login page
3. Enter username: `Elfarus` and password: `ELFA7@me`
4. Click "Sign In"
5. You'll be redirected to the admin dashboard

### Using the Admin Panel

The admin panel has two main tabs:

- **File Upload**: For uploading design files
- **Testimonials**: For managing client testimonials

### Uploading Design Files

1. Select the **File Upload** tab
2. Choose the appropriate category from the dropdown
3. Use the file uploader to select your design files
4. Files will be automatically uploaded to Cloudinary
5. Copy the generated URLs to use in your portfolio data
6. Use the provided data template to add files to your portfolio

### Managing Testimonials

1. Select the **Testimonials** tab
2. View all submitted testimonials in a table format
3. Use the action buttons:
   - 👁️ **View**: See full testimonial details
   - ✅ **Approve**: Approve testimonial to display on portfolio
   - ❌ **Reject**: Reject inappropriate testimonials
   - 🗑️ **Delete**: Remove testimonial permanently

### Logging Out

- Click the red **Logout** button in the top-right corner
- You'll be redirected to the login page
- Your session will be cleared

### Testimonial Status

- **Pending**: New submissions awaiting review
- **Approved**: Testimonials that will display on your portfolio
- **Rejected**: Testimonials that won't be displayed

## API Endpoints

### Testimonials

- `POST /api/testimonials` - Submit new testimonial
- `GET /api/testimonials/list` - Get all testimonials
- `GET /api/testimonials/[id]` - Get specific testimonial
- `PATCH /api/testimonials/[id]` - Update testimonial status
- `DELETE /api/testimonials/[id]` - Delete testimonial

## User Submission Flow

1. **Client visits testimonials page** (`/testimonials`)
2. **Clicks "Share Your Experience"** button
3. **Fills out form** with:
   - Profile photo (circular avatar)
   - Name (max 50 characters)
   - Position/Role (max 30 characters)
   - Testimonial message (20-300 characters)
4. **Submits form** - data sent to API
5. **Admin reviews** submission in admin panel
6. **Admin approves/rejects** testimonial
7. **Approved testimonials** appear on public testimonials page

## Character Limits

- **Name**: 50 characters maximum
- **Position**: 30 characters maximum
- **Message**: 20-300 characters (minimum 20, maximum 300)

## File Upload Limits

- **Image files**: Maximum 2MB
- **Supported formats**: JPG, PNG, GIF, WebP
- **PDF files**: Maximum 10MB

## Security Features

- **Form validation**: Client-side and server-side validation
- **File type validation**: Only allowed file types accepted
- **File size limits**: Prevents large file uploads
- **Status management**: Only approved testimonials displayed publicly
- **Session management**: Automatic logout after 24 hours
- **Authentication**: Required for all admin functions

## Customization

### Changing Login Credentials

To change the admin credentials, edit the authentication check in `/pages/admin/login.js`:

```javascript
if (credentials.username === "Elfarus" && credentials.password === "ELFA7@me") {
  // Change these values to your desired credentials
}
```

### Adding New Categories

To add new design categories:

1. Update the category dropdown in `/pages/admin/index.js`
2. Add corresponding options in the file uploader
3. Update your portfolio data structure

### Modifying Character Limits

Edit the constants in `/components/TestimonialSubmissionForm.js`:

```javascript
const MAX_MESSAGE_LENGTH = 300;
const MAX_NAME_LENGTH = 50;
const MAX_POSITION_LENGTH = 30;
```

### Database Integration

The current implementation uses mock data. To integrate with a real database:

1. Replace mock API responses with actual database queries
2. Update the API endpoints in `/pages/api/testimonials/`
3. Add proper authentication and authorization

## Troubleshooting

### Login Issues

- **Wrong credentials**: Double-check username and password
- **Session expired**: Login again after 24 hours
- **Page not loading**: Check browser console for errors

### Testimonials Not Loading

- Check browser console for API errors
- Verify API endpoints are working
- Check network connectivity

### File Upload Issues

- Verify Cloudinary configuration
- Check file size and type restrictions
- Ensure proper API keys are set

### Admin Panel Not Accessible

- Verify the `/admin` route is properly configured
- Check for any authentication requirements
- Ensure all components are properly imported

## Future Enhancements

- **Enhanced Authentication**: Add login system with database storage
- **Email Notifications**: Notify admin of new submissions
- **Bulk Actions**: Approve/reject multiple testimonials at once
- **Analytics**: Track submission and approval statistics
- **Export**: Export testimonials to CSV/PDF
- **Search/Filter**: Advanced filtering and search capabilities
- **Two-Factor Authentication**: Add 2FA for enhanced security
