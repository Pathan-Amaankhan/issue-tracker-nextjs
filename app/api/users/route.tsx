import {NextRequest, NextResponse} from "next/server";
import userSchema from "@/app/api/users/schema";

// Get list of all users.
export function GET( request: NextRequest ) {
    const userData = [
        { id: 1, name: 'Amaan', email: 'abc@gmail.com' },
        { id: 1, name: 'Mr. Khan', email: 'def@gmail.com' }
    ];

    return NextResponse.json( userData );
}

// Create a user.
export async function POST( request: NextRequest ) {
    const body = await request.json();

    const parsed = userSchema.safeParse( body );

    if ( ! parsed.success ) {
        return NextResponse.json( parsed.error.errors, { status: 400 } );
    }


    return NextResponse.json( { id: 1, name: body.name, email: body.email } );
}