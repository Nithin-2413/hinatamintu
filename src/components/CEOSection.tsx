
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Sparkles, Gift } from 'lucide-react';

const CEOSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-background to-pink-50/10 relative overflow-hidden">
      {/* Subtle Background Decorations */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-3 h-3 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
      </div>
      <div className="absolute top-40 right-32 animate-float delay-1000">
        <div className="w-2 h-2 bg-purple-200 rounded-full opacity-15 animate-pulse delay-500"></div>
      </div>
      <div className="absolute bottom-32 left-1/3 animate-float delay-2000">
        <div className="w-4 h-4 bg-rose-200 rounded-full opacity-25 animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Meet Our
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Chief Emotions Officer
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The heart and soul behind every beautifully crafted message
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="relative overflow-hidden">
              <div 
                className="relative transform transition-all duration-700 group-hover:scale-[1.02]"
                style={{
                  clipPath: 'polygon(0% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.1))'
                }}
              >
                <img
                  src="/lovable-uploads/8ff94026-8a46-4770-bfb7-812dbb74f7f2.png"
                  alt="Onaamika Sadguru"
                  className="w-full h-auto max-w-md mx-auto transform transition-all duration-700 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Subtle floating elements on hover */}
              <div className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-60 transition-all duration-500 delay-200">
                <Heart className="w-6 h-6 text-pink-300 animate-pulse" />
              </div>
              <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-40 transition-all duration-500 delay-400">
                <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Onaamika Sadguru
              </h3>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                A wordsmith with a heart that feels deeply and a pen that bleeds emotion. 
                Onaamika doesn't just write letters—she weaves souls into sentences and 
                transforms silent hearts into singing words.
              </p>
              
              <p className="text-lg">
                With an uncanny ability to capture the essence of human connection, she has 
                dedicated her life to giving voice to the voiceless emotions that live in the 
                space between heartbeats.
              </p>
              
              <p className="text-lg font-medium text-primary italic">
                "Every emotion deserves to be heard, every feeling deserves to find its way 
                to the heart it's meant for."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-pink-50/50 to-purple-50/30 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white fill-current" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Endless</h4>
                  <p className="text-sm text-muted-foreground">Love & Passion</p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/30 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Pure</h4>
                  <p className="text-sm text-muted-foreground">Magic & Wonder</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
