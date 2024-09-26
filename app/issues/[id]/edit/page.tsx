import React from 'react'
import IssueFrom from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

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