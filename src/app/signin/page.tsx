import { redirect } from "next/navigation";
import { signIn, auth } from "../../../auth";
import Button from '@/app/components/ui/button';
import Input from '@/app/components/ui/input';
import { AuthError } from "next-auth";

export default async function SignInPage( props: {
    searchParams: { callbackUrl: string | undefined; };
} ) {
    const providerMap = {
        google: { id: 'google', name: 'Google' },
        github: { id: 'github', name: 'GitHub' },
        // Add more providers as needed
    };

    async function signIn( provider: string, options?: Record<string, any> ): Promise<void> {
        "use server";
        try {
            await signIn( provider, options );
        } catch ( error ) {
            if ( error instanceof AuthError ) {
                return redirect( "/auth/error?error=Default" );
            }
            throw error;
        }
    }

    return (
        <div className="flex flex-col gap-2 justify-center">
            {/* ... existing JSX ... */}
            {Object.values( providerMap ).map( ( provider, index ) => (
                <form className="p-10 w-3/4 gap-3 mx-auto text-center"
                    key={provider.id}
                    action={async () => {
                        "use server";
                        try {
                            await signIn( provider.id, {
                                redirectTo: props.searchParams?.callbackUrl ?? "",
                            } );
                        } catch ( error ) {
                            if ( error instanceof AuthError ) {
                                return redirect( "/auth/error?error=Default" );
                            }
                            throw error;
                        }
                    }}
                >
                    <Button
                        label={`Sign in with ${ provider.name }`}
                        type={'submit'}
                    />
                </form>
            ) )}
        </div>
    );
}