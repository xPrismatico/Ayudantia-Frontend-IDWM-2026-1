import { CartDTO, CartUpdatesDTO } from ".";

export interface CheckoutResultDTO {
  cartUpdated: CartDTO;
  cartUpdatesDTO: CartUpdatesDTO;
}
