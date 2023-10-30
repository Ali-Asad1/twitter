"use client";

import { PuffLoader } from "react-spinners";
import { notFound } from "next/navigation";

import useUser from "@/hooks/useUser";

import Header from "@/components/header/Header";
import UserHero from "@/components/user/UserHero";
import UserBio from "@/components/user/UserBio";
import PostFeed from "@/components/post/PostFeed";

const UserPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const { data, isLoading, error } = useUser(username);

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <PuffLoader color="#0090ff" />
      </div>
    );

  if (error?.response?.status === 404) notFound();

  return (
    <>
      <Header lable={data?.username as string} showBackArrow />
      <UserHero username={data?.username as string} />
      <UserBio username={data?.username as string} />
      <PostFeed userId={data?.id} />
    </>
  );
};
export default UserPage;
