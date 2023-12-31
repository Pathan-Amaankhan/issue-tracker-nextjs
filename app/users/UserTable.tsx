import React from 'react';
import Link from "next/link";
import { sort } from "fast-sort";

interface Props {
    sortOrder: string|null,
    sortType: string|null,
}

interface User {
    id: number,
    name: string,
    email: string,
}

const UserTable = async ( { sortOrder, sortType }: Props ) => {

    let nameSortOrder: string | null;
    let emailSortOrder: string | null;

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    let users = await res.json();

    // Set sort order.
    if ( 'ascending' === sortOrder ) {
        nameSortOrder = 'descending';
        emailSortOrder = 'descending';
    } else {
        nameSortOrder = 'ascending';
        emailSortOrder = 'ascending';
    }

    if ( 'email' === sortType ) {
        nameSortOrder = 'ascending';
    }

    if ( 'name' === sortType ) {
        emailSortOrder = 'ascending';
    }

    // Sort the users w.r.t name/email.
    if ( 'ascending' === sortOrder ) {

        if ( 'name' === sortType ) {
            // @ts-ignore
            users = sort( users ).asc( ( user: User ) => user.name );
        } else {
            // @ts-ignore
            users = sort( users ).asc( ( user: User ) => user.email );
        }
    }

    if ( 'descending' === sortOrder ) {

        if ( 'name' === sortType ) {
            // @ts-ignore
            users = sort( users ).desc( ( user: User ) => user.name );
        } else {
            // @ts-ignore
            users = sort( users ).desc( ( user: User ) => user.email );
        }
    }

    return (
        <table className="text-center">

            <thead>
                <tr>
                    <th>
                        <Link href={'/users?sortType=name&sortOrder=' + nameSortOrder}>
                            Name
                        </Link>
                    </th>
                    <th>
                        <Link href={'/users?sortType=email&sortOrder=' + emailSortOrder}>
                            Email
                        </Link>
                    </th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map( ( user: User ) => (
                        <tr key={ user.id }>
                            <td>{ user.name }</td>
                            <td>{ user.email }</td>
                        </tr>
                    ) )
                }
            </tbody>
        </table>
    );
};

export default UserTable;