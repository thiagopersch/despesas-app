export type Month = {
  id?: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MonthForm = Pick<Month, 'id' | 'name' | 'status'>;

export type FormattedMonth = Month & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
