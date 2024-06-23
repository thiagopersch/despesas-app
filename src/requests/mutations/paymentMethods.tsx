import ToastContent from '@/components/ToastContent';
import { PaymentMethods, PaymentMethodsForm } from '@/model/PaymentMethods';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddPaymentMethodsMutation(session?: Session | null) {
  const addPaymentMethods = useCallback(
    async (values: PaymentMethodsForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/paymentMethods', requestData);
      } else {
        return api.patch(`/paymentMethods/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-paymentMethods', addPaymentMethods, {
    linkedQueries: {
      'get-paymentMethods': (
        old: { paymentMethods: PaymentMethodsForm[] } | undefined,
        newPaymentMethods: PaymentMethodsForm,
      ) => {
        if (!old || !old.paymentMethods) {
          return [{ ...newPaymentMethods, id: uuidv4(), disabled: true }];
        }

        const existingPaymentMethodsIndex = old.paymentMethods.findIndex(
          (paymentMethods) => paymentMethods.id === newPaymentMethods.id,
        );

        if (existingPaymentMethodsIndex > -1) {
          const updatedPaymentMethods = [...old.paymentMethods];
          updatedPaymentMethods[existingPaymentMethodsIndex] = {
            ...newPaymentMethods,
            id: old.paymentMethods[existingPaymentMethodsIndex].id,
          };
          return { paymentMethods: updatedPaymentMethods };
        } else {
          return {
            paymentMethods: [
              ...old.paymentMethods,
              { ...newPaymentMethods, id: uuidv4(), disabled: true },
            ],
          };
        }
      },
    },
    renderLoading: function render(newPaymentMethods: PaymentMethodsForm) {
      return (
        <ToastContent showSpinner>
          Salvando: {newPaymentMethods.name}...
        </ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeletePaymentMethodsMutation(session?: Session | null) {
  const deletePaymentMethods = useCallback(
    async (paymentMethods: PaymentMethods) => {
      const api = createApi(session);
      return api.delete(`/paymentMethods/${paymentMethods.id}`);
    },
    [session],
  );

  return useMutation('delete-paymentMethods', deletePaymentMethods, {
    linkedQueries: {
      'get-paymentMethods': (
        oldPaymentMethods: PaymentMethods[],
        deletePaymentMethods: PaymentMethods,
      ) =>
        oldPaymentMethods?.map((paymentMethods) =>
          paymentMethods.id === deletePaymentMethods.id
            ? { ...paymentMethods, disabled: true }
            : paymentMethods,
        ),
    },
    renderLoading: (deletedPaymentMethods: PaymentMethods) => (
      <ToastContent showSpinner>
        Removendo o registro: {deletedPaymentMethods.name}...
      </ToastContent>
    ),
    renderError: () => 'Falha ao deletar o registro!',
    renderSuccess: () => `Deletado com sucesso!`,
  });
}
