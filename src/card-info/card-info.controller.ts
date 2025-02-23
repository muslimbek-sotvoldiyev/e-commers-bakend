import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { CardInfoService } from './card-info.service';
import { CreateCardInfoDto } from './dto/create-card-info.dto';
import { UpdateCardInfoDto } from './dto/update-card-info.dto';
import { AuthGuardd } from '../common/guards/auth.guard';

@Controller('card-info')
@UseGuards(AuthGuardd)
export class CardInfoController {
  constructor(private readonly cardInfoService: CardInfoService) {}

  @Post()
  create(@Body() createCardInfoDto: CreateCardInfoDto, @Req() req) {
    return this.cardInfoService.create(
      createCardInfoDto,
      req.user.dataValues.id,
    );
  }

  @Get()
  findAll(@Req() req) {
    return this.cardInfoService.findAll(req.user.dataValues.id);
  }

  @Get('user')
  findOne(@Req() req) {
    return this.cardInfoService.findOne(req.user.dataValues.id);
  }

  @Patch()
  update(@Body() updateCardInfoDto: UpdateCardInfoDto, @Req() req) {
    return this.cardInfoService.update(
      req.user.dataValues.id,
      updateCardInfoDto,
    );
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: number) {
    return this.cardInfoService.removeOne(req.user.dataValues.id, id);
  }
}
