import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginUserDto } from './dto/login-user.dto.js';
import { Role, RolesGuard } from '../common/guards/role.guard.js';
import { Roles } from '../common/guards/role.decorator.js';
import { AuthGuardd } from '../common/guards/auth.guard.js';
const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
    callback(null, filename);
  },
});

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage,
    }),
  )
  async create(
    @UploadedFile() photo: any,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (!photo) {
      throw new BadRequestException('Fayl yuklanmadi');
    }
    createUserDto.photo = `static/${photo.filename}`;

    const savedUser = await this.usersService.create(createUserDto);

    return {
      savedUser,
    };
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Get('mee')
  GetMee(@Req() req) {
    return this.usersService.findOne(+req.user.dataValues.id);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.usersService.refreshToken(body.refreshToken);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(AuthGuardd, RolesGuard)
  @Patch('')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage,
    }),
  )
  async update(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() photo: any,
  ) {
    if (photo) {
      updateUserDto.photo = `/static/${photo.filename}`;
    }

    return this.usersService.update(+req.user.dataValues.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
