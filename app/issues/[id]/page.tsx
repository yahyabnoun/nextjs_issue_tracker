import prisma from '@/prisma/client'
import { Box, Container, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteButton from './DeleteButton'
import { authOptions } from '@/app/auth/authOptions'
import { getServerSession } from 'next-auth'
import AssigneeSelect from './AssigneeSelect'
interface Props { params: { id: string } }


const page = async ({ params }: Props) => {
  const issueId = await params
  const session = await getServerSession(authOptions)

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
      <Container>

        <Grid columns={{ initial: '1', sm: '3' }} gap='5'>
          <Box className='md:col-span-2'>
            <IssueDetails issue={issue} />
          </Box>
          {
            session && <Box >
              <Flex direction='column' gap='4'> 
                <AssigneeSelect issue={issue}/>
                <EditIssueButton issueId={issue.id} />
                <DeleteButton issueId={issue.id} />
              </Flex>
            </Box>

          }


        </Grid>

      </Container>

    </>
  )
}

export default page

