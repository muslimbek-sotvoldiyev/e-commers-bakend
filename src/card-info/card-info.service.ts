import { Injectable } from '@nestjs/common';
import { CreateCardInfoDto } from './dto/create-card-info.dto';
import { UpdateCardInfoDto } from './dto/update-card-info.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CardInfo } from './card-info.model';

@Injectable()
export class CardInfoService {
  constructor(@InjectModel(CardInfo) private readonly: typeof CardInfo) {}
  create(createCardInfoDto: CreateCardInfoDto) {
    return 'This action adds a new cardInfo';
  }

  findAll() {
    return `This action returns all cardInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardInfo`;
  }

  update(id: number, updateCardInfoDto: UpdateCardInfoDto) {
    return `This action updates a #${id} cardInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardInfo`;
  }
}
