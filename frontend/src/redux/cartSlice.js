import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
};

const saveToLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.items.find(
                (i) => i._id === item._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }

            saveToLocalStorage(state.items);
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item._id !== action.payload
            );

            saveToLocalStorage(state.items);
        },

        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;

            const item = state.items.find(
                (i) => i._id === itemId
            );

            if (item) {
                item.quantity = quantity;
            }

            saveToLocalStorage(state.items);
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity , clearCart } = cartSlice.actions;
export default cartSlice.reducer;