# Hope Family Courtesy Newsletter Frontend

A React-based newsletter application for the Hope Family community.

## Features

- **Authentication System**: Complete login/signup functionality with JWT tokens
- **Navigation**: Responsive navigation with logout functionality
- **Blog Management**: Create and publish articles with media attachments
- **Gallery**: Photo and video sharing
- **Birthday Tracking**: Member birthday management
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Authentication

The application now includes a complete authentication system:

### Login
- Users can log in with email and password
- JWT tokens are stored in localStorage
- Automatic redirect to home page after successful login

### Logout
- Logout button is available in the navigation bar
- Clears authentication token and redirects to login page
- Available on both desktop and mobile views

### Protected Routes
- Articles page requires authentication
- Token is automatically included in API requests

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Make sure the backend server is running on `http://localhost:3008`

## API Endpoints

- `POST /api/login` - User authentication
- `POST /api/signup` - User registration
- `POST /api/uploadBlog` - Blog creation (requires authentication)

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Axios for API calls
- Lucide React for icons
- Vite for build tooling

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation with logout
│   ├── Login.jsx       # Authentication form
│   ├── Signup.jsx      # Registration form
│   └── Articles.jsx    # Blog creation
├── context/            # React context
│   └── AuthContext.jsx # Authentication state management
└── App.jsx            # Main application component
```

## Authentication Flow

1. User visits the application
2. If not authenticated, they see login/signup options
3. After successful login, JWT token is stored
4. User can access protected features like Articles
5. Logout button clears token and redirects to login

## Styling

The application uses Tailwind CSS with custom components:
- Glass morphism effects
- Gradient text and buttons
- Responsive navigation
- Modern form styling
