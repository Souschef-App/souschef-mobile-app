import { SESSION_SERVER_MSG } from "./enum";

export interface ServerMessage {
  type: SESSION_SERVER_MSG;
  payload: any;
}
