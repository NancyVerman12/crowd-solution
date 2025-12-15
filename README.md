# Crowd Management System

A comprehensive crowd management solution built with Vite and TypeScript.

## Features

- Real-time Dashboard
- Event Management
- User Authentication (Local)
- Analytics and Reporting

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository or extract the project files.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Option 1: Netlify (Easiest - Drag & Drop)

1. Build the project:
   ```bash
   npm run build
   ```
2. Locate the `dist` folder in your project directory.
3. Zip the `dist` folder (e.g., `project-deploy.zip`).
4. Go to [Netlify Drop](https://app.netlify.com/drop).
5. Drag and drop the zip file or the `dist` folder to deploy.

### Option 2: GitHub Pages

1. Ensure the project is a Git repository and connected to GitHub.
2. Install the deployment tool (if not already installed):
   ```bash
   npm install --save-dev gh-pages
   ```
3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```
   This command will build the project and push the `dist` folder to the `gh-pages` branch.
4. On GitHub, go to **Settings > Pages** and ensure the source is set to `gh-pages` branch.

### Option 3: Other Static Hosts (Vercel, Render)

Most static site hosts will automatically detect the settings:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
