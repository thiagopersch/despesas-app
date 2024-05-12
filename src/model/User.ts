export type User = {
  id: string;
  name: string;
  login: string;
  password: string;
  change_password: boolean;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type UserForm = {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
};

export type FormattedUsers = User & {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};
