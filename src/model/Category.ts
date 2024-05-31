export type Category = {
  id: string;
  image: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CategoryForm = {
  id?: string;
  image: string;
  name: string;
  status: boolean;
};

export type FormattedCategory = Category & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
