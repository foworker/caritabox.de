import Image from "next/image";
import cuid from "cuid";
import { BsPlusCircleFill } from "react-icons/bs";

import { cn } from "@/libs/utils";

import { ProductProps, ProductsProps } from "@/types";
import { useCartStore } from "@/hooks";

import Cart from "../cart";

const StepOne = ({ products }: ProductsProps) => {
  const { cart, add, cartTotal } = useCartStore();

  const handleClick = (product: ProductProps) => {
    if (cartTotal < 100) {
      add(product);
    }
  };
  return (
    <div className="">
      <p className="text-sm">
        Ihre Pflegetüte können Sie beliebig nach Ihren Wünschen füllen. Sie
        können jederzeit die Zusammenstellung wieder ändern.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-row gap-4 overflow-x-auto md:flex-col md:gap-4 md:overflow-x-hidden">
          {products.map((product) => {
            const currentTotal = cartTotal + product.price;
            return (
              <div
                key={product.id}
                onClick={() => {
                  currentTotal < 100 ? handleClick(product) : () => {};
                }}
                className={cn(
                  "cursor- flex min-w-[200px] cursor-pointer flex-col items-center gap-2 rounded border border-slate-200 p-4 dark:border-slate-800 md:flex-row md:gap-4",
                  currentTotal + product.price > 100 &&
                    "cursor-default opacity-30",
                )}
              >
                <div className="flex flex-1 flex-col items-center gap-2 md:flex-row md:gap-4">
                  <Image
                    src={product.imageUrl}
                    width={96}
                    height={96}
                    alt={product.title}
                    className="h-24 w-24 object-cover"
                  />
                  <div className="text-center text-caritabox-500 md:text-start">
                    <h3 className="text-sm">{product.title}</h3>
                    <p className="text-xs">
                      {product.qty + " " + product.unit}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex">
                  <BsPlusCircleFill className="text-caritabox-500" size={28} />
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
