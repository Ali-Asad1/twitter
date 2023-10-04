import { CommentType } from "./comment.type";
import { UserType } from "./user.type";

export type PostType = {
  id: string;
  body: string;
  createdAt: Date;
  updateAd: Date;
  userId: string;
  likedIds: string[];
  user: UserType;
  comments: CommentType[];
};
