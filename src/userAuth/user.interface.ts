
export interface IUser {
    _id?: string; 
    name: string;
    email: string;
    password: string; 
    phone?: string;
    image ?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
    role: 'admin' | 'customer' ;
    isActive?: boolean;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  