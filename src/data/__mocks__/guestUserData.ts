import { SKILL_LEVEL, SessionUser, User } from "../types";

const guestSessionUser: SessionUser = {
  id: "",
  name: "Guest",
  skillLevel: SKILL_LEVEL.Expert,
};

export default guestSessionUser;
