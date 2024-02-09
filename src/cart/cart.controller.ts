import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CheckCartItemDto } from './dto/check-cart-item.dto';
import { Cart } from 'src/schemas/cart.schemas';
import { GetCartUserIdDto } from './dto/get-cart-userid.dto';
import { DeleteCartDto } from './dto/delete-cart.dto';
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

  //   @UseGuards(JWTGuard)
  @Post('delete')
  async removeCartItem(@Body() deleteCartDto: DeleteCartDto) {
    const isCartDeleted = await this.cartService.removeCartItem(deleteCartDto);
    return { isCartDeleted };
  }

  //   @UseGuards(JWTGuard)
  @Post('get')
  async getCartUserId(
    @Body() getCartUserIdDto: GetCartUserIdDto,
  ): Promise<Cart[]> {
    try {
      const cart = await this.cartService.getByUserId(getCartUserIdDto);

      if (!cart || cart.length === 0) {
        throw new NotFoundException('No cart found');
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }
}
