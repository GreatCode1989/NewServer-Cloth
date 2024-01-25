import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({
        $or: [
          { username: loginUserDto.username },
          { email: loginUserDto.email },
        ],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.error('Error while logging in:', error);
      throw error;
    }
  }

  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    try {
      const existingUser = await this.userModel.collection.findOne({
        $or: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      });

      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      const createdUser = new this.userModel(createUserDto);

      return createdUser.save();
    } catch (error) {
      console.error('Error during user registration:', error);
      throw error;
    }
  }

  async findOne(filter: {
    where: {
      id?: string;
      username?: string;
      email?: string;
    };
  }): Promise<User | null> {
    try {
      if (!filter || !filter.where || typeof filter.where !== 'object') {
        console.error('Invalid filter:', filter);
        return null;
      }

      const user = await this.userModel.findOne({ where: filter.where });
      return user;
    } catch (error) {
      console.error('Error while fetching user:', error);
      throw error;
    }
  }
}
