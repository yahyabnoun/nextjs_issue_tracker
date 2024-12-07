import { Table, Container } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import IssueActions from './_components/IssueActions'
import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import Link from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface Props {
  searchParams: {
    status: Status
    orderBy: keyof Issue
  }
}
const IssuesPage = async ({ searchParams }: Props) => {
  const awaitedsearchParams = await searchParams
  const status = awaitedsearchParams.status
  const orderBy = awaitedsearchParams.orderBy
  const columns: {
    lable: string,
    value: keyof Issue,
    className?: string
  }[] = [
      { lable: 'Title', value: 'title' },
      { lable: 'Status', value: 'status', className: 'hidden md:table-cell' },
      { lable: 'Description', value: 'description', className: 'hidden md:table-cell' },
    ]

  // Validate status against allowed Status values
  const validStatuses: Status[] = ['OPEN', 'CLOSED', 'IN_PROGRESS'];
  const isValidStatus = status ? validStatuses.includes(status) : false;
  

    const validorderBy = columns.map(column => column.value)
    const isValidOrderBy = orderBy ? validorderBy.includes(orderBy) : false
    const orderByValue =  isValidOrderBy ?  { [orderBy]: 'asc' as const } : { 'title': 'asc' as const }

    console.log(orderByValue);
    
  // Properly filter issues based on status
  const issues = await prisma.issue.findMany(
    {
      where: {
        ...(isValidStatus && { status }), // Apply status filter only if valid
      },
      orderBy: orderByValue,
    }
  )

  return (
    <div  >
      <Container>
        <IssueActions />

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {
                columns.map((column) => (
                  <Table.ColumnHeaderCell key={column.value} className={column.className}>
                    <Link href={
                      {
                        query: { ...awaitedsearchParams,
                          orderBy: column.value
                        }
                      }
                    }>{column.lable}
                    { column.value == orderBy && <ArrowUpIcon className='inline'/>}
                    
                    </Link>
                  </Table.ColumnHeaderCell>
                ))
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>

            {issues.map((issue) => {
              return (
                <Table.Row key={issue.id}>
                  <Table.RowHeaderCell>
                    <Link className='text-violet-800' href={`/issues/${issue.id}`}>{issue.title}</Link>
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
