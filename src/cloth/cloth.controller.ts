import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  UseGuards,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ClothService } from './cloth.service';
import { ClothGuard } from './guard/cloth.guard';
import { CreateClothDto } from './dto/create-cloth.dto';
import { Response } from 'express';
import { Cloth } from 'src/schemas/cloth.schema';

@Controller('cloth')
export class ClothController {
  constructor(private clothService: ClothService) {}

  @UseGuards(ClothGuard)
  @Post('create-cloth')
  async createCloth(
    @Body() createClothDto: CreateClothDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.clothService.createCloth(createClothDto);

      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      console.error('Error create cloth!:', error);

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ errorMessage: 'Internal Server Error' });
    }
  }

  @Get('popularity')
  async getPopularClothes(): Promise<Cloth[]> {
    try {
      const popularClothes = await this.clothService.popularity();
      return popularClothes;
    } catch (error) {
      console.error('Error getting popular clothes:', error);
      throw error;
    }
  }

  @Get('old')
  async getOldClothes(): Promise<Cloth[]> {
    try {
      const oldClothes = await this.clothService.old();
      return oldClothes;
    } catch (error) {
      console.error('Error getting old clothes:', error);
      throw error;
    }
  }

  @Get('allcloth')
  async getAllClothes(): Promise<Cloth[]> {
    try {
      const clothes = await this.clothService.findAll();

      if (!clothes || clothes.length === 0) {
        throw new NotFoundException('No clothes found');
      }

      return clothes;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Cloth> {
    try {
      const cloth = await this.clothService.findOneById(id);

      if (!cloth) {
        throw new NotFoundException(`Cloth with id ${id} not found`);
      }

      return cloth;
    } catch (error) {
      throw error;
    }
  }
}
