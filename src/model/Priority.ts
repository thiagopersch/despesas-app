export type Priority = {
  id?: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PriorityForm = Pick<Priority, 'id' | 'name' | 'status'>;

export type FormattedPriority = Priority & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
