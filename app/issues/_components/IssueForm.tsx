"use client";
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/validationSchemas'
import { z } from "zod"
import Spinner from "@/app/components/Spinner";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Problem } from "@prisma/client";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
type IssueFormData = z.infer<typeof issueSchema>

const IssueFrom = ({ issue }: { issue?: Problem }) => {

    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    })
    const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
        try {
            setSubmitting(true);
            if (issue) await axios.patch('/api/issues/' + issue.id, data);
            else await axios.post('/api/issues', data)

            router.push('/issues');

        } catch (error) {
            setSubmitting(false);
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
                <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')}>
                    <TextField.Slot />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting} >
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default IssueFrom;
