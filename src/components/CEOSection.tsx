
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Sparkles, Gift } from 'lucide-react';

const CEOSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-background to-pink-50/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 animate-float">
        <Sparkles className="w-12 h-12 text-yellow-300 opacity-40" />
      </div>
      <div className="absolute top-20 right-20 animate-float delay-1000">
        <Star className="w-8 h-8 text-pink-300 opacity-50 fill-current" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-float delay-2000">
        <Heart className="w-10 h-10 text-purple-300 opacity-30 fill-current" />
      </div>
      <div className="absolute bottom-32 right-16 animate-pulse">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20"></div>
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Card 
              className="group hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50 hover:-translate-y-2 overflow-hidden cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CardContent className="p-0">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src="/lovable-uploads/8ff94026-8a46-4770-bfb7-812dbb74f7f2.png"
                    alt="Onaamika Sadguru"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Celebration blast effect on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Balloons */}
                      <div className="absolute top-4 left-4 animate-bounce">
                        <div className="w-8 h-10 bg-gradient-to-b from-red-400 to-red-500 rounded-full opacity-80 shadow-lg"></div>
                        <div className="w-0.5 h-4 bg-red-400 mx-auto opacity-70"></div>
                      </div>
                      <div className="absolute top-8 right-8 animate-bounce delay-300">
                        <div className="w-6 h-8 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full opacity-80 shadow-lg"></div>
                        <div className="w-0.5 h-3 bg-blue-400 mx-auto opacity-70"></div>
                      </div>
                      <div className="absolute top-16 left-12 animate-bounce delay-600">
                        <div className="w-5 h-7 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full opacity-80 shadow-lg"></div>
                        <div className="w-0.5 h-2 bg-yellow-400 mx-auto opacity-70"></div>
                      </div>
                      
                      {/* Hearts */}
                      <div className="absolute top-12 right-4 animate-pulse">
                        <Heart className="w-6 h-6 text-pink-400 fill-current opacity-80" />
                      </div>
                      <div className="absolute bottom-12 left-4 animate-pulse delay-500">
                        <Heart className="w-5 h-5 text-red-400 fill-current opacity-70" />
                      </div>
                      <div className="absolute top-1/2 right-12 animate-pulse delay-1000">
                        <Heart className="w-4 h-4 text-rose-400 fill-current opacity-60" />
                      </div>
                      
                      {/* Sparkles */}
                      <div className="absolute top-6 left-1/2 animate-ping">
                        <Sparkles className="w-5 h-5 text-yellow-400 opacity-80" />
                      </div>
                      <div className="absolute bottom-8 right-1/3 animate-ping delay-700">
                        <Sparkles className="w-4 h-4 text-orange-400 opacity-70" />
                      </div>
                      <div className="absolute top-1/3 left-8 animate-ping delay-1400">
                        <Sparkles className="w-3 h-3 text-amber-400 opacity-60" />
                      </div>
                      
                      {/* Stars */}
                      <div className="absolute top-20 right-16 animate-spin">
                        <Star className="w-5 h-5 text-purple-400 fill-current opacity-80" />
                      </div>
                      <div className="absolute bottom-16 left-8 animate-spin delay-800">
                        <Star className="w-4 h-4 text-pink-400 fill-current opacity-70" />
                      </div>
                      
                      {/* Gifts */}
                      <div className="absolute bottom-4 right-4 animate-bounce delay-1200">
                        <Gift className="w-6 h-6 text-green-400 opacity-80" />
                      </div>
                      
                      {/* Confetti effect */}
                      <div className="absolute top-0 left-0 w-full h-full">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className={`absolute w-2 h-2 bg-gradient-to-r ${
                              i % 4 === 0 ? 'from-pink-400 to-rose-400' :
                              i % 4 === 1 ? 'from-blue-400 to-indigo-400' :
                              i % 4 === 2 ? 'from-yellow-400 to-orange-400' :
                              'from-purple-400 to-violet-400'
                            } rounded-full opacity-70 animate-ping`}
                            style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 2}s`,
                              animationDuration: `${1 + Math.random()}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Decorative elements around the card */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Onaamika Sadguru
              </h3>
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
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
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-pink-50/30 to-purple-50/30">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white fill-current" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Endless</h4>
                  <p className="text-sm text-muted-foreground">Love & Passion</p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50/30 to-orange-50/30">
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
