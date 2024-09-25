"use client";
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod'
import { validationSchemas } from '@/app/validationSchemas'
import { z } from "zod";
import Spinner from "@/app/components/Spinner";
import ErrorMessage from "@/app/components/ErrorMessage";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
type IssueForm = z.infer<typeof validationSchemas>
const NewIssuePage = () => {

    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(validationSchemas)
    })
    const onSubmit: SubmitHandler<IssueForm> = async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');

        } catch (error) {
            setSubmitting(true);
            setError('An Unexpected error occurred.');

        }
    };
    return (
        <div className="max-w-xl">
            {error && <Callout.Root color="red" className="mb-5">

                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}

            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root placeholder="Title" {...register('title')}>
                    <TextField.Slot />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting} >Submit New Issues{isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
