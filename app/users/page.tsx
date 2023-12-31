import React, {Suspense} from 'react';
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
            <h1>Users</h1>
            <Link href='/users/new' className='btn'>Create new user!</Link>
            <Suspense fallback={ <p>Loading...</p> }>
                <UserTable sortOrder={sortOrder} sortType={sortType}/>
            </Suspense>
        </div>
    );
};

export default UsersPage;