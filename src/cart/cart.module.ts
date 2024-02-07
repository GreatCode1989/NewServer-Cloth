import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UsersService } from 'src/users/users.service';
import { ClothService } from 'src/cloth/cloth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/schemas/cart.schemas';
import { User, UserSchema } from 'src/schemas/users.schema';
import { Cloth, ClothSchema } from 'src/schemas/cloth.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Cloth.name, schema: ClothSchema }]),
  ],
  providers: [
    CartService,
    UsersService,
    ClothService,
    CartModule,
    AuthService,
    JwtService,
  ],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
