"use client";

import { useState } from 'react';
import { CardStack } from '@/components/CardStack';
import { MatchModal } from '@/components/MatchModal';
import { BottomNav } from '@/components/BottomNav';
import { MessagesView } from '@/components/MessagesView';
import { ProfileView } from '@/components/ProfileView';
import { MatchesView } from '@/components/MatchesView';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { AuthModal } from '@/components/AuthModal';
import { mockUsers, UserProfile, Match } from '@/lib/mockData';

export default function TinderClone() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'discover' | 'matches' | 'messages' | 'profile'>('discover');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<UserProfile | null>(null);
  const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());
  const [passedProfiles, setPassedProfiles] = useState<Set<string>>(new Set());

  const handleSwipeRight = (profile: UserProfile) => {
    setLikedProfiles(prev => new Set([...prev, profile.id]));
    
    // Simulate match (30% chance for demo)
    if (Math.random() < 0.3) {
      setMatchedProfile(profile);
      setShowMatchModal(true);
    }
  };

  const handleSwipeLeft = (profile: UserProfile) => {
    setPassedProfiles(prev => new Set([...prev, profile.id]));
  };

  const handleMatchModalClose = () => {
    setShowMatchModal(false);
    setMatchedProfile(null);
  };

  const handleSendMessage = () => {
    setShowMatchModal(false);
    setMatchedProfile(null);
    setActiveTab('messages');
  };

  const handleKeepSwiping = () => {
    setShowMatchModal(false);
    setMatchedProfile(null);
  };

  const handleGetStarted = () => {
    setShowWelcome(false);
    setShowAuth(true);
  };

  const handleAuthSuccess = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setShowAuth(false);
    setShowWelcome(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowWelcome(true);
    setCurrentUser(null);
    setLikedProfiles(new Set());
    setPassedProfiles(new Set());
    setActiveTab('discover');
  };

  const handleSelectMatch = () => {
    setActiveTab('messages');
  };

  // Show welcome screen for new users
  if (!isAuthenticated && showWelcome) {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  // Filter out already swiped profiles
  const availableProfiles = mockUsers.filter(
    profile => !likedProfiles.has(profile.id) && !passedProfiles.has(profile.id)
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <CardStack
              profiles={availableProfiles}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onStackEmpty={() => {
                // Could show empty state or reload profiles
                console.log('No more profiles');
              }}
            />
          </div>
        );
      
      case 'matches':
        return <MatchesView onSelectMatch={handleSelectMatch} />;
      
      case 'messages':
        return <MessagesView />;
      
      case 'profile':
        return <ProfileView onLogout={handleLogout} currentUser={currentUser} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Tinder
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        matchCount={3} // Mock count
        messageCount={2} // Mock count
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Match Modal */}
      <MatchModal
        isOpen={showMatchModal}
        profile={matchedProfile}
        onClose={handleMatchModalClose}
        onSendMessage={handleSendMessage}
        onKeepSwiping={handleKeepSwiping}
      />
    </div>
  );
}