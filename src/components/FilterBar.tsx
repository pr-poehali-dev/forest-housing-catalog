import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  rooms: number[];
  maxDistance: number;
  amenities: string[];
}

const availableAmenities = [
  'Wi-Fi',
  'Кухня',
  'Камин',
  'Сауна',
  'Парковка',
  'Терраса',
  'Барбекю',
  'Бассейн',
];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 20000],
    rooms: [],
    maxDistance: 10,
    amenities: [],
  });

  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDistanceChange = (value: number[]) => {
    const newFilters = { ...filters, maxDistance: value[0] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRoomToggle = (room: number) => {
    const newRooms = filters.rooms.includes(room)
      ? filters.rooms.filter((r) => r !== room)
      : [...filters.rooms, room];
    const newFilters = { ...filters, rooms: newRooms };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 20000],
      rooms: [],
      maxDistance: 10,
      amenities: [],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="mb-6">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="w-full md:w-auto mb-4 md:hidden"
      >
        <Icon name="Filter" size={18} className="mr-2" />
        Фильтры
      </Button>

      <Card className={`p-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <Label className="text-sm font-semibold mb-3 block">Цена за ночь</Label>
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={20000}
              step={500}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.priceRange[0].toLocaleString('ru-RU')} ₽</span>
              <span>{filters.priceRange[1].toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">Количество комнат</Label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((room) => (
                <Button
                  key={room}
                  variant={filters.rooms.includes(room) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleRoomToggle(room)}
                >
                  {room}+
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Расстояние от леса: {filters.maxDistance} км
            </Label>
            <Slider
              value={[filters.maxDistance]}
              onValueChange={handleDistanceChange}
              min={0}
              max={20}
              step={1}
              className="mb-2"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">Удобства</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {availableAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  />
                  <label
                    htmlFor={amenity}
                    className="text-sm cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="ghost" onClick={resetFilters}>
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Сбросить фильтры
          </Button>
        </div>
      </Card>
    </div>
  );
}
