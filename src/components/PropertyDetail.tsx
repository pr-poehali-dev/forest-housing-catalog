import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface PropertyDetailProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    rooms: number;
    distance: number;
    image: string;
    amenities: string[];
    description?: string;
    images?: string[];
    maxGuests?: number;
    bedrooms?: number;
    bathrooms?: number;
  };
  onBack: () => void;
}

export default function PropertyDetail({ property, onBack }: PropertyDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [guests, setGuests] = useState(2);

  const allImages = property.images || [
    property.image,
    'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/1297480e-b852-4682-aa15-b8ddf8885405.jpg',
    'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/048bd1d1-bb9e-4d35-bf85-e50d9cc7c1ee.jpg',
  ];

  const calculateNights = () => {
    if (dateFrom && dateTo) {
      const diffTime = Math.abs(dateTo.getTime() - dateFrom.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const totalPrice = calculateNights() * property.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        Назад к каталогу
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <img
              src={allImages[selectedImage]}
              alt={property.title}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {allImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${property.title} ${idx + 1}`}
                onClick={() => setSelectedImage(idx)}
                className={`w-full h-32 object-cover rounded-lg cursor-pointer transition-all ${
                  selectedImage === idx
                    ? 'ring-4 ring-primary scale-105'
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <Icon name="MapPin" size={20} className="mr-2" />
              <span className="text-lg">{property.location}</span>
              <span className="mx-3">•</span>
              <Icon name="Trees" size={20} className="mr-2" />
              <span className="text-lg">{property.distance} км от леса</span>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center">
                <Icon name="Users" size={20} className="mr-2 text-primary" />
                <span>{property.maxGuests || 4} гостей</span>
              </div>
              <div className="flex items-center">
                <Icon name="Bed" size={20} className="mr-2 text-primary" />
                <span>{property.bedrooms || property.rooms} спален</span>
              </div>
              <div className="flex items-center">
                <Icon name="Bath" size={20} className="mr-2 text-primary" />
                <span>{property.bathrooms || 1} санузел</span>
              </div>
            </div>

            <div className="border-t border-b py-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description ||
                  'Прекрасное место для отдыха на природе. Дом расположен в живописном месте, окружённом лесом. Идеально подходит для семейного отдыха или отдыха с друзьями. Рядом есть всё необходимое для комфортного проживания. Чистый воздух, тишина и умиротворение гарантированы.'}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Удобства</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Правила проживания</h2>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start">
                  <Icon name="Clock" size={18} className="mr-2 mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">Заезд: 14:00</p>
                    <p className="text-sm">Выезд: 12:00</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Icon name="Ban" size={18} className="mr-2 mt-1 text-primary" />
                  <p>Курение запрещено</p>
                </div>
                <div className="flex items-start">
                  <Icon name="Volume2" size={18} className="mr-2 mt-1 text-primary" />
                  <p>Тишина после 23:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-primary">
                    {property.price.toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="text-muted-foreground ml-2">/ночь</span>
                </div>
                <Badge variant="secondary" className="mt-2">
                  Отличный рейтинг
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Даты</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left">
                          <Icon name="Calendar" size={16} className="mr-2" />
                          {dateFrom ? format(dateFrom, 'dd MMM', { locale: ru }) : 'Заезд'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateFrom}
                          onSelect={setDateFrom}
                          disabled={(date) => date < new Date()}
                          locale={ru}
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left">
                          <Icon name="Calendar" size={16} className="mr-2" />
                          {dateTo ? format(dateTo, 'dd MMM', { locale: ru }) : 'Выезд'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateTo}
                          onSelect={setDateTo}
                          disabled={(date) => date < (dateFrom || new Date())}
                          locale={ru}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests" className="text-sm font-semibold mb-2 block">
                    Количество гостей
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <Input
                      id="guests"
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="text-center"
                      min={1}
                      max={property.maxGuests || 10}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setGuests(Math.min(property.maxGuests || 10, guests + 1))
                      }
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {dateFrom && dateTo && (
                <div className="mb-6 p-4 bg-secondary rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>
                      {property.price.toLocaleString('ru-RU')} ₽ × {calculateNights()} ноч.
                    </span>
                    <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Итого</span>
                    <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              )}

              <Button className="w-full" size="lg" disabled={!dateFrom || !dateTo}>
                <Icon name="CalendarCheck" size={20} className="mr-2" />
                Забронировать
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Оплата производится при заезде
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6 p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Icon name="MessageCircle" size={20} className="mr-2 text-primary" />
              Есть вопросы?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Свяжитесь с арендодателем для уточнения деталей
            </p>
            <Button variant="outline" className="w-full">
              <Icon name="Send" size={18} className="mr-2" />
              Написать
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
