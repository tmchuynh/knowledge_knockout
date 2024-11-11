"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { ToastProvider, ToastViewport } from "./toast";
import { useToast } from "../hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";

type FieldConfig = {
    name: string;
    label: string;
    placeholder: string;
    validation: z.ZodType<any, any, any>;
    description?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

function createFormSchema( fields: FieldConfig[] ) {
    const schema: { [key: string]: z.ZodType<any, any, any>; } = {};
    fields.forEach( ( field ) => {
        schema[field.name] = field.validation;
    } );
    return z.object( schema );
}

type GeneralizedFormProps = {
    fields: FieldConfig[];
    onSubmit: ( data: any ) => void;
};

export function GeneralizedForm( { fields, onSubmit }: GeneralizedFormProps ) {
    const formSchema = createFormSchema( fields );

    const form = useForm<z.infer<typeof formSchema>>( {
        resolver: zodResolver( formSchema ),
        defaultValues: fields.reduce( ( acc, field ) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, any> ),
    } );

    const { toast } = useToast();

    const handleSubmit = ( data: any ) => {
        toast( {
            title: "Form Submitted!",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify( data, null, 2 )}</code>
                </pre>
            ),
        } );


        onSubmit( data );
    };

    return (
        <>
            <ToastProvider>
                <ToastViewport />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit( handleSubmit )} className="space-y-6">
                        {fields.map( ( field, index ) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={field.name as any}
                                render={( { field: formField } ) => (
                                    <FormItem>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Input
                                                        placeholder={field.placeholder}
                                                        {...formField}
                                                        {...field.inputProps}
                                                    />
                                                </PopoverTrigger>

                                                {field.description && (
                                                    <PopoverContent>
                                                        <div>{field.description}</div>
                                                    </PopoverContent>
                                                )}
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) )}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </ToastProvider>
        </>
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
