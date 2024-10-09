interface IProduct {
  id: string;
  quantity: number;
}

export interface ICreateOrders {
  customer_id: string;
  products: IProduct[];
}
