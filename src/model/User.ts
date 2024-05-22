export type User = {
  id: string;
  name: string;
  login: string;
  password: string;
  change_password: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserForm = {
  id?: string;
  name: string;
  login: string;
  password: string;
};

export type FormattedUsers = User & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
