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

export type UserFormEdit = {
  id?: string;
  name: string;
  login: string;
  change_password: boolean;
  status: boolean;
};

export type UserForm = {
  id?: string;
  name: string;
  login: string;
  password: string;
  change_password: boolean;
  status: boolean;
};

export type FormattedUsers = User & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
