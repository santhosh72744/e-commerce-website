import { Controller, Get } from '@nestjs/common';
import { NavbarService } from './navbar.service';

@Controller('navbar')
export class NavbarController {
  constructor(private readonly navbarService: NavbarService) {}

  @Get()
  getAll() {
    return this.navbarService.findAll();
  }
}
