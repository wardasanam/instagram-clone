# **Instagram Clone (React \+ Tailwind CSS)**

A fully functional, responsive Instagram clone built with **React** and styled with **Tailwind CSS**. This single-page application replicates the core features of the Instagram mobile and web experience, including a feed, stories, reels, profile management, and more.

## **✨ Features**

* **📱 Fully Responsive Design:** Adaptive layout that works seamlessly on mobile (bottom navigation) and desktop (sidebar navigation).  
* **🔐 Authentication (Simulated):**  
  * Login and Sign Up functionality.  
  * **Dynamic User Profiles:** New users get a unique profile with automatically generated random posts.  
  * **Mock User:** Login as react\_developer to see a pre-populated profile with specific content.  
* **🏠 Home Feed:**  
  * Scrollable feed with posts.  
  * **Carousel Posts:** Support for multiple images in a single post (swipe/click to view).  
  * **Interactions:** Like (double-tap animation), comment, and save posts.  
* **📸 Stories:**  
  * Scrollable story rail.  
  * **Story Viewer:** Full-screen immersive viewer with auto-progress bars.  
* **🎥 Reels:**  
  * Vertical, snap-scrolling video feed.  
  * Play/Pause functionality.  
  * Simulated interactions (like, comment, share).  
* **➕ Create Post:**  
  * **File Upload:** Select images from your local computer.  
  * **Image Filters:** Apply CSS-based filters (Clarendon, Gingham, etc.) to your uploads.  
  * **Preview & Delete:** Review selected images before posting.  
* **👤 Profile:**  
  * Grid view of user posts.  
  * **Highlights:** Story highlights section.  
  * **Tabs:** Switch between Posts, Saved, and Tagged (UI only).  
* **💬 Direct Messages:**  
  * Chat interface with user list and active conversation view.  
* **🔍 Explore:**  
  * Masonry-style grid layout for discovering new content.  
* **❤️ Notifications:**  
  * Activity feed showing likes and follows.  
* **🌓 Dark Mode:**  
  * Full dark mode support toggleable from the "More" menu.

## **🛠️ Tech Stack**

* **Frontend Library:** React.js (Hooks: useState, useEffect, useRef)  
* **Styling:** Tailwind CSS (Utility-first CSS framework)  
* **Icons:** Inline SVG Icons (Lucide-style)  
* **Build Tool:** Vite (Recommended)

## **🚀 Getting Started**

To run this project locally, follow these steps:

### **Prerequisites**

* Node.js (v14 or higher)  
* npm or yarn

### **Installation**

1. **Clone the repository:**  
   git clone \[https://github.com/your-username/instagram-clone.git\](https://github.com/your-username/instagram-clone.git)  
   cd instagram-clone

2. **Install dependencies:**  
   npm install  
   \# or  
   yarn install

3. Install Tailwind CSS (if not already set up):  
   If you are setting this up from scratch, ensure you have the Tailwind dependencies:  
   npm install \-D tailwindcss postcss autoprefixer  
   npx tailwindcss init \-p

4. **Run the development server:**  
   npm run dev  
   \# or  
   yarn dev

5. Open in Browser:  
   Navigate to http://localhost:5173 (or the port shown in your terminal).

## **📂 Project Structure**

src/  
├── App.jsx            \# Main application component containing all logic and sub-components  
├── index.css          \# Global styles, Tailwind directives, and custom animations  
├── main.jsx           \# Entry point (renders App.jsx)  
postcss.config.js      \# PostCSS configuration for Tailwind  
tailwind.config.js     \# Tailwind configuration (custom animations, content paths)

## **🎨 Customizations**

### **Animations**

This project uses custom Tailwind keyframe animations defined in tailwind.config.js:

* like-heart: The pulsing heart animation when double-clicking a post.  
* fade-in / zoom-in: Modal transitions.  
* marquee: Scrolling text for music titles in Reels.

### **Mock Data**

All data (users, posts, stories, reels) is currently stored in MOCK\_USERS and INITIAL\_POSTS constants within src/App.jsx. You can modify these arrays to change the initial content.

## **📝 License**

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

**Note:** This is a frontend clone for educational purposes. It simulates backend functionality (like logging in and posting) using local React state. Refreshing the page will reset the data unless you connect it to a real backend (e.g., Firebase, Supabase).