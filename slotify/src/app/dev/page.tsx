"use client";

import { useState } from "react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function DevRoadmap() {
  const [blogPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Project Launch",
      content: "Hi, my name'is luke and I'm excited to announce the launch of Slotify, a platform that allows you to schedule and manage appointments for your business. So far we are just starting out with the development roadmap. Please take a look at the other portion of this page where you can find the roadmap and feel free to explore the website as we use dummy data for now.",
      date: "2024-01-20"
    }
  ]);

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Pink circular accents */}
      <div className="absolute top-[-50px] right-[20px] w-[120px] h-[120px] rounded-full bg-pink-300/80" />
      <div className="absolute top-[100px] right-[120px] w-[80px] h-[80px] rounded-full bg-pink-300/80" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Home Button */}
        <Link 
          href="/"
          className="inline-flex items-center mb-8 text-pink-600 hover:text-pink-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-12">Development Roadmap</h1>
        
        {/* Dropdown Buttons */}
        <div className="flex flex-col gap-4 mb-8">
          <button 
            onClick={() => toggleSection('roadmap')}
            className="text-left px-6 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-900">Project Roadmap</h2>
              </div>
              <span className={`transform transition-transform ${activeSection === 'roadmap' ? 'rotate-180' : ''}`}>▼</span>
            </div>
          </button>

          <button 
            onClick={() => toggleSection('blog')}
            className="text-left px-6 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-900">Development Blog</h2>
              </div>
              <span className={`transform transition-transform ${activeSection === 'blog' ? 'rotate-180' : ''}`}>▼</span>
            </div>
          </button>
        </div>

        {/* Roadmap Content */}
        <div className={`transition-all duration-300 overflow-hidden ${activeSection === 'roadmap' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {/* Current Version */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Current Version [0.1.0]</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Implemented Features</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Initial project setup with Next.js and TypeScript</li>
                <li>Homepage with animated info popups and pink circular accents</li>
                <li>Registration page with form validation and business type selection</li>
                <li>Dashboard page functionality with business and service management</li>
                <li>Basic styling using Tailwind CSS</li>
                <li>Client-side form validation</li>
                <li>Responsive design for all pages</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Current Issues</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Form submissions not connected to backend yet</li>
                <li>Missing authentication system</li>
                <li>Payment processing not implemented</li>
                <li>Service scheduling functionality pending</li>
              </ul>
            </div>
          </section>

          {/* Planned Components */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Planned Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Calendar Component",
                  features: ["Reusable calendar with time slot selection", "Support for blocked out dates/times", "Multiple view options", "Customizable time intervals"]
                },
                {
                  title: "Booking Slot Component",
                  features: ["Display available time slots", "Handle duration-based bookings", "Show booking status", "Support for buffer times"]
                },
                {
                  title: "Service Card Component",
                  features: ["Standardized display of service information", "Price, duration, description formatting", "Action buttons", "Support for service images"]
                },
                {
                  title: "Business Hours Component",
                  features: ["Weekly schedule management", "Special holiday hours", "Break time settings", "Multiple staff schedule support"]
                }
              ].map((component, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{component.title}</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    {component.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Blog Content */}
        <div className={`transition-all duration-300 overflow-hidden ${activeSection === 'blog' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <section>
            <div className="space-y-6">
              {blogPosts.map(post => (
                <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{post.title}</h3>
                  <time className="text-sm text-gray-500 mb-4 block">{post.date}</time>
                  <p className="text-gray-600">{post.content}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}