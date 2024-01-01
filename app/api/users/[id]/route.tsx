import {NextRequest, NextResponse} from "next/server";
import userSchema from "@/app/api/users/schema";
import prisma from "@/prisma/prisma";

interface Props {
  params: { id: string }
}

// Get single user's data.
export async function GET( request: NextRequest, { params }: Props ) {

    const user = await prisma.user.findUnique( {
        where: {
           id: Number.parseInt( params.id ),
        },
    } );

    if ( ! user ) {
        return NextResponse.json( { error: 'User not found' }, { status: 404 } );
    }

    return NextResponse.json( user );
}

// Update User.
export async function PUT( request: NextRequest, { params }: Props ) {

    const body = await request.json();

    const parsed = userSchema.safeParse( body );

    if ( ! parsed.success ) {
        return NextResponse.json( parsed.error.errors, { status: 400 } );
    }

    let user = await prisma.user.findUnique( {
        where: {
            id: parseInt( params.id )
        }
    } );

    if ( ! user ) {
        return NextResponse.json(  { error: 'User does not exits' }, { status: 400 } );
    }

    user = await prisma.user.findUnique( {
        where: { email: body.email }
    } );

    if ( user ) {
        return NextResponse.json(  { error: 'User with the same email already exits' }, { status: 400 } );
    }

    const updatedUser = await prisma.user.update( {
        where: { id: Number.parseInt( params.id ) },
        data: {
            name: body.name,
            email: body.email,
        },
    } );

    return NextResponse.json( updatedUser, { status: 201 } );
}

// Delete user.
export async function DELETE( request: NextRequest, { params }: Props ) {

    const user = await prisma.user.findUnique( {
        where: {
            id: parseInt( params.id )
        }
    } );

    if ( ! user ) {
        return NextResponse.json(  { error: 'User does not exits' }, { status: 400 } );
    }

    const deletedUser = await prisma.user.delete( {
        where: { id: Number.parseInt( params.id ) }
    } );

    return NextResponse.json( { deletedUser } );
}
