"use client";

import { notFound } from "next/navigation";
import { PuffLoader } from "react-spinners";

import { usePost } from "@/hooks/usePost";
import { PostType } from "@/types/post.type";

import PostItem from "@/components/post/PostItem";
import CommentForm from "@/components/comment/CommentForm";
import Header from "@/components/header/Header";
import CommentFeed from "@/components/comment/CommentFeed";

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { postId } = params;

  const { data, isLoading, error } = usePost(postId);
  if (error?.response?.status === 404) notFound();

  return (
    <>
      <Header lable="Post" showBackArrow />
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <PuffLoader color="#0090ff" />
        </div>
      ) : (
        <>
          <PostItem {...(data as PostType)} />
          <CommentForm postId={postId} />
          <CommentFeed comments={data?.comments || []} />
        </>
      )}
    </>
  );
};
export default PostPage;
