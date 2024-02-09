import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type ProductProps = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  price: number;
  qty: number;
  unit: string;
  productCartId: string;
  optionGroups: {
    id: string;
    optionGroup: {
      id: string;
      name: string;
      options: {
        id: string;
        option: {
          id: string;
          name: string;
          selected: boolean;
        };
      }[];
    };
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export type ProductsProps = {
  products: ProductProps[];
};

export type CareInsuranceProps = {
  id: string;
  name: string;
  description: string;
};
