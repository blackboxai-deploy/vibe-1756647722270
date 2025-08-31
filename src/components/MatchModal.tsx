"use client";

import { useEffect } from 'react';
import { UserProfile } from '@/lib/mockData';

interface MatchModalProps {
  isOpen: boolean;
  profile: UserProfile | null;
  onClose: () => void;
  onSendMessage: () => void;
  onKeepSwiping: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSendMessage,
  onKeepSwiping
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-pink-500/80 to-orange-500/80 backdrop-blur-sm animate-pulse"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-sm mx-4 animate-bounce">
        {/* Match Celebration */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-pulse">💕</div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            It's a Match!
          </h1>
          <p className="text-white/90 text-lg drop-shadow">
            You and {profile.name} liked each other
          </p>
        </div>

        {/* Profile Images */}
        <div className="flex justify-center items-center gap-4 mb-8">
          {/* Your Profile (placeholder) */}
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white">👤</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-800">
                You
              </div>
            </div>
          </div>

          {/* Heart Animation */}
          <div className="flex items-center justify-center">
            <div className="text-4xl animate-bounce text-white drop-shadow-lg">
              💖
            </div>
          </div>

          {/* Matched Profile */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-white/50">
              <img
                src={profile.images[0]}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-800">
                {profile.name}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onSendMessage}
            className="w-full bg-white text-pink-600 font-bold py-4 px-6 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg"
          >
            Send Message
          </button>
          
          <button
            onClick={onKeepSwiping}
            className="w-full bg-white/20 text-white font-medium py-3 px-6 rounded-full hover:bg-white/30 active:scale-95 transition-all duration-200 backdrop-blur-sm border border-white/30"
          >
            Keep Swiping
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
        >
          ✕
        </button>
      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['💕', '💖', '💝', '💗', '💓'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(-40px) rotate(360deg); opacity: 0; }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};