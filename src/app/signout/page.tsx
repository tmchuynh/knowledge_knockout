import { signOut } from "../../backend/auth";
import { Button } from "@/app/components/ui/button";

export default function SignOutPage() {

    return (
        <div className="flex flex-col gap-2 justify-center text-center">
            <h1 className="text-5xl font-extrabold text-stone text-center mb-5">Are you sure you want to sign out?</h1>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <Button
                    variant={"destructive"}
                >
                    See you soon!
                </Button>
            </form>
        </div>
    );
}