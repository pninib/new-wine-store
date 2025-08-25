import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // [{_id, name, price, imgUrl, quantity}]
  isOpen: false, // האם עגלת הקניות מוצגת כחלונית
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrder(state, action) {
      const wine = action.payload;
      const existing = state.items.find(item => item._id === wine._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...wine, quantity: 1 });
      }
      // לא פותח את העגלה כאן!
    },
    removeFromOrder(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload);
      if (state.items.length === 0) state.isOpen = false;
    },
    increaseQuantity(state, action) {
      const item = state.items.find(item => item._id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const item = state.items.find(item => item._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i._id !== action.payload);
        }
      }
      if (state.items.length === 0) state.isOpen = false;
    },
    openOrder(state) {
      state.isOpen = true;
    },
    closeOrder(state) {
      state.isOpen = false;
    },
    clearOrder(state) {
      state.items = [];
      state.isOpen = false;
    }
  }
});

export const {
  addToOrder,
  removeFromOrder,
  increaseQuantity,
  decreaseQuantity,
  openOrder,
  closeOrder,
  clearOrder
} = orderSlice.actions;

export default orderSlice.reducer;