
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Mail, Star, Users, Clock, MapPin, Sparkles, Gift, MessageCircle, PenTool } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import CEOSection from '@/components/CEOSection';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: "Love Letters",
      description: "Express your deepest feelings with beautifully crafted love letters that speak directly to the heart.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
      price: "₹599"
    },
    {
      title: "Gratitude Messages",
      description: "Say thank you in the most meaningful way with personalized gratitude letters that touch souls.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
      price: "₹499"
    },
    {
      title: "Apology Letters",
      description: "Mend hearts and relationships with sincere, heartfelt apology messages that heal wounds.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
      price: "₹499"
    },
    {
      title: "Special Occasions",
      description: "Make birthdays, anniversaries, and milestones unforgettable with custom emotional messages.",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop",
      price: "₹799"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      message: "The Written Hug helped me express 10 years of unspoken gratitude to my mother. She cried tears of joy!",
      rating: 5
    },
    {
      name: "Rahul Gupta",
      location: "Delhi",
      message: "I couldn't find words to apologize to my best friend. Their letter saved our friendship.",
      rating: 5
    },
    {
      name: "Anjali Patel",
      location: "Bangalore",
      message: "The love letter they wrote for my anniversary was pure magic. My husband was speechless!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrollY > 50 ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            The Written Hug
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105">About</a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105">Services</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105">How It Works</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105">Contact</a>
          </div>
          <Button onClick={scrollToContact} className="bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-pink-50/20 to-purple-50/20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,193,0.08),transparent_60%)]" />
        
        {/* Premium Floating Elements */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-6 h-6 text-pink-200 opacity-40">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        <div className="absolute top-40 right-32 animate-float delay-1000">
          <div className="w-4 h-4 text-rose-200 opacity-30">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        <div className="absolute bottom-40 left-32 animate-float delay-2000">
          <div className="w-8 h-8 text-pink-100 opacity-25">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        <div className="absolute top-1/3 right-20 animate-float delay-3000">
          <div className="w-3 h-3 text-rose-300 opacity-50">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        
        {/* Elegant floating elements */}
        <div className="absolute top-1/4 left-1/3 animate-float delay-1500">
          <Sparkles className="w-4 h-4 text-yellow-200 opacity-25" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-float delay-2500">
          <Star className="w-3 h-3 text-purple-200 opacity-30 fill-current" />
        </div>
        <div className="absolute top-3/4 left-1/4 animate-float delay-3500">
          <MessageCircle className="w-5 h-5 text-pink-200 opacity-20" />
        </div>

        {/* Premium Floating Balloons */}
        <div className="absolute top-32 right-40 animate-bounce">
          <div className="w-8 h-12 bg-gradient-to-b from-pink-200/60 to-pink-300/60 rounded-full shadow-sm"></div>
          <div className="w-0.5 h-6 bg-pink-200/50 mx-auto"></div>
        </div>
        <div className="absolute top-24 left-40 animate-bounce delay-500">
          <div className="w-6 h-10 bg-gradient-to-b from-purple-200/50 to-purple-300/50 rounded-full shadow-sm"></div>
          <div className="w-0.5 h-4 bg-purple-200/40 mx-auto"></div>
        </div>
        <div className="absolute bottom-40 right-24 animate-bounce delay-1000">
          <div className="w-5 h-8 bg-gradient-to-b from-rose-200/40 to-rose-300/40 rounded-full shadow-sm"></div>
          <div className="w-0.5 h-3 bg-rose-200/30 mx-auto"></div>
        </div>

        {/* Floating Letters and Envelopes */}
        <div className="absolute top-1/4 left-24 animate-pulse">
          <Mail className="w-4 h-4 text-amber-200 opacity-25" />
        </div>
        <div className="absolute bottom-1/3 right-32 animate-pulse delay-1000">
          <Mail className="w-6 h-6 text-yellow-200 opacity-20" />
        </div>
        <div className="absolute top-1/2 right-28 animate-pulse delay-2000">
          <PenTool className="w-3 h-3 text-blue-200 opacity-20" />
        </div>

        <div className={`text-center max-w-5xl mx-auto relative z-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              A hug without touch,
            </span>
            <br />
            <span className="text-foreground">
              but meaning so much
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Your feelings. My words. Their smile.
            <br />
            We help you express what your heart holds but words can't quite say.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button onClick={scrollToContact} size="lg" className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 text-lg group hover:shadow-xl transition-all duration-500 hover:scale-105">
              Start Your Message
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Premium Background Glows */}
        <div className="absolute top-1/4 left-20 w-32 h-32 bg-gradient-to-r from-pink-200/10 to-rose-200/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-20 w-40 h-40 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-200/10 to-orange-200/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
        {/* Subtle Background Decorations */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-pink-100/20 to-purple-100/20 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-r from-yellow-100/20 to-orange-100/20 rounded-full opacity-30 animate-pulse delay-1000"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Share a smile,
              </span>
              <br />
              The Written Hug style
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether it's love, gratitude, apology, or something deeply personal, we take your raw feelings 
              and turn them into beautifully crafted messages — written with care, designed with emotion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-background to-muted/30 hover:-translate-y-3 hover:bg-gradient-to-br hover:from-red-50/20 hover:to-rose-50/20">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 mx-auto mb-6 text-muted-foreground group-hover:text-red-500 group-hover:scale-110 transition-all duration-500" />
                <h3 className="text-2xl font-semibold mb-4">Heartfelt Connection</h3>
                <p className="text-muted-foreground">Every message is crafted to create genuine emotional connections that last forever.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-background to-muted/30 hover:-translate-y-3 hover:bg-gradient-to-br hover:from-blue-50/20 hover:to-indigo-50/20">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 mx-auto mb-6 text-muted-foreground group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500" />
                <h3 className="text-2xl font-semibold mb-4">Beautiful Presentation</h3>
                <p className="text-muted-foreground">Each letter is elegantly designed and presented to make the moment truly special.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-background to-muted/30 hover:-translate-y-3 hover:bg-gradient-to-br hover:from-green-50/20 hover:to-emerald-50/20">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-6 text-muted-foreground group-hover:text-green-500 group-hover:scale-110 transition-all duration-500" />
                <h3 className="text-2xl font-semibold mb-4">Personal Touch</h3>
                <p className="text-muted-foreground">Every word is chosen carefully to reflect your unique voice and emotions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <CEOSection />

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative overflow-hidden">
        {/* Subtle Background Decorations */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-32 left-32 w-24 h-24 bg-pink-200 rounded-full animate-pulse"></div>
          <div className="absolute top-48 right-40 w-16 h-16 bg-purple-200 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-yellow-200 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Feelings found in
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                flowing ink
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our range of personalized writing services, each crafted to perfection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-6 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
        {/* Premium Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 animate-float">
            <Heart className="w-12 h-12 text-pink-300 fill-current" />
          </div>
          <div className="absolute bottom-32 left-32 animate-float delay-1000">
            <Mail className="w-8 h-8 text-blue-300" />
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to transform your feelings into beautiful words
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Share Your Story", 
                desc: "Tell us about your feelings, the person, and what you want to express",
                icon: MessageCircle,
                color: "from-pink-400 to-rose-400"
              },
              { 
                step: "02", 
                title: "We Craft Magic", 
                desc: "Our team transforms your emotions into beautifully written messages",
                icon: PenTool,
                color: "from-purple-400 to-indigo-400"
              },
              { 
                step: "03", 
                title: "Review & Refine", 
                desc: "We'll share the draft for your approval and make any adjustments",
                icon: Star,
                color: "from-yellow-400 to-orange-400"
              },
              { 
                step: "04", 
                title: "Delivered with Love", 
                desc: "Receive your personalized message, ready to touch hearts",
                icon: Gift,
                color: "from-green-400 to-emerald-400"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group relative">
                {/* Premium Connection line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-muted-foreground/30 to-transparent transform translate-x-4 z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-2xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">{item.step}</span>
                  </div>
                  
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-10 h-10 mx-auto text-muted-foreground group-hover:text-primary transition-colors duration-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-500">{item.title}</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-500 leading-relaxed">{item.desc}</p>
                </div>
                
                {/* Premium floating elements around each step */}
                <div className="absolute -top-3 -right-3 w-3 h-3 bg-pink-200 rounded-full opacity-0 group-hover:opacity-40 animate-pulse transition-opacity duration-500"></div>
                <div className="absolute -bottom-3 -left-3 w-2 h-2 bg-purple-200 rounded-full opacity-0 group-hover:opacity-30 animate-pulse delay-500 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Premium Background Decorations */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/4 left-20 w-32 h-32 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-20 w-24 h-24 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Stories of
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Connection
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from people whose hearts we've helped express
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Info Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Subtle Background Decorations */}
        <div className="absolute top-8 right-32 animate-bounce">
          <div className="w-6 h-8 bg-gradient-to-b from-pink-200/40 to-pink-300/40 rounded-full"></div>
        </div>
        <div className="absolute bottom-8 left-32 animate-bounce delay-1000">
          <div className="w-4 h-6 bg-gradient-to-b from-purple-200/30 to-purple-300/30 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center group">
              <MapPin className="h-12 w-12 text-muted-foreground group-hover:text-green-600 group-hover:scale-110 transition-all duration-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Over India</h3>
              <p className="text-muted-foreground">We deliver to every corner of the country</p>
            </div>
            <div className="flex flex-col items-center group">
              <Clock className="h-12 w-12 text-muted-foreground group-hover:text-orange-500 group-hover:scale-110 transition-all duration-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">10-15 Days</h3>
              <p className="text-muted-foreground">Standard free delivery timeline</p>
            </div>
            <div className="flex flex-col items-center group">
              <Heart className="h-12 w-12 text-muted-foreground group-hover:text-red-500 group-hover:scale-110 transition-all duration-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-muted-foreground">Every message crafted with care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        {/* Premium Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-32 left-32 animate-float">
            <Heart className="w-16 h-16 text-pink-300 fill-current" />
          </div>
          <div className="absolute top-48 right-40 animate-float delay-1000">
            <Mail className="w-12 h-12 text-blue-300" />
          </div>
          <div className="absolute bottom-40 left-1/3 animate-float delay-2000">
            <Heart className="w-8 h-8 text-purple-300 fill-current" />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Share Your Heart
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                With Us
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to express what your heart holds? Share your story with us.
            </p>
            <p className="text-lg text-muted-foreground">
              Questions? Reach us at{" "}
              <a href="mailto:onaamikasadguru@gmail.com" className="text-primary hover:underline transition-colors duration-300">
                onaamikasadguru@gmail.com
              </a>
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-muted/10 border-t border-border/30 relative overflow-hidden">
        {/* Subtle Background Decorations */}
        <div className="absolute top-8 right-20 animate-pulse">
          <Heart className="w-6 h-6 text-pink-200 opacity-40 fill-current" />
        </div>
        <div className="absolute bottom-8 left-20 animate-pulse delay-1000">
          <Mail className="w-4 h-4 text-blue-200 opacity-40" />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
            The Written Hug
          </div>
          <p className="text-muted-foreground mb-8">
            A hug without touch, but meaning so much
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <span>Made with ❤️ in India</span>
            <span>•</span>
            <a href="mailto:onaamikasadguru@gmail.com" className="hover:text-primary transition-colors duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
