'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const IssueStatusFilter = () => {
    const router = useRouter()

    const statuses: { label: string, value?: Status }[] = [
        { label: 'All' },
        { label: 'Open', value: 'OPEN' },
        { label: 'Closed', value: 'CLOSED' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
    ]


    return (
        <>
            <Select.Root onValueChange={(status) => {
                
                const query = status !== ' '? `?status=${status}` : ''
                console.log(query);
                router.push(`/issues${query}`)
            }}>
                <Select.Trigger placeholder='Filter by status...' />
                <Select.Content>
                    <Select.Group>
                        {statuses.map(status => (
                            <Select.Item key={status.label} value={status.value || ' '}>{status.label}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>

        </>
    )
}

export default IssueStatusFilter