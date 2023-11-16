"use client";

import { CommentType } from "@/types/comment.type";
import CommentItem from "./CommentItem";

type CommentFeedProps = {
  comments: CommentType[];
};

const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </>
  );
};
export default CommentFeed;
