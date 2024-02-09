"use client";

import { useCartStore } from "@/hooks";
import { cn } from "@/libs/utils";

const CartProgress = () => {
  const { cartTotal } = useCartStore();
  return (
    <div className="after:rounder-sm relative h-8 w-full rounded-sm bg-white after:absolute after:inline-flex after:h-8 after:w-1/2 after:items-center after:justify-end after:bg-caritabox-200/70 after:px-2 after:text-xs after:text-white after:content-['min_50%'] dark:bg-slate-900">
      <div
        style={{ width: `${cartTotal}%` }}
        className="absolute z-10 inline-flex h-8 items-center rounded-sm bg-caritabox-500 px-0.5 text-sm text-white"
      >
        {Math.round(cartTotal)}%
      </div>
    </div>
  );
};

export default CartProgress;
