export type Year = {
  id?: string;
  year: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type YearForm = Pick<Year, 'id' | 'year' | 'status'>;

export type FormattedYear = Year & {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};
