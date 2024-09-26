import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react'
import { Box } from '@radix-ui/themes'

const LoadingEditPage = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton height='2rem' />
            <Skeleton height='20rem' />
        </Box>
    )
}

export default LoadingEditPage