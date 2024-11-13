'use client';

import "../../styles.css";

const Badge = ( { context, primary, secondary }: { context: string, primary: string, secondary: string; } ) => {

    return (
        <span className={`flex items-center rounded-md bg-${ secondary }-500 px-2 py-1 text-xs font-medium text-${ primary }-600 ring-1 ring-inset ring-${ primary }-500/10`}>{context}</span>
    );
};

export default Badge;
