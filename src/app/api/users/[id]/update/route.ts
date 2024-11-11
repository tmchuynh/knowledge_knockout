import { User } from '@/backend/models';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from "../../../../../backend/auth";

export async function POST( request: NextRequest ) {
    const session = await auth();

    if ( !session ) {
        return NextResponse.json( { error: 'Not authenticated' }, { status: 401 } );
    }

    const { username } = await request.json();

    const existingUser = await User.findOne( { where: { username } } );
    if ( existingUser && existingUser.id !== session.user?.id ) {
        return NextResponse.json( { error: 'Username is already taken' }, { status: 400 } );
    }

    await User.update(
        { username },
        { where: { id: session.user?.id } }
    );

    return NextResponse.json( { message: 'Profile updated' } );
}
