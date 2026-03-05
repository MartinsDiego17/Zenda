"use client";
import { useEffect, useState } from "react";
import { ListSessions } from "./ListSessions";
import { ListUsers } from "./ListUsers";
import { Profile } from "@/schemas/profile";
import { getAllUsers } from "../../utils/users/getAllUsers";
import { useReservationsStore } from "@/store/ReservationsStore";
import { ResponseUsersReservations } from "@/schemas/ResponseUserReservations";
import { fecthUsersReservations } from "../../utils/fetchUsersReservations";

const USERS_PER_PAGE = 3;

export const ListUsersAndSessions = () => {

    const [localUsers, setLocalUsers] = useState<Profile[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<Profile[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [userSelected, setUserSelected] = useState<Profile>();
    const [currentPage, setCurrentPage] = useState(1);

    const currentReservations = useReservationsStore(state => state.allReservations);
    const [localReservations, setLocalReservations] = useState<ResponseUsersReservations[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getAllUsers();
            setLocalUsers(response);
            setFilteredUsers(response);
        };
        fetchUsers();
    }, []);

    const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setCurrentPage(1);
        if (value.length > 1) {
            const usersFound = localUsers.filter(user =>
                user.full_name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredUsers(usersFound);
        } else {
            setFilteredUsers(localUsers);
        }
    };

    const handleSelectUser = ({ user }: { user: Profile }) => {
        if (currentReservations.length) {
            const fetchData = async () => {
                const response = await fecthUsersReservations({ reservations: currentReservations });
                const filteredsReservations = response.filter((res: ResponseUsersReservations) => res.email == user.email);
                setLocalReservations(filteredsReservations);
            };
            fetchData();
        }
        setUserSelected(user);
    };

    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
    );

    return (
        <section className="list-users-sessions-section flex mt-10 justify-between gap-x-10 min-h-[30vh]">

            <article className="list-users-article">
                <ListUsers
                    users={paginatedUsers}
                    totalUsers={filteredUsers.length}
                    handleSearch={handleSearchUser}
                    inputValue={inputValue}
                    handleSelect={handleSelectUser}
                    userSelected={userSelected}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </article>

            <article className="list-sessions-article">
                <ListSessions
                    reservations={localReservations}
                    userSelected={userSelected}
                />
            </article>

        </section>
    );
};