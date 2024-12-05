import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'

const IssueStatusFilter = () => {
    const statuses: { label: string, value?: Status }[] = [
        { label: 'All' },
        { label: 'Open', value: 'OPNE' },
        { label: 'Closed', value: 'CLOSED' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
    ]


    return (
        <>
            <Select.Root>
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