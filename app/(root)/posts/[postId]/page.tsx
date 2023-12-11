"use client";

import { PostForm } from "@/components/forms";
import { CommentItem, Header } from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sliceText } from "@/lib/utils";
import { IPost } from "@/types";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const PostDetails = ({ params }: { params: { postId: string } }) => {
  const { data: session, status }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingComment, setIsFetchingComment] = useState(false);
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IPost[]>([]);

  const getPost = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/posts/${params.postId}`);
      setPost(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getComments = async () => {
    try {
      setIsFetchingComment(true);
      const { data } = await axios.get(`/api/posts/${params.postId}/comments`);
      setComments(data);
      setIsFetchingComment(false);
    } catch (error) {
      console.log(error);
      setIsFetchingComment(false);
    }
  };

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  return (
    <>
      <Header label="Post" isBack />

      {isLoading || status === "loading" ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-neutral-900 transition">
            <div className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarImage src={post?.user.profileImage} />
                <AvatarFallback>{post?.user.name[0]}</AvatarFallback>
              </Avatar>

              <div>
                <div className="flex flex-row items-center gap-2">
                  <p className="text-white font-semibold cursor-pointer hover:underline">
                    {post?.user.name}
                  </p>
                  <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                    {post && post?.user.username
                      ? `@${sliceText(post.user.username, 20)}`
                      : post && sliceText(post.user.email, 20)}
                  </span>
                  <span className="text-neutral-500 text-sm">
                    {post &&
                      post.createdAt &&
                      formatDistanceToNowStrict(new Date(post.createdAt))}
                  </span>
                </div>
                <div className="text-white mt-1">{post?.body}</div>
              </div>
            </div>
          </div>

          <PostForm
            placeholder="Post your reply?"
            user={JSON.parse(JSON.stringify(session.currentUser))}
            setPosts={setComments}
            postId={params.postId}
            isComment
          />

          {isFetchingComment ? (
            <div className="flex justify-center items-center h-24">
              <Loader2 className="animate-spin text-sky-500" />
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem
                comment={comment}
                key={comment._id}
                user={JSON.parse(JSON.stringify(session.currentUser))}
                setComments={setComments}
                comments={comments}
              />
            ))
          )}
        </>
      )}
    </>
  );
};

export default PostDetails;
