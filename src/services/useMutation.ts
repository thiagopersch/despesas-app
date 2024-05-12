import {
  useQueryClient,
  useMutation as useReactQueryUseMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Flip, ToastContent, toast } from "react-toastify";
import createApi from "./api";

type ProcessQueryDataFn = (oldData: any, newData: any) => any;

type UseMutationOptions<TData = unknown, TError = unknown> = {
  linkedQueries?: Record<string, ProcessQueryDataFn>;
  renderLoading?: (data: any) => ToastContent;
  renderError?: (data: any, error: AxiosError<TError>) => ToastContent;
  renderSuccess?: (data: any) => ToastContent;
  onMutate?: () => void | Promise<void>;
};

const useMutation = <TData = string, TError = unknown>(
  key: string,
  mutationFn: (variables: any) => Promise<TData>,
  options: UseMutationOptions<TData, TError> = {}
) => {
  const api = createApi();
  const queryClient = useQueryClient();

  const mutation = useReactQueryUseMutation<TData, TError, any>({
    mutationKey: [key],
    mutationFn: async (variables: any) => {
      return mutationFn({ variables, api, queryClient });
    },
    onError: (err: any, variables: any, context: any) => {
      const ctx = context || {};
      if (options.renderError) {
        const toastObj = {
          type: toast.error,
          render: options.renderError(variables, err),
          autoClose: 3000,
        };

        if (ctx.toastKey) {
          toast.update(ctx.toastKey, {
            ...toastObj,
            type: "error",
            transition: Flip,
          });
        } else {
          toast(toastObj as unknown as ToastContent);
        }
      } else if (ctx.toastKey) {
        toast.dismiss(ctx.toastKey);
      }

      Object.entries(ctx.previousQueriesData || {}).forEach(
        ([key, value]: [string, any]) => queryClient.setQueryData([key], value)
      );
    },
    onSuccess: (data: any, variables: any, context: any) => {
      if (options.renderSuccess) {
        const toastObj = {
          type: toast.success,
          render: options.renderSuccess(data),
          autoClose: 3000,
        };

        if (context.toastKey) {
          toast.update(context.toastKey, {
            ...toastObj,
            type: "success",
            transition: Flip,
          });
        } else {
          toast(toastObj as unknown as ToastContent);
        }
      } else if (context.toastKey) {
        toast.dismiss(context.toastKey);
      }
    },
    onSettled: () => {
      if (options.linkedQueries) {
        Object.keys(options.linkedQueries).forEach((query) =>
          queryClient.invalidateQueries({ queryKey: [query] })
        );
      }
    },
    ...options,
  });

  return mutation;
};

export default useMutation;
