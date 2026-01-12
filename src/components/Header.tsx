import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Главная', page: 'home', icon: 'Home' },
    { label: 'Каталог', page: 'catalog', icon: 'Grid3x3' },
    { label: 'Условия', page: 'terms', icon: 'FileText' },
    { label: 'Блог', page: 'blog', icon: 'BookOpen' },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Icon name="Trees" size={32} className="text-primary" />
            <span className="text-2xl font-bold text-primary">ЛесДом</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`flex items-center space-x-1 transition-colors ${
                  currentPage === item.page
                    ? 'text-primary font-semibold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" onClick={() => onNavigate('profile')}>
              <Icon name="User" size={18} className="mr-2" />
              Войти
            </Button>
            <Button onClick={() => onNavigate('register')}>
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить жильё
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full py-3 px-2 ${
                  currentPage === item.page ? 'text-primary font-semibold' : 'text-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" onClick={() => onNavigate('profile')}>
                <Icon name="User" size={18} className="mr-2" />
                Войти
              </Button>
              <Button onClick={() => onNavigate('register')}>
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить жильё
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
