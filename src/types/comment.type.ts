import { PostType } from "./post.type";
import { UserType } from "./user.type";

export type CommentType = {
  id: string;
  body: string;
  createAt: Date;
  updateAt: Date;
  userId: string;
  postId: string;
  user: UserType;
  post: PostType;
};
