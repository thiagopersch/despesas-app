export type PaymentMethods = {
  id?: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PaymentMethodsForm = Pick<PaymentMethods, 'id' | 'name' | 'status'>;

export type FormattedPaymentMethods = PaymentMethods & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
