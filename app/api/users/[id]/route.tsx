import {NextRequest, NextResponse} from "next/server";
import notFound from "@/app/not-found";
import {param} from "ts-interface-checker";
import userSchema from "@/app/api/users/schema";
import {SafeParseReturnType} from "zod";

interface Props {
  params: { id: number }
}

// Get single user's data.
export function GET( request: NextRequest, { params }: Props ) {
    if ( params.id > 10 ) {
        return NextResponse.json( { error: 'User not found' }, { status: 404 } );
    }

    return NextResponse.json( { id: 1, name: 'Amaan', email: 'abc@gmail.com' } );
}

// Update User.
export async function PUT( request: NextRequest, { params }: Props ) {

    if ( params.id > 10 ) {
        return NextResponse.json( { error: 'User not found' }, { status: 404 } );
    }

    const body = await request.json();

    const user = { id: params.id, name: 'Amaan', email: 'abc@gmail.com' };

    const allowedParams = Object.keys( userSchema.shape );

    const allowedParamsLength = allowedParams.length;

    for ( let i = 0; i < allowedParamsLength; i++ ) {

        if ( undefined === typeof body[ allowedParams[ i ] ] ) {
            continue;
        }

        // @ts-ignore
        const parsed: SafeParseReturnType<string, string> = userSchema.shape[ allowedParams[ i ] ].safeParse( body[ allowedParams[ i ] ] );

        if ( ! parsed.success ) {
            return NextResponse.json( parsed.error.errors, { status: 400 } );
        }

        // @ts-ignore
        user[ allowedParams[ i ] ] = body[ allowedParams[ i ] ];
    }

    return NextResponse.json( user, { status: 201 } );
}

// Delete user.
export async function DELETE( request: NextRequest, { params }: Props ) {

    if ( params.id > 10 ) {
        return NextResponse.json( { error: 'User not found' }, { status: 404 } );
    }

    return NextResponse.json( {} );
}