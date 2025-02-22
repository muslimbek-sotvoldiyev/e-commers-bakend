import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '../common/config/config.service.js';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Users } from './users.model.js';
import { LoginUserDto } from './dto/login-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly userModel: typeof Users,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      const existingUser = await this.userModel.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException(
          'Bu email bilan foydalanuvchi allaqachon mavjud.',
        );
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const { id, email } = user;
      const accessToken = this.generateAccessToken({ email, id });
      const refreshToken = this.generateRefreshToken({ email, id });

      const { password, ...userWithoutPassword } = user.get({ plain: true });

      return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Foydalanuvchi yaratishda xatolik: ${error.message}`);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.FindByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user['dataValues'].password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.generateAccessToken({
      email: user['dataValues'].email,
      id: user['dataValues'].id,
    });
    const refreshToken = this.generateRefreshToken({
      email: user['dataValues'].email,
      id: user['dataValues'].id,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  findAll() {
    const data = this.userModel.findAll();
    if (data) {
      return data;
    }
    return "malumot yo'q";
  }
  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        this.configService.get('JWT_REFRESH_SECRET'),
      );

      const user = await this.userModel.findByPk(decoded.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const accessToken = this.generateAccessToken({
        email: user['dataValues'].email,
        id: user['dataValues'].id,
      });

      return {
        accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  findOne(id: number) {
    const data = this.userModel.findByPk(id);
    if (data) {
      return data;
    }
    return "malumot yo'q";
  }

  FindByEmail(email) {
    const data = this.userModel.findOne({ where: { email } });
    if (data) {
      return data;
    }
    return "malumot yo'q";
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    const data = this.userModel.destroy({ where: { id } });
    if (data) {
      return data;
    }
    return "malumot yo'q";
  }

  private generateAccessToken(data: { email: string; id: number }) {
    return jwt.sign(data, this.configService.get('JWT_ACCESS_SECRET'), {
      expiresIn: '14h',
    });
  }

  private generateRefreshToken(data: { email: string; id: number }) {
    return jwt.sign(data, this.configService.get('JWT_REFRESH_SECRET'), {
      expiresIn: '24h',
    });
  }
}
