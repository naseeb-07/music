---
description: How to push your project to GitHub and deploy it to Vercel
---

# Deployment Guide

Follow these steps to share your music player on GitHub and host it live on Vercel.

## 1. Upload to GitHub

If you haven't already, install [Git](https://git-scm.com/) and create a [GitHub account](https://github.com/).

### Step 1: Initialize Git
Open your terminal in the project folder and run:
```powershell
git init
git add .
git commit -m "Initial commit: Spotify-inspired music player"
```

### Step 2: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `excelon-music-player`).
3. Leave it as "Public" and do **not** initialize it with a README or .gitignore.
4. Click **Create repository**.

### Step 3: Push to GitHub
Copy the commands from the "push an existing repository" section on GitHub, which look like this:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 2. Host on Vercel

Vercel is the best place to host Next.js apps.

### Step 1: Sign up
Go to [vercel.com](https://vercel.com/) and sign up using your **GitHub account**.

### Step 2: Import Project
1. Click the **"Add New..."** button and select **"Project"**.
2. You will see a list of your GitHub repositories. Click **"Import"** next to your music player repo.

### Step 3: Configure and Deploy
1. Vercel will automatically detect that it's a Next.js project.
2. You don't need to change any settings.
3. Click **"Deploy"**.

### Step 4: Access your Site!
Once the build is finished (usually takes < 2 minutes), Vercel will give you a public URL (e.g., `excelon-music-player.vercel.app`). 

---
**Note:** Every time you `git push` new changes to GitHub, Vercel will automatically update your live website!
