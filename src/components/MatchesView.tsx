"use client";

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockMatches, mockUsers, UserProfile, Match } from '@/lib/mockData';

interface MatchesViewProps {
  onSelectMatch?: (match: Match) => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({ onSelectMatch }) => {
  const getMatchProfile = (userId: string): UserProfile | undefined => {
    return mockUsers.find(user => user.id === userId);
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

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">New Matches</h1>
        <Badge variant="secondary" className="bg-pink-100 text-pink-700">
          {mockMatches.length} matches
        </Badge>
      </div>

      {/* Recent Matches Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Matches</h2>
        <div className="grid grid-cols-2 gap-3">
          {mockMatches.slice(0, 4).map((match) => {
            const profile = getMatchProfile(match.userId);
            if (!profile) return null;

            return (
              <Card
                key={match.id}
                className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onSelectMatch?.(match)}
              >
                <div className="aspect-square relative">
                  <img
                    src={profile.images[0]}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-semibold text-white text-sm">
                      {profile.name}
                    </h3>
                    <p className="text-white/80 text-xs">
                      Matched {formatTime(match.matchedAt)}
                    </p>
                  </div>
                  {/* New match indicator */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-pink-500 rounded-full"></div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Matches List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">All Matches</h2>
        <div className="space-y-3">
          {mockMatches.map((match) => {
            const profile = getMatchProfile(match.userId);
            if (!profile) return null;

            return (
              <Card
                key={match.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelectMatch?.(match)}
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
                        {profile.name}, {profile.age}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formatTime(match.matchedAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {profile.bio}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.interests.slice(0, 2).map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="outline" 
                          className="text-xs bg-pink-50 border-pink-200 text-pink-700"
                        >
                          {interest}
                        </Badge>
                      ))}
                      {profile.interests.length > 2 && (
                        <Badge variant="outline" className="text-xs text-gray-500">
                          +{profile.interests.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button 
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle unmatch
                      }}
                    >
                      <span className="text-sm">✕</span>
                    </button>
                    <button 
                      className="p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle message
                        onSelectMatch?.(match);
                      }}
                    >
                      <span className="text-sm">💬</span>
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {mockMatches.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-gray-400">💎</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches yet</h3>
          <p className="text-gray-600">
            Start swiping to find people you like!
          </p>
        </div>
      )}
    </div>
  );
};