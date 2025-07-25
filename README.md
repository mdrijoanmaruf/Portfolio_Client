# Portfolio Website

A modern, responsive portfolio website built with React.js and supported by a Node.js/Express backend. This portfolio showcases projects, skills, and professional information with an interactive and visually appealing interface.

![Portfolio Website](https://portfolio.rijoan.com/og-image.png)

## 🌐 Live Demo

- **Portfolio Website:** [portfolio.rijoan.com](https://portfolio.rijoan.com)
- **API Endpoint:** [api.portfolio.rijoan.com](https://server-theta-roan.vercel.app/api)

## ✨ Features

### Frontend
- **Responsive Design:** Fully responsive across all device sizes
- **Modern UI/UX:** Beautiful transitions and animations using CSS and AOS library
- **Dynamic Project Gallery:** Display and filter projects by category
- **Project Upload System:** Admin panel to add and manage projects
- **Image Upload Integration:** ImgBB integration for project images
- **Dark Mode Interface:** Sleek dark mode design with modern gradients
- **Contact Form:** Interactive contact form with validation
- **Skills Showcase:** Visual representation of technical skills

### Backend
- **RESTful API:** Complete CRUD operations for portfolio projects
- **MongoDB Integration:** NoSQL database with proper data modeling
- **Authentication:** Admin-specific routes protection
- **Image Handling:** Integration with ImgBB for image uploads
- **Error Handling:** Comprehensive error responses

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **AOS** - Animate On Scroll library
- **Firebase** - Authentication
- **SweetAlert2** - Enhanced popups and alerts
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **MongoDB Node.js Driver** - Database connectivity
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable loader

## 📋 Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB
- Firebase account (for authentication)
- ImgBB API key

### Client Setup
```bash
# Clone the repository
git clone https://github.com/mdrijoanmaruf/Portfolio_Client.git

# Navigate to the client directory
cd Portfolio_Client

# Install dependencies
npm install

# Create a .env file in the root directory with the following:
VITE_API_URL=http://localhost:5000/api
VITE_IMGBB_API=your_imgbb_api_key
# Add Firebase configuration variables

# Start the development server
npm run dev
```

### Server Setup
```bash
# Clone the repository
git clone https://github.com/mdrijoanmaruf/Portfolio_Server.git

# Navigate to the server directory
cd Portfolio_Server

# Install dependencies
npm install

# Create a .env file in the root directory with the following:
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development

# Start the server
npm start
```

## 📁 Project Structure

### Client Structure
```
Portfolio_Client/
├── public/
│   ├── Social.json
│   └── assets/
├── src/
│   ├── App.jsx
│   ├── Contexts/
│   │   └── AuthContext/
│   ├── Firebase/
│   ├── Hooks/
│   ├── Layout/
│   ├── Pages/
│   │   ├── About/
│   │   ├── AddProject/
│   │   ├── Admin/
│   │   ├── Contact/
│   │   ├── Education/
│   │   ├── Home/
│   │   ├── ProjectDetails/
│   │   └── ProjectsList/
│   ├── Router/
│   ├── Shared/
│   │   ├── Footer/
│   │   ├── LoadingAnimation/
│   │   └── Navbar/
│   └── utils/
├── tailwind.config.js
└── vite.config.js
```

### Server Structure
```
Portfolio_Server/
├── index.js          # Main server file with all routes
├── package.json      # Dependencies and scripts
└── .env             # Environment variables (not in repo)
```

## 📝 API Documentation

### Base URL
```
https://api.portfolio.rijoan.com/api
```

### Endpoints

#### Projects Management

| Method | Endpoint               | Description                | Admin Only |
| ------ | ---------------------- | -------------------------- | ---------- |
| GET    | /api/projects          | Get all projects           | No         |
| GET    | /api/projects/featured | Get featured projects only | No         |
| GET    | /api/projects/:id      | Get single project by ID   | No         |
| POST   | /api/projects          | Create new project         | Yes        |
| PUT    | /api/projects/:id      | Update existing project    | Yes        |
| DELETE | /api/projects/:id      | Delete project             | Yes        |

## 🚀 Deployment

The project is deployed using Vercel:
- Frontend: [portfolio.rijoan.com](https://portfolio.rijoan.com)
- Backend: [api.portfolio.rijoan.com](https://server-theta-roan.vercel.app/api)

## 🔑 Authentication

- Admin operations require specific email authentication
- Admin email: `rijoanmaruf@gmail.com`

## 👨‍💻 Author

**Md Rijoan Maruf**

- Website: [portfolio.rijoan.com](https://portfolio.rijoan.com)
- GitHub: [@mdrijoanmaruf](https://github.com/mdrijoanmaruf)
- LinkedIn: [mdrijoanmaruf](https://www.linkedin.com/in/mdrijoanmaruf/)
- Facebook: [md.rijoanmaruf](https://www.facebook.com/md.rijoanmaruf)
- Instagram: [rijoanmaruf](https://www.instagram.com/rijoanmaruf)
- LeetCode: [mdrijoanmaruf](https://leetcode.com/u/mdrijoanmaruf/)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [ImgBB](https://imgbb.com/)
