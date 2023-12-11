import { IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";

const User = ({ user }: { user: IUser }) => {
  return (
    <div className="flex gap-1 items-center justify-between py-2 px-2 rounded-xl hover:bg-neutral-800 hover:bg-opacity-80 hover:transition">
      <div className="flex gap-2 cursor-pointer">
        <Avatar>
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-white font-semibold text-sm line-clamp-1">
            {user.name}
          </p>
          <p className="text-neutral-400 text-sm line-clamp-1">
            {user.username
              ? `@${sliceText(user.username, 16)}`
              : sliceText(user.email, 16)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
