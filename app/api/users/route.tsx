import {NextRequest, NextResponse} from "next/server";
import userSchema from "@/app/api/users/schema";
import prisma from "@/prisma/prisma";

// Get list of all users.
export async function GET( request: NextRequest ) {
    const userData = await prisma.user.findMany();

    return NextResponse.json( userData );
}

// Create a user.
export async function POST( request: NextRequest ) {
    const body = await request.json();

    const parsed = userSchema.safeParse( body );

    if ( ! parsed.success ) {
        return NextResponse.json( parsed.error.errors, { status: 400 } );
    }

    const user = await prisma.user.findUnique( {
        where: { email: body.email }
    } );

    if ( user ) {
        return NextResponse.json( { error: 'User with the given email already exists.' }, { status: 400 } );
    }

    const newUser = await prisma.user.create( {
        data: {
            name: body.name,
            email: body.email,
        }
    } );

    return NextResponse.json( newUser );
}