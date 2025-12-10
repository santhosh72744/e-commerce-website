import { Injectable } from '@nestjs/common';

@Injectable()
export class NavbarService {
  findAll() {
    return [
      { id: '1', title: 'Home', href: '/' },
      { id: '2', title: 'Shop', href: '/shop' },
      { id: '3', title: 'Contact', href: '/contact' },
    ];
  }
}
