import { User } from '@/backend/models';
import { NextRequest, NextResponse } from 'next/server';

// export async function POST( request: NextRequest ) {

//     const { username } = await request.json();

//     const existingUser = await User.findOne( { where: { username } } );
//     if ( existingUser && existingUser.id !==  ) {
//         return NextResponse.json( { error: 'Username is already taken' }, { status: 400 } );
//     }

//     await User.update(
//         { username },
//         { where: { id: session.user?.id } }
//     );

//     return NextResponse.json( { message: 'Profile updated' } );
// }
