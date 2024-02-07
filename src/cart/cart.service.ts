import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from 'src/schemas/cart.schemas';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UsersService } from 'src/users/users.service';
import { ClothService } from 'src/cloth/cloth.service';
import { CheckCartItemDto } from './dto/check-cart-item-dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private readonly usersService: UsersService,
    private readonly clothService: ClothService,
  ) {}

  async add(addToCartDto: AddToCartDto) {
    const cart = new this.cartModel();
    const user = await this.usersService.findOne(addToCartDto.username);
    const part = await this.clothService.findOneById(addToCartDto.partId);

    cart.userId = user._id;
    cart.partId = part._id;
    cart.text = part.text;
    cart.price = part.price;
    cart.image = part.image;
    cart.old = part.old;

    return cart.save();
  }

  async checkCartItem(checkCartItemDto: CheckCartItemDto) {
    const user = await this.usersService.findOneById(checkCartItemDto.userId);
    const part = await this.findOne(checkCartItemDto.partId);

    if (user && part) {
      return true;
    } else return false;
  }

  async findOne(partId: string): Promise<Cart | null> {
    return this.cartModel
      .findOne({ partId: new Types.ObjectId(partId) })
      .exec();
  }
}
