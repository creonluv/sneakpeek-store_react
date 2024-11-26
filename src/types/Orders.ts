type DeliveryHome = {
  state?: string;
  city?: string;
  street?: string;
  apartment?: string;
  delivery_type: string;
  shipment_method: string;
};

type DeliveryBranch = {
  branch_id?: string;
  branch_address?: string;
  delivery_type: string;
  shipment_method: string;
};

type DeliveryDetails = DeliveryHome | DeliveryBranch;

export type CartDetails = {
  cart_id: number;
  name: string;
  surname: string;
  phone_number: string;
  delivery_details: DeliveryDetails;
};
