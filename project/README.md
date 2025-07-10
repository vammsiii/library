# Online Library Management System

A modern React-based library management system with a clean, professional interface.

## Prerequisites

Before running this project, make sure you have the following installed on your PC:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

## Setup Instructions

### 1. Extract/Download the Project
- If you downloaded a ZIP file, extract it to your desired location
- If you cloned from Git, navigate to the project folder

### 2. Open Terminal/Command Prompt
- Navigate to the project root directory
- On Windows: Open Command Prompt or PowerShell
- On Mac/Linux: Open Terminal

### 3. Install Dependencies
Run the following command to install all required packages:

```bash
npm install
```

This will install all dependencies listed in `package.json` including:
- React and React DOM
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

### 4. Start the Development Server
Run the following command to start the local development server:

```bash
npm run dev
```

### 5. Access the Application
- The terminal will show a local URL (usually `http://localhost:5173`)
- Open your web browser and navigate to that URL
- You should see the Library Management System dashboard

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── BookManagement.tsx
│   ├── StudentManagement.tsx
│   ├── IssueReturn.tsx
│   ├── Reports.tsx
│   └── Layout.tsx       # Main layout wrapper
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles

public/                 # Static assets
package.json           # Dependencies and scripts
```

## Features

- **Dashboard**: Overview with statistics and quick actions
- **Book Management**: Add, search, and manage books
- **Student Management**: Register and manage students
- **Issue/Return**: Handle book loans and returns
- **Reports**: View analytics and generate reports

## Current Status

This is a **frontend-only** application with mock data. To make it fully functional, you would need to:

1. Set up a MySQL database using the provided schema
2. Run the Flask backend API
3. Connect the frontend to the backend endpoints

## Troubleshooting

### Common Issues:

1. **"npm is not recognized"**
   - Node.js is not installed or not in PATH
   - Reinstall Node.js and restart terminal

2. **Port already in use**
   - Another application is using port 5173
   - Kill the process or use a different port: `npm run dev -- --port 3000`

3. **Dependencies not installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

4. **Build errors**
   - Check Node.js version (should be 16+)
   - Ensure all dependencies are installed

## Next Steps

To make this a complete system:
1. Set up MySQL database
2. Deploy Flask backend
3. Connect frontend to backend APIs
4. Add authentication and authorization

For help with backend setup, refer to the Flask application files provided earlier.