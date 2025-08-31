"use client";

import { useState, useEffect } from 'react';
import { ProfileCard } from './ProfileCard';
import { UserProfile } from '@/lib/mockData';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { shouldCardExit, getCardExitDirection } from '@/lib/swipeUtils';

interface CardStackProps {
  profiles: UserProfile[];
  onSwipeLeft?: (profile: UserProfile) => void;
  onSwipeRight?: (profile: UserProfile) => void;
  onStackEmpty?: () => void;
}

export const CardStack: React.FC<CardStackProps> = ({
  profiles,
  onSwipeLeft,
  onSwipeRight,
  onStackEmpty
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const { gestureState, bindEvents } = useSwipeGesture({
    onSwipeEnd: (swipeDirection) => {
      if (!currentProfile || isAnimating) return;

      const { deltaX } = gestureState;
      
      if (shouldCardExit(deltaX, swipeDirection.velocity || 0)) {
        const direction = getCardExitDirection(deltaX);
        handleCardExit(direction);
      }
    }
  });

  const handleCardExit = (direction: 'left' | 'right') => {
    if (!currentProfile || isAnimating) return;

    setIsAnimating(true);
    setExitDirection(direction);

    // Trigger callbacks
    if (direction === 'left') {
      onSwipeLeft?.(currentProfile);
    } else {
      onSwipeRight?.(currentProfile);
    }

    // Move to next card after animation
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
      setExitDirection(null);
    }, 300);
  };

  const handleLike = () => {
    handleCardExit('right');
  };

  const handlePass = () => {
    handleCardExit('left');
  };

  const handleSuperLike = () => {
    // Super like functionality could be added here
    handleCardExit('right');
  };

  // Check if stack is empty
  useEffect(() => {
    if (currentIndex >= profiles.length) {
      onStackEmpty?.();
    }
  }, [currentIndex, profiles.length, onStackEmpty]);

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-center px-8">
        <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">💕</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          You're all caught up!
        </h2>
        <p className="text-gray-600 text-lg">
          Check back later for new profiles in your area
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Card Stack Container */}
      <div className="relative h-[600px]">
        {/* Next Card (Background) */}
        {nextProfile && (
          <div className="absolute inset-0 transform scale-95 z-0">
            <ProfileCard 
              profile={nextProfile}
              className="opacity-80"
            />
          </div>
        )}

        {/* Current Card */}
        {currentProfile && (
          <div 
            className="absolute inset-0 z-10"
            {...(bindEvents() as any)}
            style={{
              transform: isAnimating 
                ? `translateX(${exitDirection === 'right' ? '100%' : '-100%'}) rotate(${exitDirection === 'right' ? '30deg' : '-30deg'})`
                : undefined,
              transition: isAnimating ? 'all 0.3s ease-out' : 'none',
              opacity: isAnimating ? 0 : 1
            }}
          >
            <ProfileCard 
              profile={currentProfile}
              deltaX={gestureState.isActive ? gestureState.deltaX : 0}
              deltaY={gestureState.isActive ? gestureState.deltaY : 0}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-6 mt-8">
        {/* Pass Button */}
        <button
          onClick={handlePass}
          disabled={isAnimating || !currentProfile}
          className="w-14 h-14 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-2xl text-red-500">✕</span>
        </button>

        {/* Super Like Button */}
        <button
          onClick={handleSuperLike}
          disabled={isAnimating || !currentProfile}
          className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-xl text-white">⭐</span>
        </button>

        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={isAnimating || !currentProfile}
          className="w-14 h-14 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-2xl text-green-500">💚</span>
        </button>
      </div>

      {/* Profile Counter */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          {currentIndex + 1} / {profiles.length}
        </p>
      </div>
    </div>
  );
};