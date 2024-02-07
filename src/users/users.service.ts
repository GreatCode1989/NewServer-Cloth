import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(loginUserDto: LoginUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        username: loginUserDto.username,
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordValid = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (!passwordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return user as User;
    } catch (error) {
      console.error('Error during login:', error);

      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid credentials');
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async registration(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    try {
      const existingByUserName = await this.userModel.findOne({
        username: createUserDto.username,
      });
      const existingByEmail = await this.userModel.findOne({
        email: createUserDto.email,
      });

      if (existingByUserName) {
        return { warningMessage: 'Пользователь с таким именем уже существует' };
      }

      if (existingByEmail) {
        return { warningMessage: 'Пользователь с таким email уже существует' };
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = new this.userModel({
        username: createUserDto.username,
        password: hashedPassword,
        email: createUserDto.email,
      });

      return user.save();
    } catch (error) {
      console.error('Error during user registration:', error);
      throw error;
    }
  }

  async findOne(usernameOrEmail: string): Promise<User> {
    return this.userModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
