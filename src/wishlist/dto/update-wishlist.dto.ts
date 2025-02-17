import { PartialType } from '@nestjs/swagger';
import { CreateWishlistDto } from './create-wishlist.dto.js';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {}
