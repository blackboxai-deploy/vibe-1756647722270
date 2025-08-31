"use client";

interface BottomNavProps {
  activeTab: 'discover' | 'matches' | 'messages' | 'profile';
  onTabChange: (tab: 'discover' | 'matches' | 'messages' | 'profile') => void;
  matchCount?: number;
  messageCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  matchCount = 0,
  messageCount = 0
}) => {
  const tabs = [
    {
      id: 'discover' as const,
      label: 'Discover',
      icon: '🔥',
      activeIcon: '🔥'
    },
    {
      id: 'matches' as const,
      label: 'Matches',
      icon: '💎',
      activeIcon: '💎',
      badge: matchCount > 0 ? matchCount : undefined
    },
    {
      id: 'messages' as const,
      label: 'Messages', 
      icon: '💬',
      activeIcon: '💬',
      badge: messageCount > 0 ? messageCount : undefined
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      icon: '👤',
      activeIcon: '👤'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.id 
                ? 'text-pink-600 bg-pink-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {/* Badge */}
            {tab.badge && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {tab.badge > 9 ? '9+' : tab.badge}
              </div>
            )}
            
            {/* Icon */}
            <span className="text-2xl mb-1">
              {activeTab === tab.id ? tab.activeIcon : tab.icon}
            </span>
            
            {/* Label */}
            <span className={`text-xs font-medium ${
              activeTab === tab.id ? 'text-pink-600' : 'text-gray-500'
            }`}>
              {tab.label}
            </span>
            
            {/* Active Indicator */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};