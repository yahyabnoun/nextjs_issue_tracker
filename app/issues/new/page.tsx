'use client'
import { Button, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface IssueForm {
    title: string;
    description: string;
}
const NewIssuesPage = () => {

    const { register, control, handleSubmit } = useForm<IssueForm>();

    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit((data) => console.log(data))}>
            <TextField.Root placeholder="Title" {...register('title')} />
            <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
            <Button>Submit New Issue</Button>
        </form>
    );
}

export default NewIssuesPage;
