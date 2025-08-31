"use client";

import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-orange-400 flex flex-col items-center justify-center p-6 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 text-center max-w-sm">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-4">
            <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              T
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Tinder</h1>
          <p className="text-white/90 text-lg">
            Match. Chat. Date.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">💕</span>
            </div>
            <p className="text-white/90">Find people who like you back</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">💬</span>
            </div>
            <p className="text-white/90">Chat when you both say yes</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🔥</span>
            </div>
            <p className="text-white/90">Get out there and date</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <Button
            onClick={onGetStarted}
            className="w-full bg-white text-pink-600 hover:bg-gray-100 font-bold py-4 text-lg shadow-xl"
          >
            Get Started
          </Button>
          
          <p className="text-xs text-white/70 leading-relaxed">
            By tapping Get Started, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            >
              <span className="text-2xl opacity-30">
                {['💕', '💖', '💝', '💗', '💓'][Math.floor(Math.random() * 5)]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.1; }
          100% { transform: translateY(-40px) rotate(360deg); opacity: 0; }
        }
        
        .animate-float-slow {
          animation: float-slow linear infinite;
        }
      `}</style>
    </div>
  );
};