export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  interests: string[];
  distance: number;
  verified: boolean;
}

export interface Match {
  id: string;
  userId: string;
  matchedAt: Date;
  lastMessage?: string;
  lastMessageAt?: Date;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Emma",
    age: 24,
    bio: "Adventure seeker and coffee enthusiast. Love hiking, photography, and trying new restaurants. Looking for someone to explore the city with! 📸☕",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/63a8ba47-1cd9-4873-9395-45c4aa067f01.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7b9fc8eb-92fa-4503-b8f0-1f602cba9047.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cae99996-510d-4f04-914a-226a029b9ab4.png"
    ],
    interests: ["Photography", "Hiking", "Coffee", "Travel", "Music"],
    distance: 2,
    verified: true
  },
  {
    id: "2",
    name: "Sofia",
    age: 26,
    bio: "Yoga instructor and wellness coach. Passionate about healthy living, meditation, and cooking. Seeking meaningful connections 🧘‍♀️✨",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/efe308e3-1c2a-4f42-83b9-792faaabcd6b.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e93313d-c4dd-48ac-a01e-99facbb94d29.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1743d06b-716b-488f-8c08-6b5f82f76706.png"
    ],
    interests: ["Yoga", "Cooking", "Wellness", "Meditation", "Nature"],
    distance: 5,
    verified: true
  },
  {
    id: "3",
    name: "Maya",
    age: 22,
    bio: "Art student and creative soul. Love painting, museums, and indie music. Always up for gallery openings and creative adventures 🎨🎵",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ebd3ad09-1582-4684-8add-bfc839b265b5.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/509bb709-f8e8-4c3b-ae8b-e6a4f03a28c1.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b0839492-ce23-4b24-840d-f822d0515568.png"
    ],
    interests: ["Art", "Painting", "Museums", "Indie Music", "Design"],
    distance: 3,
    verified: false
  },
  {
    id: "4",
    name: "Zoe",
    age: 28,
    bio: "Marketing professional who loves weekend getaways. Passionate about wine tasting, reading, and spontaneous road trips 🍷📚",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/09785ea5-8ebb-4f97-bcc2-4814665fafaf.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/65652b0a-0b93-4993-b2a7-5c59542c35e8.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/957f38b9-e034-4093-9154-cca70ba94a79.png"
    ],
    interests: ["Wine", "Reading", "Travel", "Marketing", "Road trips"],
    distance: 7,
    verified: true
  },
  {
    id: "5",
    name: "Luna",
    age: 25,
    bio: "Veterinarian and animal lover. Spend my free time with rescue dogs, rock climbing, and stargazing. Let's save the world together! 🐕⭐",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aa7b236b-982c-458d-9517-787a738e1f8b.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b2dbb431-05e2-4bb4-a73b-ba6611471ee9.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/42bd9994-ce09-4da5-85b0-4cf5b80953cc.png"
    ],
    interests: ["Animals", "Rock climbing", "Astronomy", "Volunteering", "Nature"],
    distance: 4,
    verified: true
  },
  {
    id: "6",
    name: "Aria",
    age: 23,
    bio: "Dance teacher and fitness enthusiast. Love salsa nights, CrossFit, and healthy smoothies. Life is better when you're moving! 💃🏃‍♀️",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0cce1e30-9492-41c2-a5fe-37de165a0c13.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3c663d6e-2f24-46e4-af81-be2a085ee373.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d813d338-8bf1-4aa1-8b66-30bec43080b3.png"
    ],
    interests: ["Dancing", "Fitness", "CrossFit", "Salsa", "Health"],
    distance: 6,
    verified: false
  }
];

export const mockMatches: Match[] = [
  {
    id: "match1",
    userId: "1",
    matchedAt: new Date(Date.now() - 86400000), // 1 day ago
    lastMessage: "Hey! Love your hiking photos 😊",
    lastMessageAt: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: "match2", 
    userId: "2",
    matchedAt: new Date(Date.now() - 172800000), // 2 days ago
    lastMessage: "Would love to try that yoga class!",
    lastMessageAt: new Date(Date.now() - 7200000) // 2 hours ago
  },
  {
    id: "match3",
    userId: "4", 
    matchedAt: new Date(Date.now() - 259200000), // 3 days ago
    lastMessage: "That wine bar looks amazing!",
    lastMessageAt: new Date(Date.now() - 86400000) // 1 day ago
  }
];

export const mockMessages: Message[] = [
  {
    id: "msg1",
    matchId: "match1",
    senderId: "1",
    content: "Hey! Love your hiking photos 😊",
    timestamp: new Date(Date.now() - 3600000),
    read: true
  },
  {
    id: "msg2", 
    matchId: "match1",
    senderId: "current",
    content: "Thanks! That mountain trail was incredible. Do you hike often?",
    timestamp: new Date(Date.now() - 1800000),
    read: false
  },
  {
    id: "msg3",
    matchId: "match2",
    senderId: "current", 
    content: "Your yoga studio looks so peaceful!",
    timestamp: new Date(Date.now() - 7200000),
    read: true
  },
  {
    id: "msg4",
    matchId: "match2",
    senderId: "2",
    content: "Would love to try that yoga class!",
    timestamp: new Date(Date.now() - 7200000),
    read: true
  }
];