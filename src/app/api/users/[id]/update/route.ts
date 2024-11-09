import { User } from '@/backend/models';
import { NextRequest, NextResponse } from 'next/server';
import auth from "../../../../../../auth";

export async function POST( request: NextRequest ) {
    const session = await auth();

    if ( !session ) {
        return NextResponse.json( { error: 'Not authenticated' }, { status: 401 } );
    }

    const { username } = await request.json();

    const existingUser = await User.findOne( { where: { username } } );
    if ( existingUser && existingUser.user_id !== session.user?.id ) {
        return NextResponse.json( { error: 'Username is already taken' }, { status: 400 } );
    }

    await User.update(
        { username },
        { where: { user_id: session.user?.id } }
    );

    return NextResponse.json( { message: 'Profile updated' } );
}
