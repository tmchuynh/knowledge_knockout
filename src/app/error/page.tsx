"use client";

import { secret } from "@/src/backend/utils/secretUtils";
import { useSearchParams } from "next/navigation";

enum Error {
    Configuration = "Configuration",
}

const errorMap = {
    [Error.Configuration]: (
        <p className="text-gray-500 dark:text-gray-400 py-5">
            There was a problem when trying to authenticate. Please contact us if this
            error persists. Unique error code:{`${ secret }`}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
        </p>
    ),
};

export default function AuthErrorPage() {
    const search = useSearchParams();
    const error = search.get( "error" ) as Error;

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <a
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <h5 className="p-8 text-2xl font-extrabold text-center text-gray-900 dark:text-white">
                    Something went wrong
                </h5>
                <div className="font-normal text-gray-700 dark:text-gray-400">
                    {errorMap[error] || "Please contact us if this error persists."}
                </div>
            </a>
        </div>
    );
}