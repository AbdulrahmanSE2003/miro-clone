import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = (payloads: any) => {
    setPending(true);
    return apiMutation(payloads)
      .finally(() => {
        setPending(false);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  return { mutate, pending };
};
