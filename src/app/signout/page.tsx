import { Button } from "@/components/ui/button";

export default function SignOutPage() {

    return (
        <div className="flex flex-col gap-2 justify-center text-center">
            <h1 className="text-5xl font-extrabold text-stone text-center mb-5">Are you sure you want to sign out?</h1>
            <Button
                variant={"destructive"}
            >
                See you soon!
            </Button>
        </div>
    );
}