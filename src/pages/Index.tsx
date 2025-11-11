import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { addDays, format, isAfter, isBefore, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';

const Index = () => {
  const [selectedSection, setSelectedSection] = useState('hero');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setSelectedSection(sectionId);
  };

  const portfolioCategories = [
    { name: 'Свадьбы', count: 45, image: 'https://cdn.poehali.dev/projects/4dc93e66-bc19-432d-9aee-0db241d536d5/files/1f231bb7-cd9d-4267-9cd7-71d324527150.jpg' },
    { name: 'Портреты', count: 89, image: 'https://cdn.poehali.dev/projects/4dc93e66-bc19-432d-9aee-0db241d536d5/files/8c488b9d-520e-4bb8-a4d6-1b3e209520e8.jpg' },
    { name: 'Love Story', count: 34, image: 'https://cdn.poehali.dev/projects/4dc93e66-bc19-432d-9aee-0db241d536d5/files/fad2dbee-7825-4bc9-bdd4-8ebd09b46548.jpg' },
  ];

  const services = [
    { 
      icon: 'Heart', 
      title: 'Свадебная съемка', 
      description: 'Полный день съемки с двумя фотографами', 
      price: 'от 50 000 ₽',
      duration: '8-10 часов'
    },
    { 
      icon: 'Camera', 
      title: 'Портретная фотосессия', 
      description: 'Индивидуальная или семейная съемка', 
      price: 'от 8 000 ₽',
      duration: '1-2 часа'
    },
    { 
      icon: 'Users', 
      title: 'Love Story', 
      description: 'Романтическая фотосессия для пары', 
      price: 'от 12 000 ₽',
      duration: '2-3 часа'
    },
    { 
      icon: 'Sparkles', 
      title: 'Студийная съемка', 
      description: 'Профессиональная студия с реквизитом', 
      price: 'от 6 000 ₽',
      duration: '1 час'
    },
  ];

  const testimonials = [
    {
      name: 'Анна и Михаил',
      role: 'Свадебная съемка',
      text: 'Невероятные эмоции в каждом кадре! Мы пересматриваем фотографии каждый день и снова погружаемся в атмосферу нашего праздника.',
      rating: 5
    },
    {
      name: 'Елена Соколова',
      role: 'Портретная съемка',
      text: 'Профессионал своего дела! Помог расслабиться перед камерой, результат превзошел все ожидания.',
      rating: 5
    },
    {
      name: 'Дмитрий и Ольга',
      role: 'Love Story',
      text: 'Романтичная атмосфера, красивые локации и невероятный результат. Спасибо за память на всю жизнь!',
      rating: 5
    },
  ];

  const availableSlots = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleSlotClick = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      const allSlots = [...selectedSlots, slot].sort();
      setSelectedSlots(allSlots);
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || selectedSlots.length === 0) {
      toast.error('Выберите дату и время');
      return;
    }
    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    setBookingDialogOpen(false);
    setSelectedSlots([]);
    setSelectedDate(undefined);
  };

  const minDate = addDays(new Date(), 1);
  const maxDate = addDays(new Date(), 14);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">PhotoArt</h1>
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="text-sm font-medium hover:text-primary transition-colors">
              Портфолио
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
              Обо мне
            </button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium hover:text-primary transition-colors">
              Отзывы
            </button>
            <button onClick={() => scrollToSection('booking')} className="text-sm font-medium hover:text-primary transition-colors">
              Бронирование
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </div>
          <Button onClick={() => scrollToSection('booking')} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Записаться
          </Button>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
              Профессиональная фотография
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Сохраняю <span className="gradient-text">эмоции</span> в каждом кадре
            </h2>
            <p className="text-lg text-muted-foreground">
              Создаю уникальные истории через объектив. Свадьбы, портреты, love story — запечатлею ваши самые важные моменты.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => scrollToSection('booking')} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Забронировать съемку
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('portfolio')}>
                Смотреть работы
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-muted-foreground">Счастливых клиентов</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">5 лет</div>
                <div className="text-sm text-muted-foreground">Опыта</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">10k+</div>
                <div className="text-sm text-muted-foreground">Фотографий</div>
              </div>
            </div>
          </div>
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <img 
              src="https://cdn.poehali.dev/projects/4dc93e66-bc19-432d-9aee-0db241d536d5/files/fad2dbee-7825-4bc9-bdd4-8ebd09b46548.jpg"
              alt="Фотограф"
              className="relative rounded-3xl shadow-2xl hover-scale w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0">
              Портфолио
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Мои работы</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Каждая фотосессия уникальна. Посмотрите примеры моих работ в разных жанрах.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioCategories.map((category, index) => (
              <Card key={index} className="group overflow-hidden hover-scale cursor-pointer border-2 hover:border-primary transition-all">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} фотосессий</p>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white border-0">
                    Смотреть
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl blur-2xl" />
              <img 
                src="https://cdn.poehali.dev/projects/4dc93e66-bc19-432d-9aee-0db241d536d5/files/dd83adda-1538-4b15-9ca9-0869583ae49e.jpg"
                alt="Обо мне"
                className="relative rounded-3xl shadow-2xl hover-scale w-full h-[500px] object-cover"
              />
            </div>
            <div className="space-y-6 animate-slide-up">
              <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
                Обо мне
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold">
                Привет! Я <span className="gradient-text">Александра</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  Профессиональный фотограф с 5-летним опытом. Моя страсть — запечатлевать искренние эмоции и создавать истории, которые хочется пересматривать снова и снова.
                </p>
                <p>
                  Начинала путь с простой камеры и большой мечты. Сегодня за плечами сотни свадеб, портретных и семейных фотосессий. Каждый проект для меня уникален — я изучаю характер клиента, его историю, чтобы создать по-настоящему личные кадры.
                </p>
                <p>
                  Работаю в светлом и воздушном стиле, люблю естественный свет и живые эмоции. Верю, что лучшие фотографии получаются, когда люди чувствуют себя комфортно и могут быть собой.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-muted rounded-xl">
                  <Icon name="Award" size={32} className="text-primary mb-2" />
                  <div className="font-semibold">Награды</div>
                  <div className="text-sm text-muted-foreground">Победитель конкурсов</div>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <Icon name="BookOpen" size={32} className="text-primary mb-2" />
                  <div className="font-semibold">Обучение</div>
                  <div className="text-sm text-muted-foreground">Постоянно развиваюсь</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0">
              Услуги
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что я предлагаю</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Профессиональная фотосъемка для любого случая. Индивидуальный подход к каждому клиенту.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="group hover-scale border-2 hover:border-primary transition-all">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary group-hover:to-accent transition-all">
                      <Icon name={service.icon} size={28} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold gradient-text">{service.price}</div>
                          <div className="text-sm text-muted-foreground">{service.duration}</div>
                        </div>
                        <Button variant="outline" className="hover:bg-primary hover:text-white">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0">
              Отзывы
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что говорят клиенты</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мне важно мнение каждого клиента. Читайте отзывы тех, кто уже доверил мне свои важные моменты.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-scale border-2 hover:border-primary transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="text-secondary fill-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0">
              Бронирование
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Запишитесь на фотосессию</h2>
            <p className="text-lg text-muted-foreground">
              Выберите удобную дату и время. Я свяжусь с вами для подтверждения.
            </p>
          </div>

          <Card className="border-2">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Выберите дату</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => 
                      isBefore(startOfDay(date), minDate) || 
                      isAfter(startOfDay(date), maxDate) ||
                      date.getDay() === 0 || date.getDay() === 6
                    }
                    locale={ru}
                    className="rounded-md border"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    <Icon name="Info" size={16} className="inline mr-1" />
                    Бронирование доступно с завтрашнего дня на 14 дней вперед
                  </p>
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-4 block">Доступное время</Label>
                  {!selectedDate ? (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      <div className="text-center">
                        <Icon name="Calendar" size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Сначала выберите дату</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedSlots.includes(slot) ? 'default' : 'outline'}
                            className={selectedSlots.includes(slot) ? 'bg-gradient-to-r from-primary to-accent' : ''}
                            onClick={() => handleSlotClick(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>

                      {selectedSlots.length > 0 && (
                        <div className="bg-muted p-4 rounded-lg mb-4">
                          <p className="text-sm font-medium mb-2">Выбрано слотов: {selectedSlots.length}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedSlots[0]} — {selectedSlots[selectedSlots.length - 1]}
                          </p>
                        </div>
                      )}

                      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                            disabled={selectedSlots.length === 0}
                          >
                            <Icon name="Check" size={20} className="mr-2" />
                            Забронировать
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Подтверждение бронирования</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleBooking} className="space-y-4">
                            <div>
                              <Label htmlFor="name">Ваше имя</Label>
                              <Input id="name" placeholder="Иван Иванов" required />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" placeholder="ivan@example.com" required />
                            </div>
                            <div>
                              <Label htmlFor="phone">Телефон</Label>
                              <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                            </div>
                            <div>
                              <Label htmlFor="message">Комментарий</Label>
                              <Textarea id="message" placeholder="Расскажите о пожеланиях к фотосессии" />
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                              <p className="text-sm font-medium">Детали бронирования:</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {selectedDate && format(selectedDate, 'd MMMM yyyy', { locale: ru })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {selectedSlots[0]} — {selectedSlots[selectedSlots.length - 1]} ({selectedSlots.length} {selectedSlots.length === 1 ? 'час' : 'часа'})
                              </p>
                            </div>
                            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                              Отправить заявку
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white border-0">
              Контакты
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь со мной</h2>
            <p className="text-lg text-muted-foreground">
              Готова ответить на все вопросы и обсудить детали вашей фотосессии.
            </p>
          </div>
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Телефон</div>
                      <a href="tel:+79991234567" className="text-muted-foreground hover:text-primary transition-colors">
                        +7 (999) 123-45-67
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href="mailto:photo@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                        photo@example.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <Icon name="Instagram" size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Instagram</div>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        @photoart_studio
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Локация</div>
                      <div className="text-muted-foreground">Москва и Московская область</div>
                    </div>
                  </div>
                </div>
                <div>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="contact-name">Ваше имя</Label>
                      <Input id="contact-name" placeholder="Иван Иванов" />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="ivan@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Сообщение</Label>
                      <Textarea id="contact-message" placeholder="Расскажите о своих пожеланиях" rows={4} />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить сообщение
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-2">PhotoArt</h3>
              <p className="text-sm text-muted-foreground">Профессиональная фотография с душой</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Send" size={20} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Mail" size={20} />
              </Button>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © 2024 PhotoArt. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;