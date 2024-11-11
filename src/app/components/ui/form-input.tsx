"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/app/components/hooks/use-toast";
import { Button } from "./button";
import { Input } from "./input";

// Generalized Schema Creation for Form Validation
type FieldConfig = {
    name: string;
    label: string;
    placeholder: string;
    validation: z.ZodType<any, any, any>;  // Use Zod's validation type
    description?: string;
};

// Generate dynamic Zod schema for form fields
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )} className="w-2/3 space-y-6">
                {fields.map( ( field, index ) => (
                    <FormField
                        key={index}
                        control={form.control}
                        name={field.name as any}
                        render={( { field: formField } ) => (
                            <FormItem>
                                <FormLabel>{field.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={field.placeholder} {...formField} />
                                </FormControl>
                                {field.description && <FormDescription>{field.description}</FormDescription>}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ) )}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

// Zod Resolver for react-hook-form
function zodResolver<FormSchema>( FormSchema: any ) {
    return async ( data: any ) => {
        try {
            // Try validating the form data
            FormSchema.parse( data );
            return { values: data, errors: {} };
        } catch ( e: any ) {
            return { values: {}, errors: e.errors };
        }
    };
}
