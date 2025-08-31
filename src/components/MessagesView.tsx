"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Match, UserProfile, Message, mockMatches, mockUsers, mockMessages } from '@/lib/mockData';

export const MessagesView: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const getMatchProfile = (userId: string): UserProfile | undefined => {
    return mockUsers.find(user => user.id === userId);
  };

  const getMatchMessages = (matchId: string): Message[] => {
    return mockMessages.filter(msg => msg.matchId === matchId);
  };

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMatch) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  if (selectedMatch) {
    const profile = getMatchProfile(selectedMatch.userId);
    const messages = getMatchMessages(selectedMatch.id);

    if (!profile) return null;

    return (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
          <button
            onClick={() => setSelectedMatch(null)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-xl">←</span>
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={profile.images[0]}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">Online now</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.senderId === 'current'
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === 'current' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <Badge variant="secondary" className="bg-pink-100 text-pink-700">
          {mockMatches.length} matches
        </Badge>
      </div>

      {/* Matches List */}
      <div className="space-y-3">
        {mockMatches.map((match) => {
          const profile = getMatchProfile(match.userId);
          if (!profile) return null;

          return (
            <Card
              key={match.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedMatch(match)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={profile.images[0]}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {profile.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {match.lastMessageAt ? formatTime(match.lastMessageAt) : formatTime(match.matchedAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {match.lastMessage || 'Say hello! 👋'}
                  </p>
                </div>
                
                {/* New message indicator */}
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {mockMatches.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-gray-400">💬</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-600">
            Start swiping to match with people and send messages!
          </p>
        </div>
      )}
    </div>
  );
};