import { Box } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueFrom = dynamic(() => import('@/app/issues/_components/IssueForm'), {
    ssr: false, loading: () => <Box className='max-w-xl'>
        <Skeleton height='2rem' />
        <Skeleton height='20rem' />
    </Box>
})

const NewIssueFrom = () => {
    return (
        <div>
            <IssueFrom />
        </div>
    )
}

export default NewIssueFrom