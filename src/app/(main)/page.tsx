import Header from "@/components/header/Header";
import PostFeed from "@/components/post/PostFeed";
import PostForm from "@/components/post/PostForm";

export default function Home() {
  return (
    <>
      <Header lable="Home" />
      <PostForm />
      <PostFeed />
    </>
  );
}
