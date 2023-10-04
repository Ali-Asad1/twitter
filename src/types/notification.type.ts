import { UserType } from "./user.type";

export type NotificationType = {
  id: string;
  body: string;
  userId: string;
  createAt: Date;
  user: UserType;
};
