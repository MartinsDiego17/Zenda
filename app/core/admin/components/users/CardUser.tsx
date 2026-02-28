import { Profile } from "@/schemas/profile";
import { Mail } from "lucide-react";

interface props {
    user: Profile
    isUserSelected: boolean
}

export const CardUser = ({ user, isUserSelected }: props) => {
    return (
        <div className={`p-5 py-3 border-b card-current-user flex place-items-center ${isUserSelected && "user-selected"}`}>

            <div className="w-[40%] flex place-items-center gap-x-2">
                <div className="avatar border border-transparent p-2.5 text-(--color-primary) font-bold text-[.7rem] rounded-full bg-(--color-terciary-transparent)">
                    {user.full_name[0]}{user.full_name.split(" ")[1][0]}
                </div>
                <h3 className="text-[.8rem] name-current-user ">{user.full_name}</h3>
            </div>

            <h3 className="flex place-items-center gap-x-2 w-[60%] opacity-60 text-[.8rem]">
                <span><Mail size={12} /></span>
                <span>{user.email}</span>
            </h3>

        </div>
    );
};
