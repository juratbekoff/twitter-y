import { ProfileBio, ProfileHero } from "@/components/profile";
import { Header, PostFeed } from "@/components/shared";
import { getUserById } from "@/lib/actions";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const ProfilePage = async ({ params }: { params: { userId: string } }) => {
  const session: any = await getServerSession(authOptions);
  const user: any = await getUserById(params.userId);

  return (
    <>
      <Header label={user.name} isBack />

      <ProfileHero user={JSON.parse(JSON.stringify(user))} />

      <ProfileBio
        user={JSON.parse(JSON.stringify(user))}
        userId={JSON.parse(JSON.stringify(session)).currentUser._id}
      />

      <PostFeed
        userId={params.userId}
        user={JSON.parse(JSON.stringify(session.currentUser))}
      />
    </>
  );
};

export default ProfilePage;
