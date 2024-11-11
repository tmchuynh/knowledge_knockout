"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./button"; // Import the Button component
import { Input } from "./input";
import { Popover, PopoverTrigger, PopoverContent } from "@/app/components/ui/popover"; // Import the Popover component
import Link from "./link"; // Assuming Link component is created

// Generalized form configuration with dynamic schema
type FieldConfig = {
    name: string;
    label?: string;
    placeholder?: string;
    validation?: z.ZodType<any, any, any>;
    description?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    linkProps?: { href: string; text: string; icon?: React.ReactNode; };
};

function createFormSchema( fields: FieldConfig[] ) {
    const schema: { [key: string]: z.ZodType<any, any, any>; } = {};
    fields.forEach( ( field ) => {
        if ( field.validation ) {
            schema[field.name] = field.validation;
        }
    } );
    return z.object( schema );
}

type GeneralizedFormProps = {
    fields: FieldConfig[];
    onSubmit: ( data: any ) => void;
    buttonProps?: {
        variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
        size?: "default" | "sm" | "lg" | "icon";
    };
};

export function GeneralizedForm( { fields, onSubmit, buttonProps }: GeneralizedFormProps ) {
    const formSchema = createFormSchema( fields );

    const form = useForm<z.infer<typeof formSchema>>( {
        resolver: zodResolver( formSchema ),
        defaultValues: fields.reduce( ( acc, field ) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, any> ),
    } );

    const handleSubmit = ( data: any ) => {
        onSubmit( data );
    };

    return (
        <form onSubmit={form.handleSubmit( handleSubmit )} className="space-y-6">
            {fields.map( ( field, index ) => (
                <div key={field.name} className="space-y-4">
                    {field.label && (
                        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    )}
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative">
                                <Input
                                    placeholder={field.placeholder}
                                    {...form.register( field.name )} // Use the `register` method for input field registration
                                    {...field.inputProps}
                                />
                            </div>
                        </PopoverTrigger>
                        {field.description && (
                            <PopoverContent className="w-72">
                                <div>{field.description}</div>
                            </PopoverContent>
                        )}
                    </Popover>
                    {field.linkProps && (
                        <Link
                            href={field.linkProps.href}
                            text={field.linkProps.text}
                            icon={field.linkProps.icon}
                        />
                    )}
                </div>
            ) )}
            <Button type="submit" {...buttonProps}>
                Submit
            </Button>
        </form>
    );
}

function zodResolver<FormSchema>( FormSchema: any ) {
    return async ( data: any ) => {
        try {
            FormSchema.parse( data );
            return { values: data, errors: {} };
        } catch ( e: any ) {
            return { values: {}, errors: e.errors };
        }
    };
}
