import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loading = () => {
  return (
    <>
    
    <Box className='max-w-xl'>
      loading ...
      <Skeleton height={20} />
      <Skeleton height='20rem' />
    </Box>
    
    </>
  )
}

export default loading