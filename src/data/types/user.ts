import { SKILL_LEVEL } from "./enum";

interface User {
  id: string;
  name: string;
  email: string;
  skillLevel: SKILL_LEVEL;
}

export default User;
