import {NextRequest, NextResponse} from "next/server";
import productSchema from "@/app/api/products/schema";

// Get a list of Products.
export function GET( request: NextRequest ) {

    const products = [
        { id: 1, name: 'Milk', price: 32 },
        { id: 2, name: 'Chocolate', price: 10 },
    ];

    return NextResponse.json( products );
}

// Create new product.
export async function POST( request: NextRequest ) {

    const body = await request.json();

    const parsed = productSchema.safeParse( body );

    if ( ! parsed.success ) {
        return NextResponse.json( parsed.error.errors, { status: 400 } );
    }

    return NextResponse.json( { id: 1, name: body.name, price: body.price }, { status: 201 } );
}