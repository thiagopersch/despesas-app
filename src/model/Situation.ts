export type Situation = {
  id?: string;
  name: string;
  color: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SituationForm = Pick<Situation, 'id' | 'name' | 'color' | 'status'>;

export type FormattedSituation = Situation & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
