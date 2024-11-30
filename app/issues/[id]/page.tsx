import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
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
        <Grid columns={{ initial: '1', md: '2' }} gap='5'>
          <Box>
            <IssueDetails issue={issue} />
          </Box>
          <Box className='space-x-3'>
            <EditIssueButton issueId={issue.id} />
          </Box>
        </Grid>
      </div>
    </>
  )
}

export default page