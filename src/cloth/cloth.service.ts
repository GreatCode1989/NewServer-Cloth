import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cloth, ClothDocument } from 'src/schemas/cloth.schema';
import { CreateClothDto } from './dto/create-cloth.dto';

@Injectable()
export class ClothService {
  constructor(
    @InjectModel(Cloth.name) private clothModel: Model<ClothDocument>,
  ) {}

  async findAll(): Promise<Cloth[]> {
    return this.clothModel.find().exec();
  }

  async searchItem(query: string): Promise<Cloth[]> {
    const regexQuery = new RegExp(query, 'i');

    return this.clothModel
      .find({
        text: { $regex: regexQuery },
      })
      .exec();
  }

  async popularity(): Promise<Cloth[]> {
    return this.clothModel
      .find({
        popularity: true,
      })
      .exec();
  }

  async old(): Promise<Cloth[]> {
    return this.clothModel
      .find({
        old: true,
      })
      .exec();
  }

  async findOneById(id: string): Promise<Cloth | null> {
    return this.clothModel.findById(id).exec();
  }

  async createCloth(createClothDto: CreateClothDto): Promise<Cloth> {
    try {
      const cloth = new this.clothModel({
        text: createClothDto.text,
        description: createClothDto.description,
        price: createClothDto.price,
        size: createClothDto.size,
        image: createClothDto.image,
        in_stock: createClothDto.in_stock,
        in_shop: createClothDto.in_shop,
        popularity: createClothDto.popularity,
        old: createClothDto.old,
      });

      return cloth.save();
    } catch (error) {
      console.error('Ошибка создания базы данных с одеждой', error);
      throw error;
    }
  }
}
