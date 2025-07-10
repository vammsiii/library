# Complete Setup Guide - Online Library Management System

## Step-by-Step Instructions to Run on Your PC

### Step 1: Download and Extract the Project
1. **Download the project files** (ZIP file or folder)
2. **Extract/Unzip** the files to a location on your PC (e.g., Desktop, Documents)
3. **Remember the folder location** - you'll need to navigate to it

### Step 2: Install Node.js (Required)
1. **Go to** https://nodejs.org/
2. **Download** the LTS (Long Term Support) version for Windows
3. **Run the installer** (.msi file)
4. **Follow the installation wizard** - accept all default settings
5. **Restart your computer** after installation

### Step 3: Verify Node.js Installation
1. **Press** `Windows Key + R`
2. **Type** `cmd` and press Enter (opens Command Prompt)
3. **Type** `node --version` and press Enter
4. **Type** `npm --version` and press Enter
5. **You should see version numbers** (e.g., v18.17.0 and 9.6.7)
   - If you see "command not found" or similar error, restart your PC and try again

### Step 4: Navigate to Project Folder
1. **Open Command Prompt** (Windows Key + R, type `cmd`, press Enter)
2. **Navigate to your project folder** using `cd` command:
   ```
   cd C:\Users\YourUsername\Desktop\library-project
   ```
   (Replace with your actual folder path)
3. **Alternative method**: 
   - Open the project folder in File Explorer
   - Click in the address bar and type `cmd`
   - Press Enter (opens Command Prompt in that folder)

### Step 5: Install Project Dependencies
1. **In the Command Prompt**, type:
   ```
   npm install
   ```
2. **Press Enter** and wait (this may take 2-5 minutes)
3. **You'll see** lots of text scrolling - this is normal
4. **Wait until** you see the command prompt again (installation complete)

### Step 6: Start the Development Server
1. **Type** the following command:
   ```
   npm run dev
   ```
2. **Press Enter**
3. **You should see** output similar to:
   ```
   > vite-react-typescript-starter@0.0.0 dev
   > vite
   
   VITE v5.4.2  ready in 500 ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

### Step 7: Open the Application
1. **Open your web browser** (Chrome, Firefox, Edge, etc.)
2. **Go to** the URL shown in the terminal (usually `http://localhost:5173/`)
3. **You should see** the Library Management System dashboard

### Step 8: Using the Application
- **Dashboard**: Overview with statistics
- **Books**: Manage book inventory
- **Students**: Register and manage students
- **Issue/Return**: Handle book loans
- **Reports**: View analytics and reports

## Troubleshooting Common Issues

### Issue 1: "npm is not recognized"
**Solution**: Node.js is not installed properly
- Reinstall Node.js from https://nodejs.org/
- Restart your computer
- Try again

### Issue 2: "Port 5173 is already in use"
**Solution**: Another application is using the port
- Close other development servers
- Or use a different port: `npm run dev -- --port 3000`

### Issue 3: Installation fails or takes too long
**Solution**: Network or permission issues
- Run Command Prompt as Administrator
- Clear npm cache: `npm cache clean --force`
- Try again: `npm install`

### Issue 4: Browser shows "This site can't be reached"
**Solution**: Server is not running
- Make sure the `npm run dev` command is still running
- Check the terminal for any error messages
- Restart the server if needed

### Issue 5: Changes not showing up
**Solution**: Browser cache
- Press `Ctrl + F5` to hard refresh
- Or clear browser cache

## Stopping the Application
- **To stop the server**: Press `Ctrl + C` in the Command Prompt
- **To restart**: Run `npm run dev` again

## File Structure
```
project-folder/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── App.tsx            # Main application
│   └── main.tsx           # Entry point
├── public/                # Static files
├── package.json           # Dependencies
└── README.md              # Documentation
```

## Next Steps
- The application currently uses mock data
- To connect to a real database, you'll need to set up the MySQL backend
- All features are fully functional for demonstration purposes

## Need Help?
If you encounter any issues:
1. Check the terminal for error messages
2. Make sure Node.js is properly installed
3. Ensure you're in the correct project directory
4. Try restarting your computer if nothing works