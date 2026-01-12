import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Trees" size={28} />
              <span className="text-xl font-bold">ЛесДом</span>
            </div>
            <p className="text-sm opacity-90">
              Найдите идеальное жильё рядом с лесом для отдыха на природе
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100">Дома и коттеджи</a></li>
              <li><a href="#" className="hover:opacity-100">Дачи</a></li>
              <li><a href="#" className="hover:opacity-100">Квартиры</a></li>
              <li><a href="#" className="hover:opacity-100">Глэмпинги</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100">О нас</a></li>
              <li><a href="#" className="hover:opacity-100">Условия аренды</a></li>
              <li><a href="#" className="hover:opacity-100">Блог</a></li>
              <li><a href="#" className="hover:opacity-100">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Арендодателям</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100">Добавить объект</a></li>
              <li><a href="#" className="hover:opacity-100">Панель управления</a></li>
              <li><a href="#" className="hover:opacity-100">Помощь</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-75">© 2024 ЛесДом. Все права защищены.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-75">
              <Icon name="Instagram" size={20} />
            </a>
            <a href="#" className="hover:opacity-75">
              <Icon name="Facebook" size={20} />
            </a>
            <a href="#" className="hover:opacity-75">
              <Icon name="Twitter" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
