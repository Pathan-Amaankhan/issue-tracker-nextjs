import React from 'react';
import UserTable from "@/app/users/UserTable";
import Link from "next/link";

interface Props {
    searchParams: {
        sortOrder: string,
        sortType: string,
    }
}

const UsersPage = ( { searchParams: { sortType, sortOrder } }: Props ) => {

    return (
        <div>
            <h3 className="font-bold text-3xl text-center mb-6">User Page</h3>
            <div className="flex justify-center">
                <UserTable sortOrder={sortOrder} sortType={sortType} />
            </div>
            <Link href='/users/new'>Create new user!</Link>
        </div>
    );
};

export default UsersPage;