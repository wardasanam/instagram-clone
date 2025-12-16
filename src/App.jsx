import React, { useState, useEffect, useRef } from 'react';

// --- Inline Styles (Replaces index.css to fix build error) ---
const globalStyles = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  /* Custom scrollbar hiding for Stories rail */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  /* Animation for the Music ticker in Reels */
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    display: inline-block;
    animation: marquee 10s linear infinite;
  }

  /* Heart Animation */
  @keyframes like-heart {
    0% { opacity: 0; transform: scale(0); }
    15% { opacity: 1; transform: scale(1.2); }
    30% { transform: scale(0.95); }
    40%, 80% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0); }
  }
  .animate-like-heart {
    animation: like-heart 1.2s ease-in-out forwards;
  }
`;

// --- Inline Icons (No external dependencies required) ---

const IconWrapper = ({ children, className, onClick, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    onClick={onClick}
    {...props}
  >
    {children}
  </svg>
);

// Icons
const Home = (props) => <IconWrapper {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></IconWrapper>;
const Search = (props) => <IconWrapper {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></IconWrapper>;
const SearchIcon = Search;
const PlusSquare = (props) => <IconWrapper {...props}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></IconWrapper>;
const Heart = (props) => <IconWrapper {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></IconWrapper>;
const User = (props) => <IconWrapper {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></IconWrapper>;
const MessageCircle = (props) => <IconWrapper {...props}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></IconWrapper>;
const Send = (props) => <IconWrapper {...props}><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></IconWrapper>;
const Bookmark = (props) => <IconWrapper {...props}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></IconWrapper>;
const MoreHorizontal = (props) => <IconWrapper {...props}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></IconWrapper>;
const Smile = (props) => <IconWrapper {...props}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></IconWrapper>;
const Image = (props) => <IconWrapper {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></IconWrapper>;
const ImageIcon = Image;
const X = (props) => <IconWrapper {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>;
const Instagram = (props) => <IconWrapper {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></IconWrapper>;
const Menu = (props) => <IconWrapper {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconWrapper>;
const Compass = (props) => <IconWrapper {...props}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></IconWrapper>;
const Clapperboard = (props) => <IconWrapper {...props}><path d="M20.2 6 3 11l-.9-2.4c-.5-1.1.2-2.4 1.3-2.9L13.8 2c1.1-.5 2.4.2 2.9 1.3l3.5 2.7c-1.7 1.6-2.7 3.7-3.1 4.9l-3.4-1.3c-.4-.1-.8.1-1 .5-.2.4 0 .8.3 1l3.4 1.3c.4.2.9 0 1.1-.4.2-.4 0-.9-.4-1l3.4 1.3c.4.1.8-.1 1-.5.1-.4-.1-.8-.5-1l-3.4-1.3Z"/><path d="M4 11v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8H4Z"/></IconWrapper>;
const Music = (props) => <IconWrapper {...props}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></IconWrapper>;
const Camera = (props) => <IconWrapper {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconWrapper>;
const ChevronLeft = (props) => <IconWrapper {...props}><path d="m15 18-6-6 6-6"/></IconWrapper>;
const ChevronRight = (props) => <IconWrapper {...props}><path d="m9 18 6-6-6-6"/></IconWrapper>;
const MapPin = (props) => <IconWrapper {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconWrapper>;
const Users = (props) => <IconWrapper {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconWrapper>;
const Settings = (props) => <IconWrapper {...props}><path d="M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></IconWrapper>;
const ArrowLeft = (props) => <IconWrapper {...props}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></IconWrapper>;
const Sun = (props) => <IconWrapper {...props}><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></IconWrapper>;
const Moon = (props) => <IconWrapper {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></IconWrapper>;
const LogOut = (props) => <IconWrapper {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></IconWrapper>;
const Trash2 = (props) => <IconWrapper {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></IconWrapper>;

// --- Mock Data ---

const MOCK_USERS = [
  {
    id: 'user_1',
    username: 'react_developer',
    name: 'React Dev',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
    bio: 'Building cool things with code ⚛️ | Travel | Coffee',
    followers: 1240,
    following: 450,
    isOnline: true
  },
  {
    id: 'user_2',
    username: 'design_pro',
    name: 'Jessica Design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'UX/UI Designer 🎨 | Minimalist',
    followers: 8500,
    following: 320,
    isOnline: true
  },
  {
    id: 'user_3',
    username: 'adventure_time',
    name: 'Mike Travels',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    bio: 'Explorer 🌍 | Photography',
    followers: 3200,
    following: 500,
    isOnline: false
  }
];

const INITIAL_STORIES = [
  { id: 1, username: 'alex_g', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', storyImage: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600&h=1000&fit=crop' },
  { id: 2, username: 'sarah_j', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', storyImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=1000&fit=crop' },
  { id: 3, username: 'mike_t', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', storyImage: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=1000&fit=crop' },
];

const HIGHLIGHTS = [
    { id: 1, title: 'Travel 2024', cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=150&h=150&fit=crop' },
    { id: 2, title: 'Design', cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop' },
    { id: 3, title: 'Food', cover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150&h=150&fit=crop' },
];

const REELS = [
  { 
    id: 1, 
    username: 'travel_addict', 
    description: 'Sunset in Bali 🌅 #travel #vibes', 
    likes: '14.2K', 
    comments: '120', 
    music: 'Original Audio - travel_addict', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    poster: 'https://images.unsplash.com/photo-1437486077442-1c7ad74c6d07?w=400&h=700&fit=crop'
  },
  { 
    id: 2, 
    username: 'foodie_hub', 
    description: 'Best burger in town! 🍔 #foodporn', 
    likes: '8,432', 
    comments: '88', 
    music: 'Yummy - Justin Bieber', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    poster: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=700&fit=crop' 
  },
  { 
    id: 3, 
    username: 'fitness_gym', 
    description: 'No pain no gain 💪 #gym #workout', 
    likes: '22.1K', 
    comments: '340', 
    music: 'Power - Kanye West', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-man-running-on-the-beach-1175-large.mp4',
    poster: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=700&fit=crop' 
  },
];

const NOTIFICATIONS = [
  { id: 1, type: 'like', user: 'sarah_j', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', text: 'liked your photo.', time: '2m', postImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop' },
  { id: 2, type: 'follow', user: 'mike_t', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', text: 'started following you.', time: '1h', following: false },
  { id: 3, type: 'like', user: 'urban_style', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', text: 'liked your comment: "Amazing shot!"', time: '3h', postImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop' },
  { id: 4, type: 'follow', user: 'design_pro', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop', text: 'started following you.', time: '5h', following: true },
];

const CHATS = [
    { 
        id: 1, 
        user: 'design_pro', 
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        lastMessage: 'Sent you a photo',
        timestamp: 'Now',
        unread: true,
        isOnline: true,
        messages: [
            { id: 1, sender: 'them', text: 'Hey! Did you see the new React update?', time: '10:00 AM' },
            { id: 2, sender: 'me', text: 'Yes! It looks amazing. Concurrent mode is huge.', time: '10:05 AM' },
            { id: 3, sender: 'them', text: 'Absolutely. Are you updating your projects?', time: '10:06 AM' }
        ]
    },
    { 
        id: 2, 
        user: 'adventure_time', 
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        lastMessage: 'See you tomorrow! 👋',
        timestamp: '2h ago',
        unread: false,
        isOnline: false,
        messages: [
            { id: 1, sender: 'them', text: 'Hiking trip still on?', time: 'Yesterday' },
            { id: 2, sender: 'me', text: 'You know it! Packing now.', time: 'Yesterday' }
        ]
    }
];

// Consolidated all posts here so we can assign them to specific users
const INITIAL_POSTS = [
  {
    id: 1,
    username: 'nature_lover',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    images: [
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop',
    caption: 'Photo dump from the weekend! 🏔️🌲 #nature #peace',
    likes: 124,
    isLiked: false,
    isSaved: false,
    timestamp: '2h',
    comments: [
      { user: 'hiker_dave', text: 'Absolute goals! Where is this?' },
      { user: 'photo_daily', text: 'Great shots!' }
    ]
  },
  {
    id: 2,
    username: 'urban_style',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop'],
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop',
    caption: 'Street style vibes. 🕶️',
    likes: 856,
    isLiked: true,
    isSaved: true,
    timestamp: '5h',
    comments: [
      { user: 'fashion_week', text: 'Love the fit!' }
    ]
  },
  {
    id: 3,
    username: 'coffee_addict',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
    images: ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=800&fit=crop'],
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=800&fit=crop',
    caption: 'Productivity fuel. ☕',
    likes: 42,
    isLiked: false,
    isSaved: false,
    timestamp: '8h',
    comments: []
  },
  {
    id: 4,
    username: 'tech_setup',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop'],
    caption: 'Minimal workspace setup 💻',
    likes: 1542,
    isLiked: false,
    isSaved: false,
    timestamp: '10h',
    comments: [
      { user: 'dev_life', text: 'Clean setup!' },
      { user: 'coder_girl', text: 'Monitor specs?' }
    ]
  },
  // --- React Developer's Posts (Only visible when logged in as React Dev) ---
  { id: 101, username: 'react_developer', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png', likes: 320, comments: [], timestamp: '1w', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=500&fit=crop', images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=500&fit=crop'], caption: 'React vibes ⚛️' },
  { id: 102, username: 'react_developer', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png', likes: 150, comments: [], timestamp: '2w', image: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=500&h=500&fit=crop', images: ['https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=500&h=500&fit=crop'], caption: 'Sunset coding session' },
  { id: 103, username: 'react_developer', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png', likes: 890, comments: [], timestamp: '3w', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop', images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop'], caption: 'Workspace goals' },
  { id: 104, username: 'react_developer', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png', likes: 210, comments: [], timestamp: '4w', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=500&fit=crop', images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=500&fit=crop'], caption: 'Fashion week' },
  { id: 105, username: 'react_developer', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png', likes: 543, comments: [], timestamp: '5w', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&h=500&fit=crop', images: ['https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&h=500&fit=crop'], caption: 'Nature walk' },
  { id: 106, username: 'react_developer', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png', likes: 112, comments: [], timestamp: '6w', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=500&fit=crop', images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=500&fit=crop'], caption: 'Mountains' },
  { id: 107, username: 'react_developer', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png', likes: 876, comments: [], timestamp: '7w', image: 'https://images.unsplash.com/photo-1501854140884-074cf2b2c7c6?w=500&h=500&fit=crop', images: ['https://images.unsplash.com/photo-1501854140884-074cf2b2c7c6?w=500&h=500&fit=crop'], caption: 'Lake view' },
  { id: 108, username: 'react_developer', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png', likes: 332, comments: [], timestamp: '8w', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'], caption: 'Red shoes' },
  { id: 109, username: 'react_developer', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png', likes: 421, comments: [], timestamp: '9w', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop', images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop'], caption: 'Portrait' },
];

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "font-semibold text-sm rounded px-4 py-1.5 transition-colors duration-200";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700",
    text: "text-blue-500 hover:text-blue-700 px-0",
    ghost: "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-2"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- Auth Component (Login/Signup) ---
const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [inputVal, setInputVal] = useState(''); // Username/Email
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputVal) return;

        // Create a dynamic user based on input
        const username = inputVal.includes('@') ? inputVal.split('@')[0] : inputVal;
        
        // If the username matches the mock user, log them in as that user with data
        if (username.toLowerCase() === 'react_developer') {
             onLogin(MOCK_USERS[0]);
             return;
        }

        // Otherwise create a new user with default DP
        const newUser = {
            id: `user_${Date.now()}`,
            username: username.toLowerCase().replace(/\s/g, '_'),
            name: username,
            // Default Instagram DP
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
            bio: 'New to Instagram',
            followers: 0,
            following: 0,
            isOnline: true
        };
        
        onLogin(newUser); 
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 border border-gray-300 rounded-sm w-full max-w-[350px] flex flex-col items-center mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt="Instagram" className="h-12 w-auto mb-8" />
                
                <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-2">
                    <input 
                        type="text" 
                        placeholder="Phone number, username, or email" 
                        className="bg-gray-50 border border-gray-300 rounded-sm p-2 text-xs outline-none focus:border-gray-500"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="bg-gray-50 border border-gray-300 rounded-sm p-2 text-xs outline-none focus:border-gray-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="w-full mt-2 rounded-md">{isLogin ? 'Log In' : 'Sign Up'}</Button>
                </form>
                
                <div className="flex items-center w-full my-4">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="text-gray-400 text-xs font-bold px-4">OR</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                
                <button className="text-blue-900 font-bold text-sm flex items-center justify-center w-full mb-4">
                   Login with Facebook
                </button>
                <button className="text-xs text-blue-900">Forgot password?</button>
            </div>
            
            <div className="bg-white p-4 border border-gray-300 rounded-sm w-full max-w-[350px] text-center text-sm">
                {isLogin ? (
                    <p>Don't have an account? <button onClick={() => setIsLogin(false)} className="text-blue-500 font-bold">Sign up</button></p>
                ) : (
                    <p>Have an account? <button onClick={() => setIsLogin(true)} className="text-blue-500 font-bold">Log in</button></p>
                )}
            </div>
        </div>
    );
};

// --- Chat Component ---
const MessagesPage = ({ currentUser, isDarkMode }) => {
    const [activeChatId, setActiveChatId] = useState(null);
    const activeChat = CHATS.find(c => c.id === activeChatId);
    const [messageInput, setMessageInput] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if(!messageInput.trim()) return;
        setMessageInput('');
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {/* Chat List - Hidden on mobile when chat is active */}
            <div className={`w-full md:w-[350px] flex flex-col border-r ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                    <span className="font-bold text-xl flex items-center cursor-pointer">
                        {currentUser.username} <ChevronLeft className="rotate-270 ml-1 w-4 h-4" />
                    </span>
                    <PlusSquare className="w-6 h-6" />
                </div>
                <div className="overflow-y-auto flex-1">
                    <div className="flex justify-between px-5 py-3 font-bold text-sm">
                        <span>Messages</span>
                        <span className="text-gray-500">Requests</span>
                    </div>
                    {CHATS.map(chat => (
                        <div 
                            key={chat.id} 
                            onClick={() => setActiveChatId(chat.id)}
                            className={`flex items-center px-5 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 ${activeChatId === chat.id ? 'bg-gray-100 dark:bg-gray-900' : ''}`}
                        >
                            <div className="relative">
                                <img src={chat.avatar} className="w-14 h-14 rounded-full object-cover mr-3" />
                                {chat.isOnline && (
                                    <div className="absolute bottom-0 right-3 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-black"></div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="font-sm">{chat.user}</div>
                                <div className={`text-sm ${chat.unread ? 'font-bold text-black dark:text-white' : 'text-gray-500'}`}>
                                    {chat.lastMessage} • {chat.timestamp}
                                </div>
                            </div>
                            {chat.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className={`flex-1 flex flex-col ${!activeChatId ? 'hidden md:flex' : 'flex'}`}>
                {activeChat ? (
                    <>
                        <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                            <div className="flex items-center">
                                <button onClick={() => setActiveChatId(null)} className="md:hidden mr-3"><ArrowLeft /></button>
                                <img src={activeChat.avatar} className="w-8 h-8 rounded-full mr-3" />
                                <span className="font-bold">{activeChat.user}</span>
                            </div>
                            <div className="flex space-x-4">
                                <PhoneIcon />
                                <VideoIcon />
                                <InfoIcon />
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {activeChat.messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                                        msg.sender === 'me' 
                                            ? 'bg-blue-500 text-white' 
                                            : isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4">
                            <form onSubmit={handleSendMessage} className={`flex items-center rounded-full border px-4 py-2 ${isDarkMode ? 'border-gray-700 bg-black' : 'border-gray-300 bg-white'}`}>
                                <Smile className="w-6 h-6 mr-2 text-gray-500" />
                                <input 
                                    type="text" 
                                    placeholder="Message..." 
                                    className="flex-1 bg-transparent outline-none"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                />
                                {messageInput ? (
                                    <button type="submit" className="text-blue-500 font-bold text-sm">Send</button>
                                ) : (
                                    <div className="flex space-x-3 text-gray-500">
                                        <ImageIcon className="w-6 h-6" />
                                        <Heart className="w-6 h-6" />
                                    </div>
                                )}
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                        <div className="w-24 h-24 rounded-full border-2 border-black dark:border-white flex items-center justify-center mb-4">
                            <MessageCircle className="w-12 h-12" />
                        </div>
                        <h2 className="text-xl font-light mb-2">Your Messages</h2>
                        <p className="text-gray-500 mb-4">Send private photos and messages to a friend or group.</p>
                        <Button>Send Message</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Icons helper
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;

// --- Carousel Post Component ---
const CarouselPost = ({ post, onLike, onSave, onComment, isDarkMode }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [commentText, setCommentText] = useState('');

    // Normalize images array (handle singular image prop for backward compatibility)
    const images = post.images || [post.image];

    const handleNextImage = (e) => {
        e.stopPropagation();
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    const handlePrevImage = (e) => {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        }
    };

    return (
        <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-b md:border md:rounded-lg mb-4 md:mb-6`}>
            {/* Header */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px] rounded-full cursor-pointer">
                        <img src={post.avatar} alt={post.username} className={`w-8 h-8 rounded-full border-2 object-cover ${isDarkMode ? 'border-black' : 'border-white'}`} />
                    </div>
                    <span className="font-semibold text-sm cursor-pointer hover:opacity-70">{post.username}</span>
                    <span className="text-gray-400 text-xs">• {post.timestamp}</span>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
            </div>

            {/* Carousel Image */}
            <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-900 group">
                <img 
                    src={images[currentImageIndex]} 
                    alt="Post" 
                    className="w-full h-full object-cover select-none" 
                    onDoubleClick={() => onLike(post.id)}
                />
                
                {/* Heart Animation Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center opacity-0 ${post.isLiked ? 'animate-like-heart' : ''} pointer-events-none`}>
                    <Heart className="w-24 h-24 text-white fill-current drop-shadow-lg" />
                </div>

                {/* Navigation Arrows */}
                {currentImageIndex > 0 && (
                    <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft size={20} />
                    </button>
                )}
                {currentImageIndex < images.length - 1 && (
                    <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={20} />
                    </button>
                )}

                {/* Pagination Dots */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5">
                        {images.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-blue-500' : 'bg-white/60'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => onLike(post.id)} className="focus:outline-none transform active:scale-110 transition-transform">
                            {post.isLiked ? <Heart className="w-6 h-6 text-red-500 fill-current" /> : <Heart className="w-6 h-6 hover:text-gray-500" />}
                        </button>
                        <MessageCircle className="w-6 h-6 hover:text-gray-500 cursor-pointer -rotate-90" />
                        <Send className="w-6 h-6 hover:text-gray-500 cursor-pointer" />
                    </div>
                    <button onClick={() => onSave(post.id)}>
                        {post.isSaved ? <Bookmark className="w-6 h-6 fill-current" /> : <Bookmark className="w-6 h-6 hover:text-gray-500" />}
                    </button>
                </div>

                <div className="font-semibold text-sm mb-1">{post.likes.toLocaleString()} likes</div>
                <div className="text-sm mb-2">
                    <span className="font-semibold mr-2">{post.username}</span>
                    {post.caption}
                </div>
                
                {post.comments.length > 0 && (
                    <div className="text-gray-500 text-sm mb-2 cursor-pointer">View all {post.comments.length} comments</div>
                )}
                
                {post.comments.slice(-2).map((comment, idx) => (
                    <div key={idx} className="text-sm mb-1">
                        <span className="font-semibold mr-2">{comment.user}</span>
                        {comment.text}
                    </div>
                ))}
                
                <form onSubmit={(e) => { e.preventDefault(); onComment(post.id, commentText); setCommentText(''); }} className={`flex items-center mt-3 border-t pt-3 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                    <Smile className="w-5 h-5 text-gray-400 mr-3 cursor-pointer" />
                    <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="flex-1 text-sm outline-none bg-transparent"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    {commentText && <button type="submit" className="text-blue-500 font-semibold text-sm ml-2">Post</button>}
                </form>
            </div>
        </div>
    );
};

// --- Improved Create Post Modal with FILE UPLOAD & DELETE ---
const CreatePostModal = ({ isOpen, onClose, onPost, currentUser }) => {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [step, setStep] = useState(1); // 1: Select, 2: Filters, 3: Details
  const [selectedFilter, setSelectedFilter] = useState('none');
  const fileInputRef = useRef(null);

  const FILTERS = [
      { name: 'Original', class: 'none' },
      { name: 'Clarendon', class: 'contrast-[1.2] saturate-[1.3] brightness-110' },
      { name: 'Gingham', class: 'brightness-105 hue-rotate-[-10deg] sepia-[0.2]' },
      { name: 'Moon', class: 'grayscale brightness-110 contrast-110' },
      { name: 'Lark', class: 'contrast-[0.9] brightness-[1.1] saturate-[1.1]' },
      { name: 'Reyes', class: 'sepia-[0.2] brightness-[1.1] contrast-[0.85]' },
      { name: 'Juno', class: 'saturate-[1.3] contrast-[1.1] hue-rotate-[-10deg]' },
  ];

  if (!isOpen) return null;

  const handleNext = () => { 
      if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
      if (step > 1) setStep(step - 1);
      else onClose();
  };

  const handlePost = () => {
    onPost({ image: imageUrl, caption: caption, filter: selectedFilter });
    setCaption(''); setImageUrl(''); setStep(1); setSelectedFilter('none'); onClose();
  };

  const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setImageUrl(reader.result);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleDeleteImage = () => {
      setImageUrl('');
      setStep(1);
      if(fileInputRef.current) fileInputRef.current.value = ''; // Reset input
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl overflow-hidden md:h-[75vh] flex flex-col animate-in fade-in zoom-in duration-200">
         {/* Header */}
        <div className="border-b p-3 flex justify-between items-center bg-white h-[50px]">
            <button onClick={handleBack} className="text-gray-700">
                {step === 1 ? <X /> : <ArrowLeft />}
            </button>
            <span className="font-semibold text-md">
                {step === 1 ? 'Create new post' : step === 2 ? 'Edit' : 'Compose'}
            </span>
            {step < 3 ? (
                 <button onClick={handleNext} className={`text-sm font-semibold text-blue-500 ${!imageUrl && 'opacity-50'}`}>Next</button>
            ) : (
                <button onClick={handlePost} className="text-sm font-semibold text-blue-500">Share</button>
            )}
        </div>

        <div className="flex flex-col md:flex-row flex-1 bg-white overflow-hidden">
             {/* Left Image Preview Section */}
             <div className={`flex-1 bg-gray-50 flex items-center justify-center relative border-r transition-all duration-300 
                ${step === 1 ? 'md:w-full' : step === 2 ? 'md:w-[60%]' : 'md:w-[60%]'}
             `}>
                {imageUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img src={imageUrl} alt="Preview" className={`w-full h-full object-contain ${selectedFilter}`} />
                        {/* Delete Button for Image */}
                        <button 
                            onClick={handleDeleteImage}
                            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                            title="Remove Image"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="text-center p-6">
                        <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileSelect} 
                            className="hidden" 
                            accept="image/*"
                        />
                        <Button onClick={() => fileInputRef.current.click()}>Select from Computer</Button>
                    </div>
                )}
             </div>

             {/* Right Side Panels (Filters or Details) */}
             {step === 2 && imageUrl && (
                 <div className="w-full md:w-[40%] flex flex-col bg-white border-l overflow-y-auto">
                     <div className="p-4 font-semibold text-gray-500 text-sm text-center border-b">Filters</div>
                     <div className="grid grid-cols-3 gap-4 p-4">
                         {FILTERS.map((filter) => (
                             <div 
                                key={filter.name} 
                                onClick={() => setSelectedFilter(filter.class)}
                                className="flex flex-col items-center cursor-pointer space-y-2"
                             >
                                 <div className={`w-20 h-20 rounded-md overflow-hidden border-2 ${selectedFilter === filter.class ? 'border-blue-500' : 'border-transparent'}`}>
                                     <img src={imageUrl} className={`w-full h-full object-cover ${filter.class}`} />
                                 </div>
                                 <span className={`text-xs ${selectedFilter === filter.class ? 'font-bold text-blue-500' : 'text-gray-500'}`}>{filter.name}</span>
                             </div>
                         ))}
                     </div>
                 </div>
             )}

             {step === 3 && imageUrl && (
                 <div className="w-full md:w-[40%] flex flex-col bg-white border-l overflow-y-auto">
                    <div className="p-4 border-b flex items-center space-x-3">
                        <img src={currentUser.avatar} alt="Me" className="w-8 h-8 rounded-full" />
                        <span className="font-semibold text-sm">{currentUser.username}</span>
                    </div>
                    <div className="p-2">
                        <textarea 
                            className="w-full min-h-[150px] resize-none outline-none text-sm p-2"
                            placeholder="Write a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>
                    <div className="px-4 py-2 border-t text-gray-400 flex justify-between items-center">
                        <Smile className="w-5 h-5 cursor-pointer" />
                        <span className="text-xs">{caption.length}/2,200</span>
                    </div>
                    
                    {/* Additional Options */}
                    <div className="border-t border-gray-200">
                        <div className="flex justify-between items-center p-3 px-4 hover:bg-gray-50 cursor-pointer">
                            <span className="text-sm text-gray-700">Add Location</span>
                            <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex justify-between items-center p-3 px-4 border-t hover:bg-gray-50 cursor-pointer">
                            <span className="text-sm text-gray-700">Tag People</span>
                            <Users className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex justify-between items-center p-3 px-4 border-t hover:bg-gray-50 cursor-pointer">
                            <span className="text-sm text-gray-700">Accessibility</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex justify-between items-center p-3 px-4 border-t hover:bg-gray-50 cursor-pointer">
                            <span className="text-sm text-gray-700">Advanced Settings</span>
                            <Settings className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

// --- Independent Components (Moved out of App for performance & fixes) ---

const SidebarItem = ({ icon: Icon, label, active, isCompact, onClick }) => (
    <div onClick={onClick} className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition group ${active ? 'font-bold' : ''}`}>
        <Icon className={`w-6 h-6 ${active ? 'stroke-[3px]' : ''} group-hover:scale-105 transition-transform`} />
        {!isCompact && <span className="text-md">{label}</span>}
    </div>
);

// --- New Components for Reels and Notifications ---

const ReelsPage = ({ currentUser }) => {
    const togglePlay = (e) => {
        const video = e.target;
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    return (
      <div className="h-[calc(100vh-50px)] md:h-screen bg-black text-white overflow-y-scroll snap-y snap-mandatory no-scrollbar flex justify-center">
          <div className="w-full md:w-[400px]">
          {REELS.map((reel) => (
              <div key={reel.id} className="relative w-full h-full snap-start flex justify-center bg-gray-900 border-b border-gray-800">
                   <div className="relative w-full h-full bg-black">
                       <video 
                          src={reel.video} 
                          poster={reel.poster}
                          className="w-full h-full object-cover cursor-pointer"
                          loop 
                          muted 
                          playsInline
                          onClick={togglePlay}
                       />
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none"></div>
                       
                       {/* Right Side Actions */}
                       <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-6 z-20">
                           <div className="flex flex-col items-center space-y-1">
                               <Heart className="w-8 h-8" />
                               <span className="text-xs font-medium">{reel.likes}</span>
                           </div>
                           <div className="flex flex-col items-center space-y-1">
                               <MessageCircle className="w-8 h-8 -rotate-90" />
                               <span className="text-xs font-medium">{reel.comments}</span>
                           </div>
                           <Send className="w-8 h-8" />
                           <MoreHorizontal className="w-6 h-6" />
                           <div className="w-8 h-8 border-2 border-white rounded-lg overflow-hidden">
                               <img src={currentUser.avatar} className="w-full h-full object-cover" />
                           </div>
                       </div>
  
                       {/* Bottom Info */}
                       <div className="absolute bottom-8 left-4 right-12 z-20">
                           <div className="flex items-center space-x-2 mb-3">
                               <div className="w-8 h-8 rounded-full border border-white overflow-hidden bg-gray-700"></div>
                               <span className="font-semibold text-sm">{reel.username}</span>
                               <button className="border border-white/50 rounded px-2 py-0.5 text-xs font-medium ml-2">Follow</button>
                           </div>
                           <p className="text-sm mb-3 line-clamp-2">{reel.description}</p>
                           <div className="flex items-center space-x-2 text-xs">
                               <Music className="w-3 h-3" />
                               <div className="overflow-hidden w-32">
                                  <div className="whitespace-nowrap animate-marquee">{reel.music}</div>
                               </div>
                           </div>
                       </div>
                   </div>
              </div>
          ))}
          </div>
      </div>
    );
};

const NotificationsPage = () => (
    <div className="flex justify-center pb-20">
        <div className="w-full max-w-[600px] min-h-screen pt-4">
            <h2 className="font-bold text-2xl px-4 mb-6">Notifications</h2>
            
            <div className="space-y-2">
                <h3 className="font-bold text-md px-4 mb-2">This Week</h3>
                {NOTIFICATIONS.map(notif => (
                    <div key={notif.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                        <div className="flex items-center space-x-3 flex-1">
                            <div className="relative">
                                <img src={notif.avatar} className="w-11 h-11 rounded-full object-cover" />
                                {notif.type === 'like' && <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 border-2 border-white dark:border-black"><Heart size={10} className="fill-white text-white" /></div>}
                                {notif.type === 'follow' && <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white dark:border-black"><User size={10} className="fill-white text-white" /></div>}
                            </div>
                            <div className="text-sm leading-tight">
                                <span className="font-semibold">{notif.user}</span> {notif.text}
                                <span className="text-gray-400 text-xs ml-2">{notif.time}</span>
                            </div>
                        </div>
                        
                        {notif.type === 'follow' ? (
                             <button className={`${notif.following ? 'bg-gray-100 dark:bg-gray-800' : 'bg-blue-500 text-white'} px-4 py-1.5 rounded-lg text-sm font-semibold`}>
                                 {notif.following ? 'Following' : 'Follow'}
                             </button>
                        ) : (
                            <div className="w-11 h-11">
                                <img src={notif.postImage} className="w-full h-full object-cover rounded" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const HomePage = ({ posts, onLike, onSave, onComment, currentUser, stories, isDarkMode, onNavigateProfile }) => (
    <div className="flex justify-center pt-4 md:pt-8">
        <div className="w-full max-w-[470px] md:max-w-[630px] flex flex-col">
            {/* Stories Rail */}
            <div className={`flex space-x-4 overflow-x-auto p-4 rounded-lg border mb-6 no-scrollbar ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
                 {stories.map((story, idx) => (
                     <div key={idx} className="flex flex-col items-center min-w-[70px] cursor-pointer">
                         <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                             <div className={`w-full h-full rounded-full border-2 overflow-hidden ${isDarkMode ? 'border-black' : 'border-white'}`}>
                                 <img src={story.avatar} className="w-full h-full object-cover" />
                             </div>
                         </div>
                         <span className="text-xs mt-1 truncate w-16 text-center">{story.username}</span>
                     </div>
                 ))}
            </div>

            {/* Feed */}
            <div>
                {posts.map(post => (
                    <CarouselPost 
                        key={post.id} 
                        post={post} 
                        onLike={onLike} 
                        onSave={onSave} 
                        onComment={onComment}
                        isDarkMode={isDarkMode}
                    />
                ))}
                {/* Loader for Infinite Scroll */}
                <div className="h-20 flex items-center justify-center text-gray-400">
                    <div className="animate-spin w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                </div>
            </div>
        </div>
        
        {/* Right Sidebar (Suggestions) */}
        <div className="hidden lg:block w-[320px] ml-8 mt-4">
             <div className="flex items-center justify-between mb-6">
                 {/* Made clickable to navigate to profile */}
                 <div className="flex items-center space-x-4 cursor-pointer" onClick={onNavigateProfile}>
                     <img src={currentUser.avatar} className="w-12 h-12 rounded-full object-cover" />
                     <div className="flex flex-col">
                         <span className="font-bold text-sm">{currentUser.username}</span>
                         <span className="text-gray-500 text-sm">{currentUser.name}</span>
                     </div>
                 </div>
                 <span className="text-xs font-bold text-blue-500 cursor-pointer">Switch</span>
             </div>
             <div className="flex justify-between mb-4">
                 <span className="text-gray-500 font-bold text-sm">Suggested for you</span>
                 <span className="text-xs font-bold cursor-pointer">See All</span>
             </div>
             {/* Suggestions */}
             {[1, 2, 3, 4].map(i => (
                 <div key={i} className="flex items-center justify-between mb-3">
                     <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                         <div className="flex flex-col">
                             <span className="font-bold text-sm">suggested_user_{i}</span>
                             <span className="text-xs text-gray-500">New to Instagram</span>
                         </div>
                     </div>
                     <button className="text-xs font-bold text-blue-500">Follow</button>
                 </div>
             ))}
        </div>
    </div>
);

const ProfilePage = ({ posts, currentUser, highlights, isDarkMode, onPostClick }) => {
    // Filter posts to only show those belonging to the current user
    const userPosts = posts.filter(p => p.username === currentUser.username);

    return (
    <div className="flex justify-center pb-20">
        <div className="w-full max-w-[935px] px-4 pt-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:ml-10 mb-12">
                <div className="mr-0 md:mr-24 mb-6 md:mb-0">
                    <img src={currentUser.avatar} className={`w-36 h-36 rounded-full p-1 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center mb-6 space-x-4">
                        <span className="text-xl font-light">{currentUser.username}</span>
                        <Button variant="secondary">Edit profile</Button>
                        <Button variant="secondary">View archive</Button>
                        <Settings className="w-6 h-6 cursor-pointer" />
                    </div>
                    <div className="flex space-x-10 mb-6">
                        <span><b>{userPosts.length}</b> posts</span>
                        <span><b>{currentUser.followers}</b> followers</span>
                        <span><b>{currentUser.following}</b> following</span>
                    </div>
                    <div>
                        <div className="font-bold">{currentUser.name}</div>
                        <div className="whitespace-pre-wrap">{currentUser.bio}</div>
                    </div>
                </div>
            </div>

            {/* Highlights - Only show for accounts that have them (mock data) or placeholder for new */}
            <div className="flex space-x-8 overflow-x-auto py-4 mb-10 md:ml-10 no-scrollbar">
                {/* Show highlights only if this is the mock user 'react_developer' */}
                {currentUser.username === 'react_developer' && highlights.map(highlight => (
                    <div key={highlight.id} className="flex flex-col items-center cursor-pointer">
                        <div className={`w-20 h-20 rounded-full p-1 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className={`w-full h-full rounded-full bg-gray-100 overflow-hidden ${isDarkMode ? 'bg-gray-800' : ''}`}>
                                <img src={highlight.cover} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className="text-xs font-bold mt-2">{highlight.title}</span>
                    </div>
                ))}
                <div className="flex flex-col items-center cursor-pointer">
                    <div className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <PlusSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <span className="text-xs font-bold mt-2">New</span>
                </div>
            </div>

            {/* Tabs */}
            <div className={`border-t flex justify-center space-x-12 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className={`flex items-center space-x-1 py-4 border-t border-black dark:border-white -mt-px`}>
                    <ImageIcon className="w-3 h-3" /> <span className="text-xs font-bold tracking-widest">POSTS</span>
                </div>
                <div className="flex items-center space-x-1 py-4 text-gray-500 cursor-pointer">
                    <Bookmark className="w-3 h-3" /> <span className="text-xs font-bold tracking-widest">SAVED</span>
                </div>
                <div className="flex items-center space-x-1 py-4 text-gray-500 cursor-pointer">
                    <User className="w-3 h-3" /> <span className="text-xs font-bold tracking-widest">TAGGED</span>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-8">
                {userPosts.map(post => (
                    <div key={post.id} onClick={() => onPostClick(post)} className="relative aspect-square group cursor-pointer bg-gray-100 dark:bg-gray-900">
                        {post.images && post.images.length > 1 && (
                            <div className="absolute top-2 right-2 z-10">
                                <ImageIcon className="w-4 h-4 text-white drop-shadow-md" />
                            </div>
                        )}
                        <img src={post.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 hidden group-hover:flex items-center justify-center space-x-6 text-white font-bold">
                            <div className="flex items-center"><Heart className="fill-white mr-1" /> {post.likes}</div>
                            <div className="flex items-center"><MessageCircle className="fill-white mr-1" /> {post.comments.length}</div>
                        </div>
                    </div>
                ))}
                
                {userPosts.length === 0 && (
                    <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-500">
                        <Camera className="w-16 h-16 mb-4" />
                        <h3 className="text-xl font-bold mb-2">No Posts Yet</h3>
                        <p>Start capturing and sharing your moments.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

// --- Main App Wrapper ---
const App = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState('home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Start logged out
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['react', 'javascript', 'photography']);
  const [selectedPost, setSelectedPost] = useState(null);
  const isLoadingRef = useRef(false); // Fix for infinite scroll spam

  // Handle Login & Generate Random Content for New Users
  const handleLogin = (user) => {
      setCurrentUser(user);
      
      // If it's the hardcoded mock user, their posts are already in INITIAL_POSTS
      if (user.username === 'react_developer') return;

      // For new/dynamic users, generate completely random posts
      // We use unique IDs and Unsplash 'seed' URLs to guarantee different images per user login
      const newPosts = Array.from({ length: 6 }).map((_, i) => ({
          id: `gen-${user.username}-${Date.now()}-${i}`,
          username: user.username,
          avatar: user.avatar,
          // Using a unique seed combining username and index ensures same user gets consistent "random" images, 
          // but different users get different ones.
          image: `https://picsum.photos/seed/${user.username}-${i}-${Date.now()}/600/600`,
          images: [`https://picsum.photos/seed/${user.username}-${i}-${Date.now()}/600/600`],
          caption: i % 2 === 0 ? 'Exploring new places! 🌍' : 'Good vibes only ✨',
          likes: Math.floor(Math.random() * 500) + 50,
          isLiked: false,
          isSaved: false,
          timestamp: `${i + 1}d`,
          comments: []
      }));
      
      // Add these new posts to the global state so they appear in feed AND profile
      setPosts(prev => [...newPosts, ...prev]);
  };

  // Infinite Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingRef.current) return;
      
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
          isLoadingRef.current = true;
          
          // Create unique IDs
          const morePosts = INITIAL_POSTS.slice(0, 5).map((p, i) => ({ 
              ...p, 
              id: `scroll-post-${Date.now()}-${i}-${Math.random().toString(36).slice(2)}` 
          }));
          
          setPosts(prev => [...prev, ...morePosts]);
          
          // Small delay to prevent spamming
          setTimeout(() => {
            isLoadingRef.current = false;
          }, 500); 
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked } : post));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, isSaved: !post.isSaved } : post));
  };

  const handleComment = (postId, text) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, { user: currentUser.username, text }] } : post));
  };

  const handleCreatePost = ({ image, caption }) => {
    const newPost = { 
        id: Date.now(), 
        username: currentUser.username, 
        avatar: currentUser.avatar, 
        image, // Handles simple image, can be adapted for arrays
        images: [image],
        caption, 
        likes: 0, 
        isLiked: false, 
        isSaved: false, 
        timestamp: 'Just now', 
        comments: [] 
    };
    setPosts([newPost, ...posts]);
    setActiveTab('home');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Search Logic
  const filteredUsers = searchQuery 
    ? MOCK_USERS.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  if (!currentUser) {
      return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className={`font-sans min-h-screen flex flex-col md:flex-row transition-colors duration-200 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
        
        {/* Inject Styles Directly here to ensure they exist without file dependency */}
        <style dangerouslySetInnerHTML={{__html: `
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
            .animate-marquee { display: inline-block; animation: marquee 10s linear infinite; }
            @keyframes like-heart { 0% { opacity: 0; transform: scale(0); } 15% { opacity: 1; transform: scale(1.2); } 30% { transform: scale(0.95); } 40%, 80% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0); } }
            .animate-like-heart { animation: like-heart 1.2s ease-in-out forwards; }
        `}} />

        {activeStoryIndex !== null && (
            <div className="fixed inset-0 z-50">
                 <div className="absolute inset-0 bg-black" onClick={() => setActiveStoryIndex(null)}>
                     <div className="text-white p-10 text-center mt-20">Story Viewer Active (Click to Close)</div>
                 </div>
            </div>
        )}

        {/* Create Post Modal */}
        <CreatePostModal 
            isOpen={isCreateModalOpen} 
            onClose={() => setIsCreateModalOpen(false)} 
            onPost={handleCreatePost}
            currentUser={currentUser}
        />

        {/* Post Detail Modal */}
        {selectedPost && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-10" onClick={() => setSelectedPost(null)}>
                <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 text-white z-50">
                    <X className="w-8 h-8" />
                </button>
                <div className="w-full max-w-5xl max-h-[90vh] bg-white rounded-sm md:rounded-r-xl overflow-hidden shadow-2xl flex" onClick={e => e.stopPropagation()}>
                    {/* We reuse the feed post layout for now, but ideally this would be the split view modal created earlier */}
                    <div className="flex-1 bg-white overflow-y-auto p-4">
                        <CarouselPost 
                            post={selectedPost}
                            onLike={handleLike}
                            onSave={handleSave}
                            onComment={handleComment}
                            isDarkMode={false} // Force light mode for modal content for consistency or pass prop
                        />
                    </div>
                </div>
            </div>
        )}
        
        {/* Sidebar with Search Flyout Logic */}
        <div className={`hidden md:flex flex-col fixed left-0 top-0 h-screen border-r z-30 transition-all duration-300 ${isSearchOpen ? 'w-[80px]' : 'w-[245px]'} ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="p-8 mb-2 cursor-pointer" onClick={() => setActiveTab('home')}>
                 {isSearchOpen ? <Instagram className="w-6 h-6" /> : <img src={isDarkMode ? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"} className={`h-8 w-auto ${isDarkMode ? 'invert' : ''}`} />}
            </div>
            
            <nav className="flex-1 space-y-2 px-2">
                <SidebarItem icon={Home} label="Home" active={activeTab === 'home'} isCompact={isSearchOpen} onClick={() => {setActiveTab('home'); setIsSearchOpen(false)}} />
                <SidebarItem icon={SearchIcon} label="Search" active={isSearchOpen} isCompact={isSearchOpen} onClick={() => setIsSearchOpen(!isSearchOpen)} />
                <SidebarItem icon={Compass} label="Explore" active={activeTab === 'explore'} isCompact={isSearchOpen} onClick={() => {setActiveTab('explore'); setIsSearchOpen(false)}} />
                <SidebarItem icon={Clapperboard} label="Reels" active={activeTab === 'reels'} isCompact={isSearchOpen} onClick={() => {setActiveTab('reels'); setIsSearchOpen(false)}} />
                <SidebarItem icon={MessageCircle} label="Messages" active={activeTab === 'messages'} isCompact={isSearchOpen} onClick={() => {setActiveTab('messages'); setIsSearchOpen(false)}} />
                <SidebarItem icon={Heart} label="Notifications" active={activeTab === 'notifications'} isCompact={isSearchOpen} onClick={() => {setActiveTab('notifications'); setIsSearchOpen(false)}} />
                <SidebarItem icon={PlusSquare} label="Create" isCompact={isSearchOpen} onClick={() => setIsCreateModalOpen(true)} />
                <div onClick={() => {setActiveTab('profile'); setIsSearchOpen(false)}} className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition group`}>
                     <img src={currentUser.avatar} className="w-6 h-6 rounded-full border border-gray-300" />
                     {!isSearchOpen && <span className={`text-md ${activeTab === 'profile' ? 'font-bold' : ''}`}>Profile</span>}
                </div>
            </nav>

            <div className="mt-auto px-2 pb-4">
                 <div onClick={toggleTheme} className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900">
                      {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                      {!isSearchOpen && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
                 </div>
                 <div onClick={() => setCurrentUser(null)} className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 text-red-500">
                      <LogOut className="w-6 h-6" />
                      {!isSearchOpen && <span>Log out</span>}
                 </div>
            </div>
        </div>

        {/* Search Drawer (Slide-out) */}
        {isSearchOpen && (
            <div className={`fixed left-[80px] top-0 h-full w-[350px] z-20 shadow-xl rounded-r-xl border-r animate-in slide-in-from-left duration-200 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-8">Search</h2>
                    <div className={`relative rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-2 mb-6`}>
                        <input 
                            autoFocus
                            type="text" 
                            placeholder="Search" 
                            className="bg-transparent w-full outline-none px-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && <X className="absolute right-2 top-2 w-4 h-4 cursor-pointer text-gray-400" onClick={() => setSearchQuery('')} />}
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                        <div className="flex justify-between mb-4">
                            <span className="font-semibold text-md">Recent</span>
                            <button className="text-blue-500 text-sm font-bold" onClick={() => setRecentSearches([])}>Clear all</button>
                        </div>
                        
                        {searchQuery ? (
                            <div className="space-y-4">
                                {filteredUsers.map(user => (
                                    <div key={user.id} className="flex items-center cursor-pointer hover:opacity-70">
                                        <img src={user.avatar} className="w-12 h-12 rounded-full mr-3" />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">{user.username}</span>
                                            <span className="text-gray-500 text-xs">{user.name} • {user.followers} followers</span>
                                        </div>
                                    </div>
                                ))}
                                {filteredUsers.length === 0 && <div className="text-gray-500 text-center mt-10">No results found.</div>}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentSearches.map((term, i) => (
                                    <div key={i} className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                                                <SearchIcon className="w-5 h-5 text-gray-500" />
                                            </div>
                                            <span className="text-sm font-medium">{term}</span>
                                        </div>
                                        <X className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* Main Content Logic Switcher */}
        <main className={`flex-1 min-h-screen transition-all duration-300 ${isSearchOpen ? 'md:ml-[430px]' : 'md:ml-[245px]'}`}>
            {activeTab === 'home' && (
                <HomePage 
                    posts={posts} 
                    onLike={handleLike}
                    onSave={handleSave}
                    onComment={handleComment}
                    currentUser={currentUser}
                    stories={INITIAL_STORIES}
                    isDarkMode={isDarkMode}
                    onNavigateProfile={() => setActiveTab('profile')}
                />
            )}
            {activeTab === 'messages' && <MessagesPage currentUser={currentUser} isDarkMode={isDarkMode} />}
            {activeTab === 'profile' && (
                <ProfilePage 
                    posts={posts}
                    currentUser={currentUser}
                    highlights={HIGHLIGHTS}
                    isDarkMode={isDarkMode}
                    onPostClick={setSelectedPost}
                />
            )}
            {activeTab === 'explore' && (
                <div className="p-4 flex justify-center">
                    <div className="grid grid-cols-3 gap-1 max-w-[935px] w-full">
                        {/* Use Explore Page logic from previous, just rendering grid */}
                        {Array(12).fill(null).map((_, i) => (
                            <div key={i} className="relative aspect-square bg-gray-200 dark:bg-gray-800 group cursor-pointer">
                                <img src={`https://picsum.photos/500/500?random=${i}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/30 hidden group-hover:flex items-center justify-center text-white font-bold space-x-2">
                                    <Heart className="fill-white" /> <span>{Math.floor(Math.random()*900)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {activeTab === 'reels' && <ReelsPage currentUser={currentUser} />}
            {activeTab === 'notifications' && <NotificationsPage />}
        </main>
        
        {/* Bottom Nav for Mobile */}
        <div className={`md:hidden fixed bottom-0 w-full border-t p-2 flex justify-around items-center z-50 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
             <Home onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'fill-current' : ''} />
             <SearchIcon onClick={() => setActiveTab('explore')} className={activeTab === 'explore' ? 'stroke-[3px]' : ''} />
             <PlusSquare onClick={() => setIsCreateModalOpen(true)} />
             <MessageCircle onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'fill-current' : ''} />
             <div onClick={() => setActiveTab('profile')}>
                 <img src={currentUser.avatar} className={`w-6 h-6 rounded-full border ${activeTab === 'profile' ? 'border-black dark:border-white' : 'border-transparent'}`} />
             </div>
        </div>
    </div>
  );
};

export default App;