export type Profiles = {
  id?: string;
  code: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProfilesForm = Pick<Profiles, 'id' | 'code' | 'name' | 'status'>;

export type FormattedProfiles = Profiles & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
