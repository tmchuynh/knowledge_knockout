import { User } from "@/backend/models";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

// Create the router using next-connect
const router = createRouter<NextApiRequest, NextApiResponse>();

// POST route for finding a user by username
router.post( async ( req, res ) => {
    try {
        const { username } = req.body.username;
        const user = await User.findOne( { where: { username } } );
        if ( !user ) {
            return res.status( 404 ).json( { error: "User not found" } );
        }
        console.log( "User found:", user );
        return res.status( 200 ).json( { user } );
    } catch ( error ) {
        console.error( "Error during request handling:", error );
        return res.status( 500 ).json( { error: "Internal Server Error" } );
    }
} );

export default router.handler( {
    onError( err, req, res ) {
        res.status( 500 ).json( {
            error: ( err as Error ).message,
        } );
    },
} );