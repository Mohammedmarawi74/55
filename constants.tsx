
import { Theme, Expert } from './types';

export const INITIAL_EXPERTS: Expert[] = [
  {
    id: '1',
    name: 'أحمد محمود',
    specialty: 'محلل أسواق مالية',
    experience: '١٠ سنوات',
    image: 'https://picsum.photos/seed/expert1/400/500',
    bio: 'خبير في تحليل الاتجاهات الاقتصادية الكبرى والاستثمار طويل الأمد.',
    linkedin: '#'
  },
  {
    id: '2',
    name: 'سارة خالد',
    specialty: 'مستشارة استثمار',
    experience: '٨ سنوات',
    image: 'https://picsum.photos/seed/expert2/400/500',
    bio: 'متخصصة في إدارة المحافظ الاستثمارية وتوزيع الأصول الاستراتيجي.',
    linkedin: '#'
  },
  {
    id: '3',
    name: 'محمد العلي',
    specialty: 'خبير تقنيات مالية',
    experience: '١٢ سنة',
    image: 'https://picsum.photos/seed/expert3/400/500',
    bio: 'رائد في مجال الفينتيك وتطبيقات الذكاء الاصطناعي في التداول.',
    linkedin: '#'
  }
];

export const THEMES: Theme[] = [
  {
    id: 'radar-dark',
    name: 'رادار داكن',
    bgGradient: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
    cardBg: 'rgba(30, 41, 59, 0.7)',
    accentColor: '#10b981',
    textColor: '#ffffff',
    secondaryTextColor: '#94a3b8'
  },
  {
    id: 'luxury-gold',
    name: 'ذهبي فاخر',
    bgGradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    accentColor: '#fbbf24',
    textColor: '#ffffff',
    secondaryTextColor: '#d1d5db'
  },
  {
    id: 'modern-blue',
    name: 'أزرق عصري',
    bgGradient: 'linear-gradient(to bottom, #002b5b 0%, #001c3d 100%)',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    accentColor: '#38bdf8',
    textColor: '#ffffff',
    secondaryTextColor: '#cbd5e1'
  }
];

export const AVAILABLE_LOGOS = [
  { id: 'logo-1', path: '/logooo/logo-1.png', name: 'شعار 1' },
  { id: 'logo-2', path: '/logooo/logo-2.png', name: 'شعار 2' },
  { id: 'logo-3', path: '/logooo/logo-3.png', name: 'شعار 3' },
  { id: 'logo-4', path: '/logooo/logo-4.png', name: 'شعار 4' }
];
