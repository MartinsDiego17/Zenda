import { Profile } from "@/schemas/profile";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { CardUser } from "./CardUser";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

interface ListUsersProps {
    users: Profile[];
    totalUsers: number;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    handleSelect: ({ user }: { user: Profile }) => void;
    userSelected: Profile | undefined;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const ListUsers = ({
    users,
    totalUsers,
    handleSearch,
    inputValue,
    handleSelect,
    userSelected,
    currentPage,
    totalPages,
    onPageChange,
}: ListUsersProps) => {

    const getPageNumbers = (): (number | "ellipsis")[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const pages: (number | "ellipsis")[] = [1];
        if (currentPage > 3) pages.push("ellipsis");
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push("ellipsis");
        pages.push(totalPages);
        return pages;
    };

    return (
        <section className="shadow-container">

            <header>
                <h2 className="p-5 border-b flex place-items-center gap-x-4 text-[.8rem] font-bold">
                    <span><Users size={15} className="opacity-60" /></span>
                    <span>Listado de usuarios</span>
                </h2>
                <div className="p-5 py-4">
                    <input
                        className="border w-full rounded-[10px] px-4 py-1.5 input-search-user"
                        onChange={handleSearch}
                        value={inputValue}
                        placeholder="Buscar cliente..."
                    />
                </div>
                <div className="place-items-center flex p-5 py-3 border-y">
                    <h4 className="w-[40%] text-[.7rem] font-bold opacity-50">NOMBRE</h4>
                    <h4 className="w-[60%] text-[.7rem] font-bold opacity-50">EMAIL</h4>
                </div>
            </header>

            <div>
                {users.length ? (
                    <ul>
                        {users.map((user: Profile) => (
                            <li onClick={() => handleSelect({ user })} key={user.id}>
                                <CardUser user={user} isUserSelected={user.id === userSelected?.id} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-5">
                        <p className="text-center text-[.9rem] opacity-60">Sin resultados</p>
                    </div>
                )}
            </div>

            <footer className="p-5 py-3 border-t place-items-center flex  gap-y-3">
                <p className="w-[50%] text-[.8rem] opacity-60">
                    Mostrando {users.length} de {totalUsers} usuario{totalUsers !== 1 && "s"}
                </p>

                {totalPages > 1 && (
                    <Pagination className="w-[50%] flex justify-end">
                        <PaginationContent>

                            <PaginationItem className="flex place-items-center">
                                <button
                                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                                    className={currentPage === 1 ? "flex place-items-center pointer-events-none opacity-40" : "flex place-items-center cursor-pointer"}
                                ><ChevronLeft size={20} strokeWidth={1} /></button>
                            </PaginationItem>

                            {getPageNumbers().map((page, idx) =>
                                page === "ellipsis" ? (
                                    <PaginationItem key={`ellipsis-${idx}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                ) : (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            isActive={page === currentPage}
                                            onClick={() => onPageChange(page)}
                                            className="cursor-pointer"
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}

                            <PaginationItem className="flex place-items-center">
                                <button
                                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                                    className={currentPage === totalPages ? "flex place-items-center pointer-events-none opacity-40" : "flex place-items-center cursor-pointer"}
                                >
                                    <ChevronRight size={20} strokeWidth={1} />
                                </button>
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                )}
            </footer>

        </section>
    );
};