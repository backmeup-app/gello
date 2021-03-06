import { useContext, Dispatch } from "react";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { client } from "../client";
import {
  TUpdateUserPasswordVariables,
  TUpdateUserResponse,
  TUpdateUserVariables,
} from "./types";

export const useUpdateUser = () => {
  const [, dispatch] = useContext(AppContext);

  return async (variables: TUpdateUserVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: variables?.default_service
        ? "update.default.service"
        : "update.user",
    });

    try {
      const {
        data: {
          user: { first_name, last_name, email, avatar, default_service },
        },
      } = await client().put<TUpdateUserResponse>("/me", variables);
      dispatch({
        type: "SET_USER",
        payload: { first_name, last_name, email, avatar, default_service },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: variables?.default_service
            ? "Service changed successfully"
            : "Updated successfully",
        },
      });
    } catch (error) {}
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: "",
    });
  };
};

export const useUpdateUserPassword = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  return async (variables: TUpdateUserPasswordVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: "update.user.password",
    });

    try {
      await client().put("/me/password/change", variables);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Password updated successfully" },
      });
    } catch (error) {}

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: "",
    });
  };
};
