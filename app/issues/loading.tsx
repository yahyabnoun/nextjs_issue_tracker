import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueActions from './components/IssueActions'

const loading = () => {
    const issues = [1, 2, 3, 4, 5]
  return (
    <>
    
    <div  >
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
              <Table.Row>
                <Table.RowHeaderCell>
                    
                    <Skeleton height={20} width={100} />
                  <div className='block md:hidden'>
                    <Skeleton height={20} width={100} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className='hidden md:table-cell'> 
                
                <Skeleton height={20} width={100} />
                 </Table.Cell>
                <Table.Cell className='hidden md:table-cell'> 
                
                <Skeleton height={20} width={100} />
                </Table.Cell>
              </Table.Row>
          )
          
        })}
        </Table.Body>

    </Table.Root>

    </div>
    
    
    </>
  )
}

export default loading