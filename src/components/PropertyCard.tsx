import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  rooms: number;
  distance: number;
  image: string;
  amenities: string[];
  onClick?: () => void;
}

export default function PropertyCard({
  title,
  location,
  price,
  rooms,
  distance,
  image,
  amenities,
  onClick,
}: PropertyCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {distance} км от леса
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-center text-muted-foreground mb-3">
          <Icon name="MapPin" size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center">
            <Icon name="Bed" size={18} className="mr-1" />
            <span className="text-sm">{rooms} комнат</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-primary">{price.toLocaleString('ru-RU')} ₽</span>
          <span className="text-sm text-muted-foreground ml-1">/ночь</span>
        </div>
      </CardFooter>
    </Card>
  );
}