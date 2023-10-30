"use client";

import { PuffLoader } from "react-spinners";

import { usePosts } from "@/hooks/usePosts";

import PostItem from "./PostItem";

type PostFeedProps = {
  userId?: string;
};

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data, isLoading } = usePosts(userId);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-32 flex justify-center items-center">
          <PuffLoader size={30} color="#0090ff" />
        </div>
      ) : (
        data?.map((post) => <PostItem key={post.id} {...post} />)
      )}
    </>
  );
};
export default PostFeed;
