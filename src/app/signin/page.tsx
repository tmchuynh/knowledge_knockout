import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "../../../auth";
import Button from '@/app/components/ui/button';
import Input from '@/app/components/ui/input';
import { AuthError } from "next-auth";

export default async function SignInPage( props: {
    searchParams: { callbackUrl: string | undefined; };
} ) {
    return (
        <div className="flex flex-col gap-2 justify-center">
            <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Login</h2>
            <form className="p-10 w-3/4 grid gap-6 mx-auto"
                action={async ( formData ) => {
                    "use server";
                    try {
                        await signIn( "credentials", formData );
                    } catch ( error ) {
                        if ( error instanceof AuthError ) {
                            return redirect( "/auth/error?error=Default" );
                        }
                        throw error;
                    }
                }}
            >
                <div className="grid md:grid-cols-1 md:gap-6">
                    <Input
                        id="register_email"
                        type="email"
                        name="email"
                        placeholder="Email address"
                    />
                    <Input
                        id="register_password"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-md w-full px-5 py-2.5 text-center">
                    Submit
                </button>
            </form>
            {Object.values( providerMap ).map( ( provider, index ) => (
                <form className="p-10 w-3/4 gap-3 mx-auto text-center"
                    id={`${ index }`}
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
                        key={index}
                        label={`Sign in with ${ provider.name }`}
                        type={'submit'}
                    />
                </form>
            ) )}
        </div>
    );
}