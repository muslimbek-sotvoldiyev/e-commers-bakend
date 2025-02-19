import { PartialType } from '@nestjs/swagger';
import { CreateCardInfoDto } from './create-card-info.dto';

export class UpdateCardInfoDto extends PartialType(CreateCardInfoDto) {}
