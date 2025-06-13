
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Mail, Star, Users, Clock, MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Love Letters",
      description: "Express your deepest feelings with beautifully crafted love letters that speak directly to the heart.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop",
      price: "Starting ₹899"
    },
    {
      title: "Gratitude Messages",
      description: "Say thank you in the most meaningful way with personalized gratitude letters that touch souls.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop",
      price: "Starting ₹699"
    },
    {
      title: "Apology Letters",
      description: "Mend hearts and relationships with sincere, heartfelt apology messages that heal wounds.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop",
      price: "Starting ₹799"
    },
    {
      title: "Special Occasions",
      description: "Make birthdays, anniversaries, and milestones unforgettable with custom emotional messages.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      price: "Starting ₹999"
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
          <Button className="bg-gradient-to-r from-primary to-purple-600 text-white">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        
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
            <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 text-lg group">
              Start Your Message
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              View Our Work
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-primary/20 rounded-full blur-xl animate-pulse delay-1000" />
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
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
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/50">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 mx-auto mb-6 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold mb-4">Heartfelt Connection</h3>
                <p className="text-muted-foreground">Every message is crafted to create genuine emotional connections that last forever.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/50">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 mx-auto mb-6 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold mb-4">Beautiful Presentation</h3>
                <p className="text-muted-foreground">Each letter is elegantly designed and presented to make the moment truly special.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/50">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-6 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold mb-4">Personal Touch</h3>
                <p className="text-muted-foreground">Every word is chosen carefully to reflect your unique voice and emotions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
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
      <section id="how-it-works" className="py-32 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-6xl mx-auto">
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
              { step: "01", title: "Share Your Story", desc: "Tell us about your feelings, the person, and what you want to express" },
              { step: "02", title: "We Craft Magic", desc: "Our team transforms your emotions into beautifully written messages" },
              { step: "03", title: "Review & Refine", desc: "We'll share the draft for your approval and make any adjustments" },
              { step: "04", title: "Delivered with Love", desc: "Receive your personalized message, ready to touch hearts" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
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
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Over India</h3>
              <p className="text-muted-foreground">We deliver to every corner of the country</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">10-15 Days</h3>
              <p className="text-muted-foreground">Standard free delivery timeline</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-muted-foreground">Every message crafted with care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Let's Create
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Your Message
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
      <footer className="py-16 px-6 bg-muted/20 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
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
