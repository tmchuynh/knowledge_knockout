import * as React from "react";
import { cn } from "@/src/lib/utils";

type LinkProps = {
    href: string;
    text: string;
    icon?: React.ReactNode;
    className?: string;
};

const Link: React.FC<LinkProps> = ( { href, text, icon, className = "" } ) => {
    return (
        <p className="text-gray-500 dark:text-gray-400 py-5">
            <a
                href={href}
                className={cn( "inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline", className )}
            >
                {text}
                {icon && (
                    <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                )}
            </a>
        </p>
    );
};

export default Link;
