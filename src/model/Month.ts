export type Month = {
  id?: string;
  month: string;
  year: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MonthForm = Pick<Month, 'id' | 'month' | 'year' | 'status'>;

export type FormattedMonth = Month & {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};
