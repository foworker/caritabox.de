import { create } from "zustand";
import cuid from "cuid";

import { ProductProps } from "@/types";

interface CartItem extends ProductProps {
  count: number;
  selectedOptions?: Record<string, string>;
}

type InsuranceDataProps = {
  salutation: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postCode: string;
  city: string;
  birthDate: string;
  phone: string;
  email: string;
  insuranceCompany: string;
  insuranceNumber: string;
  careLevel: string;
};

type CareerDataProps = {
  salutation: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postCode: string;
  city: string;
  phone: string;
};
type DeliveryType = "insurance" | "career" | "";

type CartStore = {
  cart: CartItem[];
  cartTotal: number;
  badPad: boolean;
  insuranceData: InsuranceDataProps;
  careerData: CareerDataProps;
  count: () => number;
  deliveryAddress: DeliveryType;
  add: (product: ProductProps, options?: Record<string, string>) => void;
  updateProductOptions: (
    productCartId: string,
    options: Record<string, string>,
  ) => void;
  remove: (idProduct: string, productCartId: string) => void;
  removeAll: () => void;
  changeBadPad: (value: boolean) => void;
  setInsuranceData: (insurance: Partial<InsuranceDataProps>) => void;
  setCareerData: (career: Partial<CareerDataProps>) => void;
  setDeliveryAddress: (e: DeliveryType) => void;
  signature: string;
  setSignature: (e: any) => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  cartTotal: 0,
  badPad: false,
  signature: "",
  insuranceData: {
    salutation: "Frau",
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    postCode: "",
    city: "",
    birthDate: "",
    phone: "",
    email: "",
    insuranceCompany: "",
    insuranceNumber: "",
    careLevel: "Pflegegrad 1",
  },
  careerData: {
    salutation: "",
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    postCode: "",
    city: "",
    phone: "",
  },
  deliveryAddress: "",
  setCareerData: (career) =>
    set((state) => ({
      careerData: { ...state.careerData, ...career },
    })),
  setInsuranceData: (insurance) =>
    set((state) => ({
      insuranceData: { ...state.insuranceData, ...insurance },
    })),

  count: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.count, 0);
  },

  add: (product, options = {}) => {
    let cart = get().cart;
    product.productCartId = cuid();
    const cartItem = {
      ...product,
      count: 1,
      selectedOptions: options,
    };

    if (cartItem.optionGroups.length) {
      cart = updateCartWithoutOptions(cartItem, cart);
      set({ cart, cartTotal: calculateTotal(cart) });
    } else {
      cart = updateCartWithOptions(cartItem, cart);
      set({ cart, cartTotal: calculateTotal(cart) });
    }
  },

  updateProductOptions: (productCartId, options) => {
    let cart = get().cart;
    cart = cart.map((item) => {
      if (item.productCartId === productCartId) {
        return { ...item, selectedOptions: options };
      }
      return item;
    });
    set({ cart, cartTotal: calculateTotal(cart) });
  },

  remove: (idProduct, productCartId) => {
    let cart = get().cart;
    cart = cart.filter(
      (item) => item.id !== idProduct || item.productCartId !== productCartId,
    );
    set({ cart, cartTotal: calculateTotal(cart) });
  },

  removeAll: () => {
    set({ cart: [], cartTotal: 0 });
  },

  changeBadPad: (value) => set(() => ({ badPad: value })),
  setDeliveryAddress: (value) => set(() => ({ deliveryAddress: value })),
  setSignature: (value) => set(() => ({ setSignature: value })),
}));

function updateCartWithOptions(
  newCartItem: CartItem,
  cart: CartItem[],
): CartItem[] {
  const existingItemIndex = cart.findIndex(
    (item) =>
      item.id === newCartItem.id &&
      JSON.stringify(item.selectedOptions) ===
        JSON.stringify(newCartItem.selectedOptions),
  );

  if (existingItemIndex !== -1) {
    const existingItem = cart[existingItemIndex];
    return [
      ...cart.slice(0, existingItemIndex),
      {
        ...existingItem,
        count: existingItem.count + 1,
      },
      ...cart.slice(existingItemIndex + 1),
    ];
  } else {
    return [...cart, newCartItem];
  }
}

function updateCartWithoutOptions(
  newCartItem: CartItem,
  cart: CartItem[],
): CartItem[] {
  const existingItemIndex = cart.findIndex(
    (item) =>
      item.productCartId === newCartItem.productCartId &&
      JSON.stringify(item.selectedOptions) ===
        JSON.stringify(newCartItem.selectedOptions),
  );

  if (existingItemIndex !== -1) {
    const existingItem = cart[existingItemIndex];
    return [
      ...cart.slice(0, existingItemIndex),
      {
        ...existingItem,
        count: existingItem.count + 1,
      },
      ...cart.slice(existingItemIndex + 1),
    ];
  } else {
    return [...cart, newCartItem];
  }
}

function calculateTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.price * item.count, 0);
}
