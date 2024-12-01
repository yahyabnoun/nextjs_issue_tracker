'use client'
import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'




const DeleteButton = ({ issueId }: { issueId: Number }) => {
    const Router = useRouter();
    const [errorDelete, setErrorDelete] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)


    const deleteIssue = async () => {
        try {
            setIsDeleting(true)
            await axios.delete(`/api/issues/${issueId}`)
            Router.push('/issues')
        } catch (error) {
            setIsDeleting(false)
            setErrorDelete(true)
        }
    }


    return (
        <>
            
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button disabled={isDeleting} color="red">Delete Issue
                            {isDeleting && <Spinner />}
                        </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                            Are you sure? This application will no longer be accessible and any
                            existing sessions will be expired.
                        </AlertDialog.Description>

                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                                <Button variant="soft" color="gray">
                                    Cancel
                                </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                <Button  variant="solid" color="red" onClick={deleteIssue} >
                                    Delete Issue
                                    
                                </Button>
                            </AlertDialog.Action>
                        </Flex>
                    </AlertDialog.Content>
                </AlertDialog.Root>

                <AlertDialog.Root open={errorDelete}>
                    <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Revoke access</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                            This issue could not be deleted. Please try again later.
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Action>
                                <Button variant="solid" color="gray" onClick={() => setErrorDelete(false)}>
                                    Ok
                                </Button>
                            </AlertDialog.Action>
                        </Flex>
                    </AlertDialog.Content>
                </AlertDialog.Root>

           
        </>
    )
}

export default DeleteButton