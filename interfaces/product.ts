import { IUser } from "./user";

export interface IProductCategory {
  _id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  courseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Iproduct {
  itemName: string;
  itemPhoto: string;
  itemSlidePhoto: string[];
  description: string;
  categoryId: string;
  phoneNumber: number;
  rating: number;
  rentalPrice: number;
  rentalStartDate: Date;
  rentalEndDate: Date;
}
