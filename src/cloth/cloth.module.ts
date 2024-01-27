import { Module } from '@nestjs/common';
import { ClothService } from './cloth.service';
import { ClothController } from './cloth.controller';
import { Cloth, ClothSchema } from 'src/schemas/cloth.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cloth.name, schema: ClothSchema }]),
  ],
  providers: [ClothService],
  exports: [ClothService],
  controllers: [ClothController],
})
export class ClothModule {}
