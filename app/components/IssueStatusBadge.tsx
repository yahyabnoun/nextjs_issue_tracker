import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<Status, { color: 'red' | "violet" | "green", lable: string }> = {
    CLOSED: {
        color: 'red',
        lable: 'Closed'
    },
    IN_PROGRESS: {
        color: 'violet',
        lable: 'In Progress'
    },
    OPNE: {
        color: 'green',
        lable: 'Open'
    }
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
    console.log(statusMap);
    
    return (
        <div>
            <Badge color={statusMap[status].color}>{statusMap[status].lable}</Badge>
        </div>
    )
}

export default IssueStatusBadge