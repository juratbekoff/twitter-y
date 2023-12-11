"use client";

import { PostForm } from "@/components/forms";
import { Header } from "@/components/shared";
import PostItem from "@/components/shared/PostItem";
import { usePosts } from "@/hooks";
import { IPost } from "@/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Home = () => {
  const { data: session, status }: any = useSession();
  const { data, isLoading } = usePosts();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return (
    <>
      <Header label="Home" />
      {isLoading || status === "loading" ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <PostForm
            placeholder="What's on your mind?"
            user={JSON.parse(JSON.stringify(session.currentUser))}
            setPosts={setPosts}
          />
          {posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              user={JSON.parse(JSON.stringify(session.currentUser))}
              setPosts={setPosts}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Home;
