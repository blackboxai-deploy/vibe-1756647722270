"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/lib/mockData';
import { getSwipeTransform, getSwipeOpacity } from '@/lib/swipeUtils';

interface ProfileCardProps {
  profile: UserProfile;
  deltaX?: number;
  deltaY?: number;
  style?: React.CSSProperties;
  className?: string;
  onImageClick?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  deltaX = 0,
  deltaY = 0,
  style,
  className = '',
  onImageClick
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cardTransform = getSwipeTransform(deltaX, deltaY);
  const cardOpacity = getSwipeOpacity(deltaX);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < profile.images.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const centerX = rect.width / 2;
    
    if (clickX > centerX) {
      nextImage();
    } else {
      prevImage();
    }
    
    onImageClick?.();
  };

  return (
    <Card 
      className={`relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        transform: cardTransform,
        opacity: cardOpacity,
        ...style
      }}
    >
      {/* Image Section */}
      <div className="relative h-3/4 overflow-hidden">
        <img
          src={profile.images[currentImageIndex]}
          alt={`${profile.name}, ${profile.age}`}
          className="w-full h-full object-cover"
          onClick={handleImageClick}
          draggable={false}
        />
        
        {/* Image Indicators */}
        {profile.images.length > 1 && (
          <div className="absolute top-4 left-4 right-4 flex gap-1">
            {profile.images.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Verified Badge */}
        {profile.verified && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-blue-500 text-white font-medium">
              ✓ Verified
            </Badge>
          </div>
        )}

        {/* Action Overlays */}
        <div className="absolute inset-0 flex">
          {/* Left side - NOPE */}
          <div 
            className={`w-1/2 h-full flex items-center justify-center transition-opacity duration-200 ${
              deltaX < -50 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold text-xl border-4 border-red-500 transform -rotate-12">
              NOPE
            </div>
          </div>
          
          {/* Right side - LIKE */}
          <div 
            className={`w-1/2 h-full flex items-center justify-center transition-opacity duration-200 ${
              deltaX > 50 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold text-xl border-4 border-green-500 transform rotate-12">
              LIKE
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="h-1/4 p-6 bg-gradient-to-t from-white to-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {profile.name}, {profile.age}
            </h2>
            <p className="text-gray-600">{profile.distance} km away</p>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {profile.bio}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {profile.interests.slice(0, 3).map((interest) => (
            <Badge 
              key={interest} 
              variant="outline" 
              className="text-xs bg-gradient-to-r from-pink-50 to-orange-50 border-pink-200 text-pink-700"
            >
              {interest}
            </Badge>
          ))}
          {profile.interests.length > 3 && (
            <Badge variant="outline" className="text-xs text-gray-500">
              +{profile.interests.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};