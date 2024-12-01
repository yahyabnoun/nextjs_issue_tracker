import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditIssueButton = ({ issueId }: { issueId: Number }) => {
    return (
        <>
        
        <Link href={`/issues/${issueId}/edit`} passHref>
            <Button style={{ width: '100%' }}>
                <Flex align="center" gap="2">
                <Pencil2Icon />
                Edit Issue
                </Flex>
            </Button>
        </Link>

        </>
    )
}

export default EditIssueButton