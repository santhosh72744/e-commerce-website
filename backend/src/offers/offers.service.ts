import { Injectable } from '@nestjs/common';

export type Offer = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string; // path under frontend/public or fully-qualified URL
  cta?: string;
  active?: boolean;
};

@Injectable()
export class OffersService {
  // in-memory sample data (replace with DB later)
 private offers: Offer[] = [
  {
    id: '1',
    title: 'Festive Offer',
    subtitle: 'Up to 30% off on pooja sets',
    image: 'https://picsum.photos/1200/500?random=1',
    cta: '/shop?offer=festive',
    active: true,
  },
  {
    
    id: '2',
    title: 'Incense Specials',
    subtitle: 'Buy 2 Get 1 Free',
    image: 'https://picsum.photos/1200/500?random=2',
    cta: '/shop?category=incense',
    active: true,
  },
  {
    id: '3',
    title: 'Puja Essentials',
    subtitle: 'Flat ₹99 kits',
    image: 'https://picsum.photos/1200/500?random=3',
    cta: '/shop?category=essentials',
    active: true,
  },
];


  findAll(activeOnly = true): Offer[] {
    return activeOnly ? this.offers.filter(o => o.active) : [...this.offers];
  }

  findOne(id: string): Offer | undefined {
    return this.offers.find(o => o.id === id);
  }

  create(offer: Omit<Offer, 'id'> & { id?: string }): Offer {
    const id = offer.id ?? String(Date.now());
    const newOffer: Offer = { id, ...offer };
    this.offers.push(newOffer);
    return newOffer;
  }

  update(id: string, patch: Partial<Offer>): Offer {
    const idx = this.offers.findIndex(o => o.id === id);
    if (idx === -1) throw new Error('Not found');
    this.offers[idx] = { ...this.offers[idx], ...patch };
    return this.offers[idx];
  }

  remove(id: string) {
    this.offers = this.offers.filter(o => o.id !== id);
    return { success: true };
  }
}
