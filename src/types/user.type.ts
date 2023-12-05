import { CommentType } from "./comment.type";
import { NotificationType } from "./notification.type";
import { PostType } from "./post.type";

export type UserType = {
  id: string;
  name: string;
  username: string;
  bio: string;
  email: string;
  emailVerified: Date;
  image: string;
  coverImage: string;
  profileImage: string;
  createdAt: Date;
  updateAt: Date;
  followingIds: string[];
  followerIds: string[];
  hasNotification: boolean;
  posts: PostType[];
  comments: CommentType[];
  notifications: NotificationType[];
  followersCount: number;
};
