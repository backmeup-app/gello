import { TIpAddress } from "../..";

export type TIpAction = {
  type: "CREATE_IP_ADDRESS" | "DELETE_IP_ADDRESS";
  payload: TIpAddress;
};
