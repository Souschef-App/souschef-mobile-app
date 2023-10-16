import { SERVER_MESSAGE } from "./enum";

export interface ServerMessage {
  type: SERVER_MESSAGE;
  payload: any;
}
