import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CompleteProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [firstName, setFirstName] = useState( '' );
    const [lastName, setLastName] = useState( '' );
    const [username, setUsername] = useState( '' );

    useEffect( () => {
        if ( !session ) {
            router.push( '/auth/signin' );
        }
    }, [session, router] );

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();

        await fetch( '/api/user/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { firstName, lastName, username } ),
        } );

        router.push( '/' );
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Complete Your Profile</h1>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={( e ) => setFirstName( e.target.value )}
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={( e ) => setLastName( e.target.value )}
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={( e ) => setUsername( e.target.value )}
                required
            />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default CompleteProfile;
