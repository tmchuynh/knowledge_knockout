"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
];

export function MonthSelector( {
    onMonthSelect,
}: {
    onMonthSelect: ( month: string ) => void;
} ) {
    const [open, setOpen] = React.useState( false );
    const [value, setValue] = React.useState( "" );

    const handleSelect = ( selectedMonth: string ) => {
        setValue( selectedMonth );
        setOpen( false );
        onMonthSelect( selectedMonth );
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? months.find( ( month ) => month.value === value )?.label
                        : "Select a month..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search month..." />
                    <CommandList>
                        <CommandEmpty>No month found.</CommandEmpty>
                        <CommandGroup>
                            {months.map( ( month ) => (
                                <CommandItem
                                    key={month.value}
                                    value={month.value}
                                    onSelect={( currentValue: string ) => handleSelect( currentValue )}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === month.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {month.label}
                                </CommandItem>
                            ) )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
