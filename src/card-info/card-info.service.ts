import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CardInfo } from './card-info.model';
import { CreateCardInfoDto } from './dto/create-card-info.dto';
import { UpdateCardInfoDto } from './dto/update-card-info.dto';

@Injectable()
export class CardInfoService {
  constructor(
    @InjectModel(CardInfo) private readonly cardInfoModel: typeof CardInfo,
  ) {}

  async create(
    createCardInfoDto: CreateCardInfoDto,
    userId: number,
  ): Promise<CardInfo> {
    return await this.cardInfoModel.create({
      ...(createCardInfoDto as any),
      userId,
    });
  }

  async findAll(userId: number): Promise<CardInfo[]> {
    return await this.cardInfoModel.findAll({
      where: { userId },
    });
  }

  async findOne(userId: number): Promise<CardInfo[]> {
    return await this.cardInfoModel.findAll({
      where: { userId },
    });
  }

  async update(
    userId: number,
    updateCardInfoDto: UpdateCardInfoDto,
  ): Promise<[number, CardInfo[]]> {
    return await this.cardInfoModel.update(updateCardInfoDto as any, {
      where: { userId },
      returning: true,
    });
  }

  async removeOne(userId: number, cardId: number): Promise<number> {
    return await this.cardInfoModel.destroy({ where: { userId, id: cardId } });
  }
}
