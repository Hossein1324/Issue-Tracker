import prisma from '@/prisma/client'
import { Flex, Table } from '@radix-ui/themes'
import React from 'react'
import Link from 'next/link'
import IssueStatusBadge from './components/IssueStatusBadge'

const LatestIssues = async () => {
    const issues = await prisma.problem.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
    })
    return (
        <div>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue => <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Flex direction='column' align='start' gap='2'>
                                <Link href={`/issues/${issue.id}`}> {issue.title}</Link>
                                <IssueStatusBadge status={issue.status} />
                            </Flex>

                        </Table.Cell>
                    </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default LatestIssues