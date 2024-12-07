import { Table, Link, Container } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import IssueActions from './_components/IssueActions'
import { IssueStatusBadge } from '@/app/components'
import { Status } from '@prisma/client'

interface Props {
  searchParams : {
    status: Status
  
  }
}
const IssuesPage = async ({searchParams}: Props) => {
  const status = await searchParams


  // Properly filter issues based on status
  const issues = await prisma.issue.findMany(
    {
      where: {
        status: status.status || undefined
      }
    }
  )

  return (
    <div  >
      <Container>
        <IssueActions />

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Description</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

            {issues.map((issue) => {
              return (
                <Table.Row key={issue.id}>
                  <Table.RowHeaderCell>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <div className='block md:hidden'>
                      {issue.status}
                    </div>
                  </Table.RowHeaderCell>
                  <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>{issue.description}</Table.Cell>
                </Table.Row>
              )

            })}
          </Table.Body>

        </Table.Root>
      </Container>


    </div>
  )
}

// export const dynamic = "force-dynamic"

export default IssuesPage
