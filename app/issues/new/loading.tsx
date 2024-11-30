import {Skeleton} from "@/app/components";


const loading = () => {
  return (
    <>
    
    <div className='max-w-xl'>
      <Skeleton height={20} />
      <Skeleton height='20rem' />
    </div>
    
    </>
  )
}

export default loading