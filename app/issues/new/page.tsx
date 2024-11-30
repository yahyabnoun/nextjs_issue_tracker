'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/api/issues/validtionSchemas';
import { z } from 'zod';
import { useState } from 'react';
import { Spinner ,ErrorMessage } from '@/app/components'

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuesPage = () => {

    const router = useRouter();
    const [errorserver, setErrorServer] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>(
        { resolver: zodResolver(createIssueSchema) }
    );

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setIsSubmitting(false)
            setErrorServer("An error occurred, please try again later")
        }
    }
    )

    return (<>
    <div className='max-w-xl'>
    {errorserver &&
            <Callout.Root color='red' className='mb-4'>
                <Callout.Text>
                    {errorserver}
                </Callout.Text>
            </Callout.Root>}

        <form className='space-y-3' onSubmit={onSubmit}>
            <TextField.Root placeholder="Title" {...register('title')} />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />} </Button>
        </form>
    </div>

    </>

    );
}

export default NewIssuesPage;
