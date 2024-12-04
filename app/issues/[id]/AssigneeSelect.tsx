"use client"
import { Issue, User } from '@prisma/client'
import { Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, isLoading, error } = useQuery<User[]>(
        {
            queryKey: ['users'],
            queryFn: () => axios.get('/api/users').then(res => res.data),
            staleTime: 1000 * 60,  // 1 minutes
            retry: 3
        }

    )

    if (isLoading) return <Skeleton height='30px' />

    if (error) return null

    return (
        <>
            <Select.Root defaultValue={issue.assignedToUserId || " "}
                onValueChange={(userId) => {
                    const value = userId === " " ? null : userId;
                    axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: value })
                    .then(() => {
                        toast.success('Assignee updated successfully');
                    })
                    .catch(() => {
                        toast.error('Failed to update assignee');
                    })
                }} >
                <Select.Trigger placeholder='Suggestions' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value={" "}>Unassigned</Select.Item>
                        {users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default AssigneeSelect