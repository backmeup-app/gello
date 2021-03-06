import { useContext } from "react";
import { AppContext } from "../../../contexts";
import { client } from "../client";
import { TEditResourceResponse, TEditResourceVariables } from "./types";

export const useUpdateResource = () => {
  const [{ me, loading }, dispatch] = useContext(AppContext);

  return async (
    resource_uuid: string,
    variables: TEditResourceVariables,
    onClose?: () => void
  ) => {
    if (loading) return;
    const service_uuid = me?.services?.find(
      (service) => service._id === (me?.default_service as string)
    )?.uuid as string;
    const url = `/services/${service_uuid}/resources/${resource_uuid}`;
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload:
        Object.keys(variables).length === 1
          ? "update.resource.status"
          : "update.resource",
    });

    try {
      const {
        data: { resource },
      } = await client().put<TEditResourceResponse>(url, variables);
      dispatch({
        type: "UPDATE_RESOURCE",
        payload: { ...resource, service_uuid },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Resource updated successfully" },
      });
      onClose?.();
    } catch (error) {}

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
