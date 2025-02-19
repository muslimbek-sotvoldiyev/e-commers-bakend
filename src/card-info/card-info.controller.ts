import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardInfoService } from './card-info.service';
import { CreateCardInfoDto } from './dto/create-card-info.dto';
import { UpdateCardInfoDto } from './dto/update-card-info.dto';

@Controller('card-info')
export class CardInfoController {
  constructor(private readonly cardInfoService: CardInfoService) {}

  @Post()
  create(@Body() createCardInfoDto: CreateCardInfoDto) {
    return this.cardInfoService.create(createCardInfoDto);
  }

  @Get()
  findAll() {
    return this.cardInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardInfoDto: UpdateCardInfoDto) {
    return this.cardInfoService.update(+id, updateCardInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardInfoService.remove(+id);
  }
}
