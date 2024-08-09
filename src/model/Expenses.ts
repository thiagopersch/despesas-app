export type Expenses = {
  id?: string;
  user_name: string;
  user_id: string;
  payment_methods_name: string;
  payment_methods_id: string;
  priority_name: string;
  priority_id: string;
  month_name: string;
  month_id: string;
  category_name: string;
  category_id: string;
  tags_name: string;
  tags_id: string;
  type_account_name: string;
  type_account_id: string;
  name: string;
  description: string;
  amount_to_pay: string;
  amount_paid: string;
  pay_day: string;
  due_date: string;
  fixed_expense: string;
  repeat: string;
  number_repeat: string;
  type_repeat: string;
  situation_name: string;
  situation_id: string;
  createdAt: string;
  updatedAt: string;
};

export type ExpensesForm = Pick<
  Expenses,
  'id' | 'name' | 'amount_to_pay' | 'amount_paid' | 'pay_day' | 'due_date'
  /* | 'situation_id'
  | 'user_id'
  | 'payment_methods_id'
  | 'priority_id'
  | 'month_id'
  | 'category_id'
  | 'tags_id'
  | 'type_account_id'
  | 'fixed_expense'
  | 'repeat'
  | 'type_repeat'
  | 'number_repeat'
  | 'description' */
>;

export type FormattedExpenses = Expenses & {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
