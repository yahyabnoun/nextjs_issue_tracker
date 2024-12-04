"use client"
import { Issue, User } from '@prisma/client'
import { Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, isLoading, error } = useUsers()

    if (isLoading) return <Skeleton height='30px' />

    if (error) return null

    const handleAssigneeChange = (userId: string) => {
        const value = userId === " " ? null : userId;
        axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: value })
            .then(() => {
                toast.success('Assignee updated successfully');
            })
            .catch(() => {
                toast.error('Failed to update assignee');
            })
    }

    return (
        <>
            <Select.Root defaultValue={issue.assignedToUserId || " "}
                onValueChange={handleAssigneeChange} >
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

const useUsers = () => useQuery<User[]>(
    {
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 1000 * 60 * 5,  // 5 minutes
        retry: 3
    }
)

export default AssigneeSelect