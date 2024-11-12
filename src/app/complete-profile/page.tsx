import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CompleteProfile = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState( '' );
    const [lastName, setLastName] = useState( '' );
    const [username, setUsername] = useState( '' );

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
            <h1 className="text-5xl font-extrabold text-stone text-center mb-5">Complete Your Profile</h1>
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
