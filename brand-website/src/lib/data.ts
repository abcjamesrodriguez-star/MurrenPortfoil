import { NavItem, NewsItem, ProductItem, LocationItem, FooterLinkGroup, SocialLink } from '@/types';
import image1 from '@/assets/Mockup.jpeg';
import image2 from '@/assets/Mockup.jpeg';
export const navigationLinks: NavItem[] = [
  { label: 'INICIO', href: '/' },
  { label: 'COLECCIONES', href: '/colecciones' },
  {
    label: 'CATEGORÍAS',
    href: '/categorias',
    dropdown: [
      { label: 'Chaquetas Jean', href: '/categorias/chaquetas-jean' },
      { label: 'Cuerinas', href: '/categorias/cuerinas' },
      { label: 'Bolsos', href: '/categorias/bolsos' },
    ],
  },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACTO', href: '/contacto' },
];

export const newsData: NewsItem[] = [
  {
    id: 'news-1',
    tag: 'NEW DROP',
    title: 'ILLUSION CHROME',
    status: 'YA DISPONIBLE',
    image: image1,
  },
  {
    id: 'news-2',
    tag: 'EVENTO',
    title: 'POP UP EXPERIENCE',
    status: '24 / 06 / 2024',
    image: image2,
  },
  {
    id: 'news-3',
    tag: 'COLAB',
    title: 'MIF X UNKNOWN',
    status: 'COMING SOON',
    image: image1,
  },
];

export const collectionData: ProductItem[] = [
  { id: 'prod-1', name: 'CHROME HOODIE', season: 'SS24', image: image1 },
  { id: 'prod-2', name: 'LIQUID METAL JACKET', season: 'FW23', image: image2 },
  { id: 'prod-3', name: 'HYPER REFLECTIVE TEE', season: 'SS24', image: image1 },
  { id: 'prod-4', name: 'NEBULA CARGO PANTS', season: 'FW23', image: image2 },
  { id: 'prod-5', name: 'CHROME CAP', season: 'SS24', image: image1 },
];

export const locationsData: LocationItem[] = [
  {
    id: 'loc-1',
    type: 'FLAGSHIP STORE',
    addressLine1: 'Calle 85 #12-42',
    city: 'Bogotá, Colombia',
  },
  {
    id: 'loc-2',
    type: 'MIF POP UP',
    addressLine1: 'Centro Comercial Andino',
    addressLine2: 'Local 2-45',
    city: 'Bogotá, Colombia',
  },
  {
    id: 'loc-3',
    type: 'MIF POINT',
    addressLine1: 'Calle 50 #70-21',
    city: 'Medellín, Colombia',
  },
];

export const footerCategories: FooterLinkGroup = {
  title: 'CATEGORÍAS',
  links: [
    { label: 'Camisetas', href: '/camisetas' },
    { label: 'Hoodies', href: '/hoodies' },
    { label: 'Pantalones', href: '/pantalones' },
    { label: 'Chaquetas', href: '/chaquetas' },
    { label: 'Accesorios', href: '/accesorios' },
    { label: 'Colecciones', href: '/colecciones' },
  ],
};

export const footerInformation: FooterLinkGroup = {
  title: 'INFORMACIÓN',
  links: [
    { label: 'Nosotros', href: '/about' },
    { label: 'Envíos', href: '/envios' },
    { label: 'Cambios & Devoluciones', href: '/cambios' },
    { label: 'Términos & Condiciones', href: '/terminos' },
    { label: 'Política de Privacidad', href: '/privacidad' },
  ],
};

export const socialLinks: SocialLink[] = [
  { platform: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { platform: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
  { platform: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { platform: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
];
