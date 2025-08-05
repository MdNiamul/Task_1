import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export interface Order {
  id: string;
  customerName: string;
  shippingAddress: string;
  phoneNumber: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  orderDate: string;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'orderDate'>>) => {
      const newOrder: Order = {
        ...action.payload,
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        orderDate: new Date().toISOString(),
      };
      state.orders.push(newOrder);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;