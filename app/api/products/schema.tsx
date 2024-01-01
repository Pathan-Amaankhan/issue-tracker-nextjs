import { z } from 'zod';

const productSchema = z.object( {
    name: z.string().min( 2 ),
    price: z.number()
} );

export default productSchema;