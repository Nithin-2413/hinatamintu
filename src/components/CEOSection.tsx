
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Sparkles } from 'lucide-react';

const CEOSection = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-background to-pink-50/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 animate-float">
        <Sparkles className="w-12 h-12 text-yellow-300 opacity-30" />
      </div>
      <div className="absolute top-20 right-20 animate-float delay-1000">
        <Star className="w-8 h-8 text-pink-300 opacity-40 fill-current" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-float delay-2000">
        <Heart className="w-10 h-10 text-purple-300 opacity-25 fill-current" />
      </div>
      <div className="absolute bottom-32 right-16 animate-pulse">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-15"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Meet Our CEO:
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Chief Emotions Officer
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The heart and soul behind every beautifully crafted message
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Card className="group hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50 overflow-hidden rounded-3xl">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src="/lovable-uploads/c3b76b67-4b74-46f2-977b-973f064ca0c4.png"
                    alt="Onaamika Sadguru"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </CardContent>
            </Card>
            
            {/* Decorative elements around the card */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Onaamika Sadguru
              </h3>
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-50"></div>
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
              
              <p className="text-lg font-medium text-primary">
                "Every emotion deserves to be heard, every feeling deserves to find its way 
                to the heart it's meant for."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-pink-50/30 to-purple-50/30 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white fill-current" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Endless</h4>
                  <p className="text-sm text-muted-foreground">Love & Passion</p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
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
