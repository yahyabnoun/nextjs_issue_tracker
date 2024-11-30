import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { IssueStatusBadge } from '@/app/components'

interface Props { params: { id: string } }


const page = async ({ params }: Props) => {
  const issueId = await params

  if (typeof issueId.id !== "string" || isNaN(Number(issueId.id))) notFound()

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
      <div>
        <Heading>{issue?.title}</Heading>

        <Flex gap='3' >
          <IssueStatusBadge status={issue.status} />
          <p>{issue?.createdAt.toDateString()}</p>

        </Flex>
        <Card className='prose mt-4'>
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
      </div>
    </>
  )
}

export default page