
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  recipientName: string;
  serviceType: string;
  feelings: string;
  story: string;
  specificDetails: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    recipientName: '',
    serviceType: '',
    feelings: '',
    story: '',
    specificDetails: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const serviceTypes = [
    'Love Letter',
    'Gratitude Message',
    'Apology Letter',
    'Birthday Message',
    'Anniversary Letter',
    'Thank You Note',
    'Friendship Letter',
    'Family Message',
    'Custom Request'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show success message since FormSubmit will handle the actual submission
    toast({
      title: "Message Received! ❤️",
      description: "We'll start crafting your beautiful message and get back to you within 24 hours.",
    });
    
    // Let FormSubmit handle the actual form submission
    // The form will redirect after submission
    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-background to-muted/30">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
          <Heart className="h-8 w-8 text-primary" />
          Share Your Heart
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Tell us your story, and we'll help you express it beautifully
        </p>
      </CardHeader>
      
      <CardContent className="p-8">
        <form action="https://formsubmit.co/onaamikasadguru@gmail.com" method="POST" onSubmit={handleSubmit} className="space-y-8">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="box" />
          <input type="hidden" name="_next" value={window.location.origin + "?submitted=true"} />
          
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  className="h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 XXXXX XXXXX"
                required
                className="h-12"
              />
            </div>
          </div>

          {/* Message Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">Message Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient's Name *</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  placeholder="Who is this message for?"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceType">Type of Message *</Label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select message type</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Feelings & Story */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">Your Story</h3>
            <div className="space-y-2">
              <Label htmlFor="feelings">What feelings do you want to express? *</Label>
              <Textarea
                id="feelings"
                name="feelings"
                value={formData.feelings}
                onChange={handleInputChange}
                placeholder="Describe the emotions you want to convey... (love, gratitude, regret, appreciation, etc.)"
                required
                className="min-h-[100px] resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="story">Tell us your story *</Label>
              <Textarea
                id="story"
                name="story"
                value={formData.story}
                onChange={handleInputChange}
                placeholder="Share the background, your relationship with this person, what led to this moment, and why this message matters to you..."
                required
                className="min-h-[120px] resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specificDetails">Specific details to include (Optional)</Label>
              <Textarea
                id="specificDetails"
                name="specificDetails"
                value={formData.specificDetails}
                onChange={handleInputChange}
                placeholder="Any specific memories, inside jokes, special moments, or particular words you'd like us to include..."
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="p-6 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-primary">Delivery Information</h4>
            <p className="text-sm text-muted-foreground">
              • We deliver all over India with standard free delivery<br />
              • Delivery timeline: 10-15 days<br />
              • You'll receive updates via email and phone<br />
              • Contact us at onaamikasadguru@gmail.com for any queries
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 group"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                Creating Magic...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Send My Story
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
