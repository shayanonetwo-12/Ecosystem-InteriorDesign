export type Room = {
  id: string;
  title: string;
  category: string;
  style: string;
  image: string;
  description: string;
  designer: string;
  area: string;
  location: string;
};

export const categories = [
  'All', 'Modern', 'Minimal', 'Luxury', 'Japanese', 'Industrial',
  'Scandinavian', 'Smart Home', 'Bedroom', 'Kitchen', 'Living Room',
  'Bathroom', 'Office', 'Villa', 'Studio',
];

export const rooms: Room[] = [
  {
    id: 'r1',
    title: 'Serene Living Pavilion',
    category: 'Living Room',
    style: 'Modern',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A sun-drenched living space where soft linen meets warm oak, framed by floor-to-ceiling windows that dissolve the boundary between inside and out.',
    designer: 'Amara Lindqvist',
    area: '48 m²',
    location: 'Copenhagen, DK',
  },
  {
    id: 'r2',
    title: 'Tranquil Tea Room',
    category: 'Living Room',
    style: 'Japanese',
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Inspired by traditional Japanese interiors — low furniture, natural materials, and a quiet interplay of shadow and light.',
    designer: 'Kenji Nakamura',
    area: '32 m²',
    location: 'Kyoto, JP',
  },
  {
    id: 'r3',
    title: 'Ivory Bedroom Suite',
    category: 'Bedroom',
    style: 'Minimal',
    image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A restful sanctuary in warm ivory tones, layered textiles, and a single statement pendant that casts a gentle glow.',
    designer: 'Sofia Marchetti',
    area: '26 m²',
    location: 'Milan, IT',
  },
  {
    id: 'r4',
    title: 'Marble Culinary Atelier',
    category: 'Kitchen',
    style: 'Luxury',
    image: 'https://images.pexels.com/photos/7587000/pexels-photo-7587000.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A chef\'s kitchen dressed in honed marble, brushed brass, and integrated appliances that disappear into the cabinetry.',
    designer: 'Elena Vasquez',
    area: '38 m²',
    location: 'Barcelona, ES',
  },
  {
    id: 'r5',
    title: 'Nordic Reading Nook',
    category: 'Living Room',
    style: 'Scandinavian',
    image: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Pale woods, wool throws, and a sculptural armchair positioned to catch the afternoon light just so.',
    designer: 'Lars Andersen',
    area: '18 m²',
    location: 'Oslo, NO',
  },
  {
    id: 'r6',
    title: 'Loft Study in Raw Concrete',
    category: 'Office',
    style: 'Industrial',
    image: 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Exposed structure meets warm leather and task lighting — a focused workspace with quiet confidence.',
    designer: 'Marcus Webb',
    area: '22 m²',
    location: 'Berlin, DE',
  },
  {
    id: 'r7',
    title: 'Garden Bath Retreat',
    category: 'Bathroom',
    style: 'Luxury',
    image: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A freestanding soak tub beside a living green wall, where steam and sunlight mingle through slatted teak.',
    designer: 'Priya Anand',
    area: '16 m²',
    location: 'Goa, IN',
  },
  {
    id: 'r8',
    title: 'Hillside Villa Atrium',
    category: 'Villa',
    style: 'Modern',
    image: 'https://images.pexels.com/photos/1080724/pexels-photo-1080724.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A double-height atrium with a sculptural staircase, indoor plants, and a view that stretches to the horizon.',
    designer: 'Olivia Hartman',
    area: '120 m²',
    location: 'Mallorca, ES',
  },
  {
    id: 'r9',
    title: 'Soft Minimal Studio',
    category: 'Studio',
    style: 'Minimal',
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'One room, infinite calm — a studio where every object earns its place through function and quiet beauty.',
    designer: 'Yuki Tanaka',
    area: '34 m²',
    location: 'Tokyo, JP',
  },
  {
    id: 'r10',
    title: 'Smart Living Console',
    category: 'Smart Home',
    style: 'Modern',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Ambient sensors, voice-controlled lighting, and hidden displays — technology that serves the senses, quietly.',
    designer: 'David Chen',
    area: '42 m²',
    location: 'Singapore, SG',
  },
  {
    id: 'r11',
    title: 'Terracotta Dining Hall',
    category: 'Living Room',
    style: 'Luxury',
    image: 'https://images.pexels.com/photos/7587121/pexels-photo-7587121.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Warm terracotta walls, a long oak table, and pendant clusters that cast honeyed light across evening gatherings.',
    designer: 'Isabella Romano',
    area: '44 m²',
    location: 'Lisbon, PT',
  },
  {
    id: 'r12',
    title: 'Quiet Corner Office',
    category: 'Office',
    style: 'Scandinavian',
    image: 'https://images.pexels.com/photos/10071390/pexels-photo-10071390.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A home office wrapped in pale ash, with a standing desk, acoustic panels, and a window that frames the garden.',
    designer: 'Freja Berg',
    area: '14 m²',
    location: 'Stockholm, SE',
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  { id: 's1', title: 'Residential Design', description: 'Full-home interiors crafted around how you live, rest, and gather.', icon: 'Home' },
  { id: 's2', title: 'Commercial Spaces', description: 'Workplaces and retail environments that elevate brand and productivity.', icon: 'Building2' },
  { id: 's3', title: 'Office Interiors', description: 'Thoughtful layouts, acoustic comfort, and lighting tuned for focus.', icon: 'Briefcase' },
  { id: 's4', title: 'Landscape Design', description: 'Outdoor rooms that extend your interior language into nature.', icon: 'Trees' },
  { id: 's5', title: 'Renovation', description: 'Considered transformations that honor the bones of your space.', icon: 'Hammer' },
  { id: 's6', title: 'Furniture Selection', description: 'Curated pieces from trusted makers, sourced and delivered turnkey.', icon: 'Sofa' },
  { id: 's7', title: 'Lighting Design', description: 'Layered lighting plans that shape mood from morning to night.', icon: 'Lightbulb' },
  { id: 's8', title: '3D Visualization', description: 'Photoreal renders and walkthroughs before a single wall moves.', icon: 'Box' },
];

export type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: 'p1',
    name: 'Starter',
    price: 49,
    period: 'month',
    tagline: 'For exploring your first AI redesign.',
    features: ['3 AI room designs / month', 'Standard 3D walkthrough', 'Furniture suggestions', 'Email support'],
  },
  {
    id: 'p2',
    name: 'Professional',
    price: 149,
    period: 'month',
    tagline: 'For active home projects and revisions.',
    highlighted: true,
    features: ['Unlimited AI designs', 'Photoreal 4K renders', 'Full furniture shopping list', 'Lighting & material plans', '1 consultation / month', 'Priority support'],
  },
  {
    id: 'p3',
    name: 'Enterprise',
    price: 399,
    period: 'month',
    tagline: 'For firms managing multiple properties.',
    features: ['Everything in Professional', 'Multi-user project sharing', 'Real-time designer collaboration', 'Dedicated account manager', 'API access', 'White-label reports'],
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Charlotte Davies',
    role: 'Homeowner, London',
    text: 'I uploaded a photo of my living room and within twenty seconds Ecosystem showed me a version I didn\'t know I wanted. We built it exactly as rendered.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't2',
    name: 'Rafael Mendes',
    role: 'Architect, São Paulo',
    text: 'The 3D walkthroughs have changed how I present to clients. They explore the space before we pour a single foundation. Game changer.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't3',
    name: 'Mei Lin Zhao',
    role: 'Café Owner, Taipei',
    text: 'The AI suggested a layout I would never have tried. My customers now stay longer, and the space photographs beautifully.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
};

export const projects: Project[] = [
  { id: 'pr1', title: 'The Glasshouse', category: 'Villa', image: 'https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg?auto=compress&cs=tinysrgb&w=800', year: '2025' },
  { id: 'pr2', title: 'Atelier 9', category: 'Studio', image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800', year: '2025' },
  { id: 'pr3', title: 'Maison Lumière', category: 'Residential', image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800', year: '2024' },
  { id: 'pr4', title: 'Nordic Pavilion', category: 'Office', image: 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=800', year: '2024' },
];
