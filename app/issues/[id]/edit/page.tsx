import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Container } from '@radix-ui/themes'

interface Props {
  params: {
    id: string
  }
}
const EditIssuePage = async( {params} : Props) => {
  const issueId = await params

  const issue = await prisma.issue.findUnique(
    {
      where: {
        id: parseInt(issueId.id)
      }
    }
  )
  if (!issue) notFound()

  return (
    <>
      <Container>
        <IssueForm issue={issue}/>
      </Container>
    </>
  )
}

export default EditIssuePage