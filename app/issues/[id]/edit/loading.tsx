import { Skeleton } from "@radix-ui/themes"


const loading = async() => {
  return (
    <div className='max-w-xl space-y-3'>

        <Skeleton height="30px" />
        <Skeleton height="20rem" />
        <Skeleton height="30px" width='100px' />

    </div>

  )
}

export default loading