export type Tags = {
  id?: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TagsForm = Pick<Tags, 'id' | 'name' | 'status'>;

export type FormattedTags = Tags & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
