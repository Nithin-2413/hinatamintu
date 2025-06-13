
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, price }) => {
  return (
    <Card className="group overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:bg-gradient-to-br hover:from-pink-50/30 hover:to-purple-50/20">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-4 text-white font-semibold text-sm opacity-90">
          {price}
        </div>
      </div>
      
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-700">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
