import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditIssueButton = ({ issueId }: { issueId: Number }) => {
    return (
        <>
            <div>
                <Link href={`/issues/${issueId}/edit`}>
                    <Button >
                        <Pencil2Icon />
                        Edit Issue
                    </Button>
                </Link>
            </div>

        </>
    )
}

export default EditIssueButton