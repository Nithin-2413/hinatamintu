
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Mail, Star, Users, Clock, MapPin, Sparkles, Gift, MessageHeart, PenTool } from 'lucide-react';
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
      price: "Starting ₹599"
    },
    {
      title: "Gratitude Messages",
      description: "Say thank you in the most meaningful way with personalized gratitude letters that touch souls.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
      price: "Starting ₹499"
    },
    {
      title: "Apology Letters",
      description: "Mend hearts and relationships with sincere, heartfelt apology messages that heal wounds.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
      price: "Starting ₹499"
    },
    {
      title: "Special Occasions",
      description: "Make birthdays, anniversaries, and milestones unforgettable with custom emotional messages.",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop",
      price: "Starting ₹799"
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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            The Written Hug
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <Button onClick={scrollToContact} className="bg-gradient-to-r from-primary to-purple-600 text-white">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-pink-50/30 to-purple-50/30 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,193,0.1),transparent_50%)]" />
        
        {/* Enhanced Floating Love Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-8 h-8 text-pink-300 opacity-60">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        <div className="absolute top-32 right-20 animate-float delay-1000">
          <div className="w-6 h-6 text-rose-300 opacity-50">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float delay-2000">
          <div className="w-10 h-10 text-pink-200 opacity-40">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        <div className="absolute top-1/3 right-10 animate-float delay-3000">
          <div className="w-4 h-4 text-rose-400 opacity-70">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        
        {/* New floating elements */}
        <div className="absolute top-1/4 left-1/3 animate-float delay-1500">
          <Sparkles className="w-6 h-6 text-yellow-300 opacity-40" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-float delay-2500">
          <Star className="w-5 h-5 text-purple-300 opacity-50 fill-current" />
        </div>
        <div className="absolute top-3/4 left-1/4 animate-float delay-3500">
          <MessageHeart className="w-7 h-7 text-pink-300 opacity-35" />
        </div>

        {/* Enhanced Floating Balloons */}
        <div className="absolute top-24 right-32 animate-bounce">
          <div className="w-12 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full opacity-30 shadow-lg"></div>
          <div className="w-0.5 h-8 bg-pink-300 mx-auto opacity-50"></div>
        </div>
        <div className="absolute top-16 left-32 animate-bounce delay-500">
          <div className="w-10 h-14 bg-gradient-to-b from-purple-300 to-purple-400 rounded-full opacity-25 shadow-lg"></div>
          <div className="w-0.5 h-6 bg-purple-300 mx-auto opacity-40"></div>
        </div>
        <div className="absolute bottom-32 right-16 animate-bounce delay-1000">
          <div className="w-8 h-12 bg-gradient-to-b from-rose-300 to-rose-400 rounded-full opacity-20 shadow-lg"></div>
          <div className="w-0.5 h-4 bg-rose-300 mx-auto opacity-30"></div>
        </div>
        <div className="absolute top-1/2 left-16 animate-bounce delay-1500">
          <div className="w-9 h-13 bg-gradient-to-b from-yellow-300 to-orange-300 rounded-full opacity-25 shadow-lg"></div>
          <div className="w-0.5 h-5 bg-yellow-300 mx-auto opacity-35"></div>
        </div>

        {/* Floating Letters and Envelopes */}
        <div className="absolute top-1/4 left-16 animate-pulse">
          <Mail className="w-6 h-6 text-amber-300 opacity-40" />
        </div>
        <div className="absolute bottom-1/3 right-24 animate-pulse delay-1000">
          <Mail className="w-8 h-8 text-yellow-300 opacity-30" />
        </div>
        <div className="absolute top-1/2 right-20 animate-pulse delay-2000">
          <PenTool className="w-5 h-5 text-blue-300 opacity-35" />
        </div>

        {/* Floating paper planes */}
        <div className="absolute top-1/3 left-1/4 animate-float delay-4000">
          <div className="w-6 h-6 text-blue-200 opacity-30 transform rotate-45">
            <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-current"></div>
          </div>
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
            <Button onClick={scrollToContact} size="lg" className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 text-lg group">
              Start Your Message
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              View Our Work
            </Button>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-pink-300/20 to-rose-300/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-xl animate-pulse delay-2000" />
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        
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
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/50 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 mx-auto mb-6 text-muted-foreground group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
                <h3 className="text-2xl font-semibold mb-4">Heartfelt Connection</h3>
                <p className="text-muted-foreground">Every message is crafted to create genuine emotional connections that last forever.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/50 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 mx-auto mb-6 text-muted-foreground group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
                <h3 className="text-2xl font-semibold mb-4">Beautiful Presentation</h3>
                <p className="text-muted-foreground">Each letter is elegantly designed and presented to make the moment truly special.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/50 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-6 text-muted-foreground group-hover:text-green-500 group-hover:scale-110 transition-all duration-300" />
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
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-pink-300 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-yellow-300 rounded-full animate-pulse delay-2000"></div>
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
      <section id="how-it-works" className="py-32 px-6 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 animate-float">
            <Heart className="w-16 h-16 text-pink-400 fill-current" />
          </div>
          <div className="absolute bottom-20 left-20 animate-float delay-1000">
            <Mail className="w-12 h-12 text-blue-400" />
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
                icon: MessageHeart,
                color: "from-pink-500 to-rose-500"
              },
              { 
                step: "02", 
                title: "We Craft Magic", 
                desc: "Our team transforms your emotions into beautifully written messages",
                icon: PenTool,
                color: "from-purple-500 to-indigo-500"
              },
              { 
                step: "03", 
                title: "Review & Refine", 
                desc: "We'll share the draft for your approval and make any adjustments",
                icon: Star,
                color: "from-yellow-500 to-orange-500"
              },
              { 
                step: "04", 
                title: "Delivered with Love", 
                desc: "Receive your personalized message, ready to touch hearts",
                icon: Gift,
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group relative">
                {/* Connection line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-muted-foreground/20 to-transparent transform translate-x-4 z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">{item.step}</span>
                  </div>
                  
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 mx-auto text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{item.desc}</p>
                </div>
                
                {/* Floating elements around each step */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-300 rounded-full opacity-0 group-hover:opacity-50 animate-pulse transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-300 rounded-full opacity-0 group-hover:opacity-40 animate-pulse delay-500 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-10 w-48 h-48 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse delay-1000"></div>
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
      <section className="py-20 px-6 bg-gradient-to-r from-pink-50/50 to-purple-50/50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-5 right-20 animate-bounce">
          <div className="w-8 h-12 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-5 left-20 animate-bounce delay-1000">
          <div className="w-6 h-10 bg-gradient-to-b from-purple-300 to-purple-400 rounded-full opacity-15"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center group">
              <MapPin className="h-12 w-12 text-muted-foreground group-hover:text-green-500 group-hover:scale-110 transition-all duration-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Over India</h3>
              <p className="text-muted-foreground">We deliver to every corner of the country</p>
            </div>
            <div className="flex flex-col items-center group">
              <Clock className="h-12 w-12 text-muted-foreground group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">10-15 Days</h3>
              <p className="text-muted-foreground">Standard free delivery timeline</p>
            </div>
            <div className="flex flex-col items-center group">
              <Heart className="h-12 w-12 text-muted-foreground group-hover:text-red-500 group-hover:scale-110 transition-all duration-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-muted-foreground">Every message crafted with care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 animate-float">
            <Heart className="w-20 h-20 text-pink-400 fill-current" />
          </div>
          <div className="absolute top-40 right-32 animate-float delay-1000">
            <Mail className="w-16 h-16 text-blue-400" />
          </div>
          <div className="absolute bottom-32 left-1/3 animate-float delay-2000">
            <Heart className="w-12 h-12 text-purple-400 fill-current" />
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
              <a href="mailto:onaamikasadguru@gmail.com" className="text-primary hover:underline">
                onaamikasadguru@gmail.com
              </a>
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-muted/20 border-t border-border relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-5 right-10 animate-pulse">
          <Heart className="w-8 h-8 text-pink-300 opacity-30 fill-current" />
        </div>
        <div className="absolute bottom-5 left-10 animate-pulse delay-1000">
          <Mail className="w-6 h-6 text-blue-300 opacity-30" />
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
            <a href="mailto:onaamikasadguru@gmail.com" className="hover:text-primary transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
