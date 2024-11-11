import { signOut } from "../../../auth";
import { Button } from "@/app/components/ui/button";

export default function SignOutPage() {
    return (
        <div className="flex flex-col gap-2 justify-center text-center">
            <h2 className="text-4xl font-extrabold mb-5 text-center pt-8">Are you sure you want to sign out?</h2>
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