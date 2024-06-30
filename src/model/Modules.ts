export type Modules = {
  id?: string;
  code: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ModulesForm = Pick<Modules, 'id' | 'code' | 'name' | 'status'>;

export type FormattedModules = Modules & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
