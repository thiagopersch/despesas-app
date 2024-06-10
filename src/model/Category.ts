export type Category = {
  id?: string;
  image: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CategoryForm = Pick<Category, 'id' | 'name' | 'status'>;

export type FormattedCategory = Category & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
