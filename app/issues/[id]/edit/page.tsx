import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@radix-ui/themes'


const IssueFrom = dynamic(() => import('@/app/issues/_components/IssueForm'), {
    ssr: false, loading: () => <Box className='max-w-xl'>
        <Skeleton height='2rem' />
        <Skeleton height='20rem' />
    </Box>
})

interface Props {
    params: { id: string }
}


const EitIssuePage = async ({ params }: Props) => {
    const issue = await prisma.problem.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue) notFound();
    return (
        <div>
            <IssueFrom issue={issue} />
        </div>
    )
}

export default EitIssuePage