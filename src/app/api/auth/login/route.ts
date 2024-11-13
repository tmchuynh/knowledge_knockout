import { User } from "@/backend/models";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';
import { createRouter } from "next-connect";

// Create the router using next-connect
const router = createRouter<NextApiRequest, NextApiResponse>();

// POST route for finding a user by username
// router.post( async ( req, res ) => {
//     try {
//         const { username } = req.body; // Correct destructuring of `req.body`
//         if ( !username ) {
//             return res.status( 400 ).json( { error: "Username is required" } );
//         }

//         const user = await User.findOne( { where: { username } } );
//         if ( !user ) {
//             return res.status( 404 ).json( { error: "User not found" } );
//         }

//         console.log( "User found:", user );
//         return res.status( 200 ).json( { user } );
//     } catch ( error ) {
//         console.error( "Error during request handling:", error );
//         return res.status( 500 ).json( { error: "Internal Server Error" } );
//     }
// } );

export async function POST(
    request: Request,
    props: { params: Promise<{ username: string, password: string; }>; }
) {
    const params = await props.params;

    try {
        const { username, password } = params;

        if ( !username ) {
            return NextResponse.json( { error: 'Username is required' }, { status: 400 } );
        }

        const user = await User.findOne( { where: { username } } );

        if ( !user ) {
            return NextResponse.json( { error: 'Username not found' }, { status: 400 } );
        }

        if ( user.password !== params.password ) {
            return NextResponse.json( { error: 'Invalid password' }, { status: 401 } );
        }

        return NextResponse.json( { user }, { status: 200 } );


    } catch ( error ) {
        console.error( 'Error fetching user:', error );
        return NextResponse.json( { error: 'Internal Server Error' }, { status: 500 } );
    }
}