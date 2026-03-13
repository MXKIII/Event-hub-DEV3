export type Category = { name: string; validated: boolean };

export type Event = {
  id: string;
  title: string;
  description: string;
  postalcode: string;
  address: string;
  capacity: number;
  ticket: number;
  price: number;
  category: Category[];
  createdBy: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = { page: number; total: number; totalPages: number; limit: number };