import React, { useState } from 'react';
import { Heart, Apple, ChevronRight } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { loginUser, registerUser } from '../services/authService';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        await loginUser(email, password);
      } else {
        await registerUser(email, password);
      }
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] p-6">
      <div className="w-full max-w-[440px] flex flex-col items-center animate-[fadeIn_0.6s_ease-out]">
        
        {/* Logo Section */}
        <div className="mb-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#007AFF] to-[#5AC8FA] flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6">
            <Heart size={32} fill="white" className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1D1D1F] mb-2">
            Sign in to Aura
          </h1>
          <p className="text-[#86868B] text-center max-w-xs">
            Your personal health companion, powered by intelligence.
          </p>
        </div>

        {/* Card */}
        <div className="w-full bg-white rounded-[28px] p-8 md:p-10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="Apple ID or Email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <div className="relative">
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                className="absolute right-0 top-0 text-xs font-medium text-[#007AFF] hover:underline mt-2 mr-1"
              >
                Forgot?
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div className="pt-2">
              <Button type="submit" isLoading={isLoading}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#86868B]">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-2xl font-medium transition-transform active:scale-[0.98]">
              <Apple size={20} />
              <span>Sign in with Apple</span>
            </button>
          </div>
        </div>

        {/* Footer Toggle */}
        <div className="mt-8 text-center">
          <p className="text-[#86868B] text-[15px]">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#007AFF] font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
        
        <div className="mt-12 flex items-center gap-6 text-xs text-[#86868B]">
            <span className="cursor-pointer hover:text-gray-900">Privacy</span>
            <span className="cursor-pointer hover:text-gray-900">Terms</span>
            <span className="cursor-pointer hover:text-gray-900">Help</span>
        </div>
      </div>
    </div>
  );
};
