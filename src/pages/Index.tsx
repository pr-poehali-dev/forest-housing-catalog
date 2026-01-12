import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import FilterBar, { FilterState } from '@/components/FilterBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const mockProperties = [
  {
    id: 1,
    title: 'Уютный домик в сосновом бору',
    location: 'Московская область',
    price: 5000,
    rooms: 2,
    distance: 0.5,
    image: 'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/1c07a356-cac4-42fb-921d-b3bb5afa560a.jpg',
    amenities: ['Wi-Fi', 'Камин', 'Терраса', 'Барбекю'],
  },
  {
    id: 2,
    title: 'Современный коттедж у леса',
    location: 'Ленинградская область',
    price: 8500,
    rooms: 3,
    distance: 1,
    image: 'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/f0dd0a55-5774-41a2-a5bd-ca6cf0bc9a9e.jpg',
    amenities: ['Wi-Fi', 'Сауна', 'Парковка', 'Кухня'],
  },
  {
    id: 3,
    title: 'Лесная дача с камином',
    location: 'Тверская область',
    price: 4000,
    rooms: 2,
    distance: 2,
    image: 'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/1c07a356-cac4-42fb-921d-b3bb5afa560a.jpg',
    amenities: ['Камин', 'Терраса', 'Барбекю'],
  },
  {
    id: 4,
    title: 'Просторный дом в еловом лесу',
    location: 'Владимирская область',
    price: 6500,
    rooms: 4,
    distance: 0.3,
    image: 'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/f0dd0a55-5774-41a2-a5bd-ca6cf0bc9a9e.jpg',
    amenities: ['Wi-Fi', 'Кухня', 'Парковка', 'Терраса', 'Бассейн'],
  },
  {
    id: 5,
    title: 'Таёжный дом с сауной',
    location: 'Калужская область',
    price: 7000,
    rooms: 3,
    distance: 1.5,
    image: 'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/1c07a356-cac4-42fb-921d-b3bb5afa560a.jpg',
    amenities: ['Сауна', 'Камин', 'Wi-Fi', 'Парковка'],
  },
  {
    id: 6,
    title: 'Экологичный коттедж',
    location: 'Ярославская область',
    price: 9000,
    rooms: 4,
    distance: 0.8,
    image: 'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/f0dd0a55-5774-41a2-a5bd-ca6cf0bc9a9e.jpg',
    amenities: ['Wi-Fi', 'Кухня', 'Сауна', 'Бассейн', 'Терраса'],
  },
];

const blogPosts = [
  {
    id: 1,
    title: 'Как выбрать идеальное жильё у леса',
    excerpt: 'Расскажем о ключевых критериях выбора жилья для отдыха на природе',
    date: '15 января 2024',
    image: 'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/45126bf0-58d2-4265-9bc9-244c6ac2f398.jpg',
  },
  {
    id: 2,
    title: 'Преимущества отдыха в лесу зимой',
    excerpt: 'Зимний лес — это особая атмосфера и множество активностей',
    date: '10 января 2024',
    image: 'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/1c07a356-cac4-42fb-921d-b3bb5afa560a.jpg',
  },
  {
    id: 3,
    title: 'Что взять с собой на загородный отдых',
    excerpt: 'Полный список необходимых вещей для комфортного пребывания',
    date: '5 января 2024',
    image: 'https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/f0dd0a55-5774-41a2-a5bd-ca6cf0bc9a9e.jpg',
  },
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState('home');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = mockProperties.filter((property) => {
      const priceMatch =
        property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
      const roomsMatch = filters.rooms.length === 0 || filters.rooms.includes(property.rooms);
      const distanceMatch = property.distance <= filters.maxDistance;
      const amenitiesMatch =
        filters.amenities.length === 0 ||
        filters.amenities.every((amenity) => property.amenities.includes(amenity));

      return priceMatch && roomsMatch && distanceMatch && amenitiesMatch;
    });

    setFilteredProperties(filtered);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <section
              className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://cdn.poehali.dev/projects/5af5de01-93d0-4c21-accd-4e3331a80316/files/45126bf0-58d2-4265-9bc9-244c6ac2f398.jpg')`,
              }}
            >
              <div className="text-center text-white z-10 px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                  Найдите свой дом у леса
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  Отдохните от городской суеты в окружении природы
                </p>
                <Button size="lg" className="text-lg px-8" onClick={() => setCurrentPage('catalog')}>
                  Смотреть каталог
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </section>

            <section className="container mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold text-center mb-12">Популярные предложения</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProperties.slice(0, 3).map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" onClick={() => setCurrentPage('catalog')}>
                  Смотреть все предложения
                </Button>
              </div>
            </section>

            <section className="bg-secondary py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="text-center p-6">
                    <div className="flex justify-center mb-4">
                      <Icon name="Trees" size={48} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Близость к природе</h3>
                    <p className="text-muted-foreground">
                      Все объекты расположены в непосредственной близости от леса
                    </p>
                  </Card>
                  <Card className="text-center p-6">
                    <div className="flex justify-center mb-4">
                      <Icon name="Shield" size={48} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Проверенные объекты</h3>
                    <p className="text-muted-foreground">
                      Мы проверяем каждый дом перед публикацией
                    </p>
                  </Card>
                  <Card className="text-center p-6">
                    <div className="flex justify-center mb-4">
                      <Icon name="Heart" size={48} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Легкое бронирование</h3>
                    <p className="text-muted-foreground">
                      Простой процесс бронирования и быстрая поддержка
                    </p>
                  </Card>
                </div>
              </div>
            </section>
          </>
        );

      case 'catalog':
        return (
          <section className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Каталог жилья</h1>
            <FilterBar onFilterChange={handleFilterChange} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">
                  По вашему запросу ничего не найдено. Попробуйте изменить фильтры.
                </p>
              </div>
            )}
          </section>
        );

      case 'terms':
        return (
          <section className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Условия аренды</h1>
            <div className="space-y-6 text-lg">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Icon name="FileCheck" size={24} className="mr-2 text-primary" />
                  Бронирование
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Бронирование осуществляется через наш сайт. После подтверждения бронирования
                  арендодателем, вы получите контактные данные и детали заезда на указанную
                  электронную почту.
                </p>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Icon name="CreditCard" size={24} className="mr-2 text-primary" />
                  Оплата
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оплата производится напрямую арендодателю при заезде или по предоплате согласно
                  условиям конкретного объекта. Способы оплаты указаны в описании каждого объекта.
                </p>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Icon name="Calendar" size={24} className="mr-2 text-primary" />
                  Отмена бронирования
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Условия отмены зависят от политики конкретного арендодателя. Обычно при отмене
                  за 7 дней до заезда возвращается 100% оплаты, за 3 дня — 50%.
                </p>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Icon name="Users" size={24} className="mr-2 text-primary" />
                  Правила проживания
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Соблюдайте правила объекта, указанные в описании. Бережно относитесь к имуществу,
                  соблюдайте тишину после 23:00, убирайте за собой мусор.
                </p>
              </Card>
            </div>
          </section>
        );

      case 'blog':
        return (
          <section className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Блог</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                    <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="link" className="p-0">
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );

      case 'register':
        return (
          <section className="container mx-auto px-4 py-12 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Регистрация арендодателя</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Заполните форму, и мы свяжемся с вами для публикации вашего объекта
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">Имя и фамилия</Label>
                  <Input id="name" placeholder="Иван Иванов" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="ivan@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                </div>
                <div>
                  <Label htmlFor="property-title">Название объекта</Label>
                  <Input id="property-title" placeholder="Уютный домик у леса" />
                </div>
                <div>
                  <Label htmlFor="location">Местоположение</Label>
                  <Input id="location" placeholder="Московская область" />
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    placeholder="Расскажите о вашем объекте..."
                    rows={5}
                  />
                </div>
                <Button className="w-full" size="lg">
                  Отправить заявку
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </section>
        );

      case 'profile':
        return (
          <section className="container mx-auto px-4 py-12 max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Вход</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Войдите в свой аккаунт для управления бронированиями
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="ivan@example.com" />
                </div>
                <div>
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full" size="lg">
                  Войти
                  <Icon name="LogIn" size={18} className="ml-2" />
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Нет аккаунта?{' '}
                  <button className="text-primary font-semibold">Зарегистрироваться</button>
                </p>
              </CardContent>
            </Card>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
}