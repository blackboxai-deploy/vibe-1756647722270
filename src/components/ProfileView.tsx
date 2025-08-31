"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProfileViewProps {
  onLogout?: () => void;
  currentUser?: any;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onLogout, currentUser: userProp }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use passed user data or fallback to mock data
  const currentUser = userProp || {
    name: "Alex",
    age: 25,
    bio: "Adventure seeker, coffee lover, and dog enthusiast. Always looking for the next great experience!",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/83c0c88f-ae95-4c44-b117-74400cbab9d0.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e5231e7f-26e5-4e90-892c-c5815b53bed6.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ddb98f5f-0c3e-4bf6-9572-e8e671e82c7f.png"
    ],
    interests: ["Travel", "Photography", "Hiking", "Coffee", "Dogs", "Music"],
    job: "Software Developer",
    company: "Tech Startup",
    school: "University of Technology",
    verified: true
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < currentUser.images.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev > 0 ? prev - 1 : currentUser.images.length - 1
    );
  };

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </div>

      {/* Profile Images */}
      <Card className="relative overflow-hidden">
        <div className="relative h-96">
          <img
            src={currentUser.images[currentImageIndex]}
            alt={`Profile ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Image Navigation */}
          <div className="absolute top-4 left-4 right-4 flex gap-1">
            {currentUser.images.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-colors"
          >
            →
          </button>

          {/* Verified Badge */}
          {currentUser.verified && (
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-blue-500 text-white">
                ✓ Verified
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Basic Info */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentUser.name}, {currentUser.age}
          </h2>
        </div>

        <p className="text-gray-700">{currentUser.bio}</p>

        {/* Work & Education */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">💼</span>
            <span className="text-gray-700">{currentUser.job} at {currentUser.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🎓</span>
            <span className="text-gray-700">{currentUser.school}</span>
          </div>
        </div>
      </Card>

      {/* Interests */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">My Interests</h3>
        <div className="flex flex-wrap gap-2">
          {currentUser.interests.map((interest) => (
            <Badge 
              key={interest} 
              variant="outline" 
              className="bg-gradient-to-r from-pink-50 to-orange-50 border-pink-200 text-pink-700"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Settings & Actions */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start"
        >
          <span className="text-lg mr-3">⚙️</span>
          Settings
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
        >
          <span className="text-lg mr-3">🔒</span>
          Privacy
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
        >
          <span className="text-lg mr-3">💎</span>
          Get Tinder Plus
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
          onClick={onLogout}
        >
          <span className="text-lg mr-3">🚪</span>
          Log Out
        </Button>
      </div>

      {/* App Version */}
      <div className="text-center text-sm text-gray-500">
        Version 2.0.1
      </div>
    </div>
  );
};