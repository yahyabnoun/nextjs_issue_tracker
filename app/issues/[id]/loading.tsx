import { Heading, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loading = async () => {

  return (
    <div>
      <Heading>
      <Skeleton height={20} width={100} />
      </Heading>

      <Flex gap='3' >
      <Skeleton height={20} width={100} />
      <Skeleton height={20} width={100} />

      </Flex>
      <Card className='prose mt-4'>
        <Skeleton count={3} />
      </Card>
    </div>
  )
}

export default loading