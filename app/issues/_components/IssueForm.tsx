'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/api/issues/validtionSchemas';
import { z } from 'zod';
import { useState } from 'react';
import { Spinner ,ErrorMessage } from '@/app/components'
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ( {issue} : { issue?: Issue } ) => {

    const router = useRouter();
    const [errorserver, setErrorServer] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>(
        { resolver: zodResolver(issueSchema) }
    );

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data)
                router.push(`/issues/${issue.id}`)
            }
            else{
                await axios.post('/api/issues', data)
                router.push('/issues')
                router.refresh()
            }

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
            <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')} />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller defaultValue={issue?.title} name='description' control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>
                {issue ? 'Update Issue' : 'Submit New Issue' } {' '} {isSubmitting && <Spinner />} </Button>
        </form>
    </div>

    </>

    );
}

export default IssueForm;
