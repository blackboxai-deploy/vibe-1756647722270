"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userData: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'phone' | 'verify'>('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    verificationCode: '',
    name: '',
    birthDate: '',
    gender: '',
    interests: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const availableInterests = [
    'Travel', 'Photography', 'Music', 'Movies', 'Sports', 'Fitness',
    'Cooking', 'Art', 'Reading', 'Dancing', 'Gaming', 'Hiking',
    'Yoga', 'Coffee', 'Wine', 'Dogs', 'Cats', 'Fashion'
  ];

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (authMode === 'signin') {
        if (!formData.email || !formData.password) {
          throw new Error('Please fill in all fields');
        }
        // Simulate successful signin
        onAuthSuccess({
          id: 'current',
          email: formData.email,
          name: 'Alex',
          isAuthenticated: true
        });
      } else if (authMode === 'verify') {
        if (formData.verificationCode !== '123456') {
          throw new Error('Invalid verification code. Try 123456');
        }
        // Move to final signup step
        setAuthMode('signup');
      } else if (authMode === 'phone') {
        if (!formData.phone) {
          throw new Error('Please enter your phone number');
        }
        // Move to verification step
        setAuthMode('verify');
      } else if (authMode === 'signup') {
        if (!formData.name || !formData.birthDate || !formData.gender) {
          throw new Error('Please fill in all required fields');
        }
        if (formData.interests.length < 3) {
          throw new Error('Please select at least 3 interests');
        }
        // Simulate successful signup
        onAuthSuccess({
          id: 'current',
          name: formData.name,
          birthDate: formData.birthDate,
          gender: formData.gender,
          interests: formData.interests,
          isAuthenticated: true
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSignIn = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-600 mt-2">Sign in to continue swiping</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your@email.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Enter your password"
            className="mt-1"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setAuthMode('phone')}
          className="text-pink-600 hover:text-pink-700 font-medium"
        >
          Sign in with Phone Number
        </button>
      </div>

      <div className="text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <button
          onClick={() => setAuthMode('phone')}
          className="text-pink-600 hover:text-pink-700 font-medium"
        >
          Sign Up
        </button>
      </div>
    </div>
  );

  const renderPhoneAuth = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
          Get Started
        </h2>
        <p className="text-gray-600 mt-2">Enter your phone number to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="mt-1"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
          disabled={isLoading}
        >
          {isLoading ? 'Sending Code...' : 'Continue'}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setAuthMode('signin')}
          className="text-pink-600 hover:text-pink-700 font-medium"
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Number</h2>
        <p className="text-gray-600 mt-2">
          We sent a code to {formData.phone}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Demo: Use code <strong>123456</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            value={formData.verificationCode}
            onChange={(e) => handleInputChange('verificationCode', e.target.value)}
            placeholder="Enter 6-digit code"
            className="mt-1 text-center text-2xl tracking-widest"
            maxLength={6}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setAuthMode('phone')}
          className="text-pink-600 hover:text-pink-700 font-medium text-sm"
        >
          Didn't receive code? Resend
        </button>
      </div>
    </div>
  );

  const renderSignUp = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
        <p className="text-gray-600 mt-2">Tell us a bit about yourself</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Your first name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Gender</Label>
          <div className="flex gap-2 mt-2">
            {['Woman', 'Man', 'Non-binary'].map((gender) => (
              <button
                key={gender}
                type="button"
                onClick={() => handleInputChange('gender', gender)}
                className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                  formData.gender === gender
                    ? 'bg-pink-100 border-pink-300 text-pink-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Interests (select at least 3)</Label>
          <div className="flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto">
            {availableInterests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                  formData.interests.includes(interest)
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white border border-transparent'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-pink-50 hover:border-pink-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Selected: {formData.interests.length}/18
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Start Swiping'}
        </Button>
      </form>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-md max-h-[90vh] overflow-y-auto p-6 bg-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {authMode === 'signin' && renderSignIn()}
        {authMode === 'phone' && renderPhoneAuth()}
        {authMode === 'verify' && renderVerification()}
        {authMode === 'signup' && renderSignUp()}
      </Card>
    </div>
  );
};