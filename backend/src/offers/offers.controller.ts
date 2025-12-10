import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  getAll(@Query('active') active?: string) {
    const activeOnly = active === undefined ? true : active !== 'false';
    return this.offersService.findAll(activeOnly);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  // Admin endpoints (no auth here yet)
  @Post()
  create(@Body() body: any) {
    return this.offersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.offersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offersService.remove(id);
  }
}
