export type TypeAccounts = {
  id?: string;
  bank_code: string;
  bank_name: string;
  bank_type: string;
  bank_color: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TypeAccountsForm = Pick<
  TypeAccounts,
  'id' | 'bank_code' | 'bank_color' | 'bank_name' | 'bank_type' | 'status'
>;

export type FormattedTypeAccounts = TypeAccounts & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
