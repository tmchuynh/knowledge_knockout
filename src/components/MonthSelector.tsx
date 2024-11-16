"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
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
