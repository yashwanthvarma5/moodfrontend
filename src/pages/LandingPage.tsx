import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const LandingPage: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <div className={`min-h-screen overflow-hidden ${currentTheme.className}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Blobs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>

          {/* Floating Emojis */}
          <div className="absolute top-16 left-16 text-4xl animate-bounce delay-300">✨</div>
          <div className="absolute top-32 right-20 text-5xl animate-bounce delay-700">🌈</div>
          <div className="absolute bottom-32 left-24 text-3xl animate-bounce delay-1000">💫</div>
          <div className="absolute bottom-16 right-32 text-4xl animate-bounce delay-500">🦋</div>
          <div className="absolute top-1/3 left-8 text-3xl animate-bounce delay-200">🌸</div>
          <div className="absolute top-2/3 right-16 text-4xl animate-bounce delay-900">🎨</div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center items-center space-x-3 mb-8">
            <div className="relative">
              <Heart className="w-14 h-14 text-pink-500 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              VibeTrackr
            </span>
          </div>

          {/* Main Headline */}
          <div className="mb-8 space-y-4">
            <h1 className="text-6xl md:text-8xl font-black leading-tight">
              <span className="block text-gray-900">your feels,</span>
              <span className="block bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent transform -rotate-1">
                your story
              </span>
            </h1>
            <div className="flex justify-center items-center space-x-2 text-2xl md:text-3xl font-bold text-gray-700">
              <span>track</span>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span>reflect</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
              <span>grow</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            the mood tracking app that actually gets you. 
            <span className="text-pink-500 font-semibold"> no cap.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 hover:from-violet-600 hover:via-pink-600 hover:to-cyan-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  start vibing
                  <Sparkles className="w-6 h-6 ml-2 group-hover:animate-spin" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-12 py-6 text-xl font-bold rounded-2xl border-2 border-gray-300 text-gray-700 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-all duration-300 transform hover:scale-105"
              >
                i'm already here ✌️
              </Button>
            </Link>
          </div>

          {/* Emoji Mood Preview */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="text-4xl animate-bounce">😊</div>
            <div className="text-4xl animate-bounce delay-100">😢</div>
            <div className="text-4xl animate-bounce delay-200">😤</div>
            <div className="text-4xl animate-bounce delay-300">🤔</div>
            <div className="text-4xl animate-bounce delay-400">🥰</div>
            <div className="text-4xl animate-bounce delay-500">😴</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-100/50 to-pink-100/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              why you'll
              <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent transform rotate-1">
                love this
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              mood tracking that doesn't feel like homework
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-violet-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-violet-500 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                    <span className="text-3xl">😊</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    emoji feels
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    pick your vibe in seconds. no overthinking, just pure emotion expressed through the universal language of emojis
                  </p>
                </div>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    see patterns
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    discover what makes you tick with beautiful charts that actually make sense. your emotional journey visualized
                  </p>
                </div>
              </Card>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center transform rotate-2 group-hover:rotate-4 transition-transform duration-300">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    build streaks
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    turn self-care into a game. watch your streak grow and celebrate every day you check in with yourself
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="inline-block p-8 bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                ready to understand yourself better?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                join thousands already tracking their vibes
              </p>
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white px-10 py-4 text-lg font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  let's go! 🚀
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Wave */}
      <div className="relative">
        <svg className="w-full h-24 fill-current text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </div>
  );
};
