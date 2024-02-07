import { Controller, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CheckCartItemDto } from './dto/check-cart-item-dto';
// import { JWTGuard } from 'src/auth/guards/jwt.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //   @UseGuards(JWTGuard)
  @Post('add')
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    try {
      const result = await this.cartService.add(addToCartDto);
      return result;
    } catch (error) {
      return { error: 'An error occurred while adding to cart.' };
    }
  }

  //   @UseGuards(JWTGuard)
  @Post('check')
  async checkCartItem(@Body() checkCartItemDto: CheckCartItemDto) {
    const isPartIdAdded =
      await this.cartService.checkCartItem(checkCartItemDto);
    return { isPartIdAdded };
  }
}
