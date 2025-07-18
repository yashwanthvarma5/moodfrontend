import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Heart, Menu, X, Home, BarChart3, User, PlusCircle, Palette, Check } from 'lucide-react';
import { useState } from 'react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  if (!user) {
    return (
      <nav className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                VibeTrackr
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Theme Selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                    <Palette className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Choose Theme</h4>
                    <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
                      {availableThemes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`relative cursor-pointer transition-all duration-200 hover:scale-105 rounded-lg ${
                            currentTheme.id === theme.id ? 'ring-2 ring-purple-400' : ''
                          }`}
                          onClick={() => setTheme(theme.id)}
                        >
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.primary} text-white`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-sm">{theme.name}</h4>
                                <p className="text-white/80 text-xs">{theme.description}</p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-lg">{theme.preview}</span>
                                {currentTheme.id === theme.id && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                VibeTrackr
              </span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard">
                <Button 
                  variant="ghost" 
                  className={`font-medium transition-all duration-200 px-4 py-2 ${
                    isActive('/dashboard') 
                      ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700' 
                      : 'text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/track-mood">
                <Button 
                  variant="ghost" 
                  className={`font-medium transition-all duration-200 px-4 py-2 ${
                    isActive('/track-mood') 
                      ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700' 
                      : 'text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800'
                  }`}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Track Mood
                </Button>
              </Link>
              <Link to="/history">
                <Button 
                  variant="ghost" 
                  className={`font-medium transition-all duration-200 px-4 py-2 ${
                    isActive('/history') 
                      ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700' 
                      : 'text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  History
                </Button>
              </Link>
              <Link to="/profile">
                <Button 
                  variant="ghost" 
                  className={`font-medium transition-all duration-200 px-4 py-2 ${
                    isActive('/profile') 
                      ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700' 
                      : 'text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              
              {/* Theme Selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-9 h-9 p-0 text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800 transition-all duration-200"
                  >
                    <Palette className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-4" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Palette className="w-4 h-4 text-purple-600" />
                      <h4 className="font-medium text-base">Choose Your Theme</h4>
                    </div>
                    
                    {/* Current Theme */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Current Theme</p>
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${currentTheme.primary} text-white`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-sm">{currentTheme.name}</h4>
                            <p className="text-white/80 text-xs">{currentTheme.description}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-lg">{currentTheme.preview}</span>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Light Themes */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Light Themes</p>
                      <div className="grid grid-cols-2 gap-2">
                        {availableThemes.filter(theme => !theme.isDark).map((theme) => (
                          <div
                            key={theme.id}
                            className={`relative cursor-pointer transition-all duration-200 hover:scale-105 rounded-lg ${
                              currentTheme.id === theme.id ? 'ring-2 ring-purple-400' : ''
                            }`}
                            onClick={() => setTheme(theme.id)}
                          >
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.primary} text-white`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-sm">{theme.name}</h4>
                                  <p className="text-white/80 text-xs">{theme.description}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="text-lg">{theme.preview}</span>
                                  {currentTheme.id === theme.id && (
                                    <Check className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dark Themes */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Dark Themes</p>
                      <div className="grid grid-cols-2 gap-2">
                        {availableThemes.filter(theme => theme.isDark).map((theme) => (
                          <div
                            key={theme.id}
                            className={`relative cursor-pointer transition-all duration-200 hover:scale-105 rounded-lg ${
                              currentTheme.id === theme.id ? 'ring-2 ring-purple-400' : ''
                            }`}
                            onClick={() => setTheme(theme.id)}
                          >
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.primary} text-white`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-sm">{theme.name}</h4>
                                  <p className="text-white/80 text-xs">{theme.description}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="text-lg">{theme.preview}</span>
                                  {currentTheme.id === theme.id && (
                                    <Check className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button 
                onClick={logout} 
                variant="outline" 
                className="ml-4 border-red-300 text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-400 hover:text-red-800 transition-all duration-200"
              >
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <div className="flex items-center space-x-2">
                {/* Mobile Theme Selector */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-9 h-9 p-0 text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-all duration-200"
                    >
                      <Palette className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Palette className="w-4 h-4 text-purple-600" />
                        <h4 className="font-medium text-base">Choose Theme</h4>
                      </div>
                      
                      {/* Current Theme */}
                      <div className="mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${currentTheme.primary} text-white`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-sm">{currentTheme.name}</h4>
                              <p className="text-white/80 text-xs">{currentTheme.description}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-lg">{currentTheme.preview}</span>
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* All Themes */}
                      <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
                        {availableThemes.map((theme) => (
                          <div
                            key={theme.id}
                            className={`relative cursor-pointer transition-all duration-200 hover:scale-105 rounded-lg ${
                              currentTheme.id === theme.id ? 'ring-2 ring-purple-400' : ''
                            }`}
                            onClick={() => setTheme(theme.id)}
                          >
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.primary} text-white`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-sm">{theme.name}</h4>
                                  <p className="text-white/80 text-xs">{theme.description}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="text-lg">{theme.preview}</span>
                                  {currentTheme.id === theme.id && (
                                    <Check className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-purple-100 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start font-medium transition-all duration-200 px-4 py-2 ${
                  isActive('/dashboard') 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link to="/track-mood" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start font-medium transition-all duration-200 px-4 py-2 ${
                  isActive('/track-mood') 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800'
                }`}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Track Mood
              </Button>
            </Link>
            <Link to="/history" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start font-medium transition-all duration-200 px-4 py-2 ${
                  isActive('/history') 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                History
              </Button>
            </Link>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start font-medium transition-all duration-200 px-4 py-2 ${
                  isActive('/profile') 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button 
              onClick={logout} 
              variant="outline" 
              className="w-full justify-start mt-2 border-red-300 text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-400 hover:text-red-800 transition-all duration-200"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};