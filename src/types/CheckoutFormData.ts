export type CheckoutFormData = {
  cart_id: string;
  name: string;
  surname: string;
  phone_number: string;
  delivery_type: boolean;
  shipment_method: string;
  city?: string;
  state?: string;
  street?: string;
  apartment?: string;
  branch_id?: string;
  branch_address?: string;

  terms: boolean;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
};
