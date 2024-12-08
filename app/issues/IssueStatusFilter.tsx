'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams()
    const statuses: { label: string, value?: Status }[] = [
        { label: 'All' },
        { label: 'Open', value: 'OPEN' },
        { label: 'Closed', value: 'CLOSED' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
    ]
    const defaultStatus = searchParams.get('status')
     
    
    return (
        <>
            <Select.Root defaultValue={ defaultStatus || ' '  } onValueChange={(status) => {
                if (status !== ' ') params.append('status', status)
                if (searchParams.get('orderBy'))   params.append('orderBy', searchParams.get('orderBy')!)
                
                const query = params.size ? '?'+params.toString() : ''
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