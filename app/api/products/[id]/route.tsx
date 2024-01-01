import {NextRequest, NextResponse} from "next/server";
import productSchema from "@/app/api/products/schema";

interface Props {
    params: { id: number }
}

// GET single product.
export function GET( request: NextRequest, { params }: Props ) {
    return NextResponse.json( { id: params.id, name: 'Chocolate', price: 10 } );
}

// Update Product.
export async function PUT( request: NextRequest, { params }: Props ) {

    const body = await request.json();

    const product = { id: params.id, name: 'Chocolate', price: 10 };

    const allowedParams = Object.keys( productSchema.shape );

    const allowedParamsLength = allowedParams.length;

    for ( let i = 0; i < allowedParamsLength; i++ ) {

        if ( undefined === body[ allowedParams[ i ] ] ) {
            continue;
        }

        // @ts-ignore
        const parsed = productSchema.shape[ allowedParams[ i ] ].safeParse( body[ allowedParams[ i ] ] );

        if ( ! parsed.success ) {
            return NextResponse.json( parsed.error.errors, { status: 400 } );
        }

        // @ts-ignore
        product[ allowedParams[ i ] ] = body[ allowedParams[ i ] ];

    }

    return NextResponse.json( product );

}

// Delete product.
export function DELETE( request: NextRequest, { params }: Props ) {

    return NextResponse.json( {} );

}