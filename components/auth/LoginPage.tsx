
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (name: string) => void;
  onSwitchToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError('All fields are required.');
      return;
    }
    setError('');
    // In a real app, you'd verify credentials. Here we just log in.
    onLogin(name);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Learn<span className="text-teal-400">Sphere</span></h1>
            <p className="mt-2 text-slate-400">Sign in to continue your learning journey</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="name" className="text-sm font-bold text-gray-300 block">Your Name</label>
            <input 
              id="name" 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:border-teal-400 focus:ring focus:ring-teal-400 focus:ring-opacity-50"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-300 block">Email Address</label>
            <input 
              id="email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:border-teal-400 focus:ring focus:ring-teal-400 focus:ring-opacity-50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password"className="text-sm font-bold text-gray-300 block">Password</label>
            <input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:border-teal-400 focus:ring focus:ring-teal-400 focus:ring-opacity-50"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div>
            <button type="submit" className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-md transition-colors duration-200">
              Sign In
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className="font-medium text-teal-400 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
