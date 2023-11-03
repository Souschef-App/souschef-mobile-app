import { SKILL_LEVEL } from "../enum";

interface SessionUser {
  id: string;
  name: string;
  skillLevel: SKILL_LEVEL;
}

export default SessionUser;
