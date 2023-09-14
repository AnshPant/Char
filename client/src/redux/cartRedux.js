import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeFromCart: (state,action) =>{
        // console.log(action.payload);
        const updatedProducts = state.products.filter((product) => product._id !== action.payload._id);
        state.products = updatedProducts;
        state.quantity = state.products.length;
        // console.log("hi");
    },
  },
});

export const { addProduct,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
