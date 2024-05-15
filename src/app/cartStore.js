import create from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const useCartStore = create((set) => ({
  cartState: false,
  cartItems: sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  customerId: sessionStorage.getItem("customerId") || null,
  variantQuantities: {}, // Store variant quantities

  setOpenCart: (cartState) => set({ cartState }),
  setCloseCart: (cartState) => set({ cartState }),

  setAddItemToCart: async (item, productId, selectedSize) => {
    try {
      const customerId = sessionStorage.getItem("customerId");
      console.log("Customer ID:", customerId);

      const response = await axios.get(`https://shoefort.vercel.app/products/${productId}`);
      const variants = response.data;
      const variant = variants.find((variant) => variant.size === selectedSize);

      if (!variant) {
        console.error("Variant not found");
        return;
      }

      const newItem = {
        ...item,
        price: variant.price,
        qty: variant.qty,
        color: variant.colors.map((color) => color.value),
        cartQuantity: 1,
      };

      // Update variant quantity in state
      set((state) => ({
        variantQuantities: {
          ...state.variantQuantities,
          [`${productId}-${selectedSize}`]: variant.qty - 1, // Initially set to variant.qty - 1
        },
      }));

      console.log("New item:", newItem);

      set((state) => {
        const updatedCartItems = [...state.cartItems, newItem];
        sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
        toast.success(`${item.product_name} added to Cart`);
        return { ...state, cartItems: updatedCartItems };
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  },

  setRemoveItemFromCart: (id) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter((item) => item.id !== id);
      sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
      toast.success(`Item Removed From Cart`);
      return { ...state, cartItems: updatedCartItems };
    }),

  setIncreaseItemQTY: (id) =>
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
      );
      sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
      toast.success(`Item QTY Increased`);
      return { ...state, cartItems: updatedCartItems };
    }),

  setDecreaseItemQTY: (id) =>
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === id && item.cartQuantity > 1 ? { ...item, cartQuantity: item.cartQuantity - 1 } : item
      );
      sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
      toast.success(`Item QTY Decreased`);
      return { ...state, cartItems: updatedCartItems };
    }),

  setClearCartItems: () =>
    set((state) => {
      sessionStorage.setItem("cart", JSON.stringify([]));
      toast.success(`Cart Cleared`);
      return { ...state, cartItems: [] };
    }),

  setGetTotals: () =>
    set((state) => {
      const { totalAmount, totalQTY } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const totalPrice = price * cartQuantity;

          return {
            totalAmount: cartTotal.totalAmount + totalPrice,
            totalQTY: cartTotal.totalQTY + cartQuantity,
          };
        },
        {
          totalAmount: 0,
          totalQTY: 0,
        }
      );

      return {
        ...state,
        cartTotalAmount: totalAmount,
        cartTotalQuantity: totalQTY,
      };
    }),

  createTransaction: async () => {
    try {
      const customerId = sessionStorage.getItem("customerId");
      const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

      const transactions = cartItems.map((item) => {
        const amount = item.price * item.cartQuantity;
        return axios.post("http://localhost:4001/transactions", {
          customerId,
          productId: item.productId,
          amount,
          payment_method: null,
        });
      });

      await Promise.all(transactions);
      console.log("Transactions created successfully");
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  },
}));

export default useCartStore;
