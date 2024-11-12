import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import './styles/animation.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HomePage = () => {
  const features: Feature[] = [
    { icon: <Calendar className="w-6 h-6" />, title: "Smart Scheduling", description: "AI-powered booking optimization" },
    { icon: <Clock className="w-6 h-6" />, title: "Real-time Availability", description: "Instant slot updates" },
    { icon: <Users className="w-6 h-6" />, title: "Team Management", description: "Seamless collaboration" }
  ];

  return (
    <div className="min-h-screen hero-gradient">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4">
          <div className="animate-fadeIn">
            <h1 className="hero-title">
              Slotify
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Scheduling, Simplified with AI
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Button className="cta-button">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline">
                See How It Works
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute bottom-20 w-full overflow-hidden">
          <div className="flex gap-6 justify-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-slideUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card className="feature-card">
                  <div className="flex items-center gap-4">
                    <div className="feature-icon-container">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Feature Section */}
      <div className="section-spacing">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Slotify?</h2>
            <p className="text-gray-600">Experience the future of scheduling</p>
          </div>

          <div className="features-grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-fadeScale"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Card className="feature-card group">
                  <div className="h-full flex flex-col">
                    <div className="mb-4">
                      <Sparkles className="w-8 h-8 text-blue-500 group-hover:text-purple-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Feature {i + 1}</h3>
                    <p className="text-gray-600 flex-grow">
                      Discover how our intelligent scheduling system can transform your booking experience.
                    </p>
                    <Button variant="ghost" className="mt-4 learn-more-button">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;