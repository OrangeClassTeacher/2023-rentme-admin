import { Iproduct } from "./product";

interface UserAddress {
  country: string;
  city: string;
  disctrict: string;
  apartment: string;
}

export interface IUserRole {
  _id: string;
  role: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  Username: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  address?: string;
  role: string;
  favItems: string[];
  gender: string;
  profilePic: string;
  password: string;
}
