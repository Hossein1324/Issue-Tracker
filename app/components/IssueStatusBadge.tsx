import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<Status, { lable: string, color: 'red' | 'violet' | 'green' }> = {
    OPEN: { lable: 'Open', color: 'red' },
    IN_PROGRESS: { lable: 'In Progrees', color: 'violet' },
    CLOSED: { lable: 'Closed', color: 'green' }
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>{statusMap[status].lable}</Badge>
    )
}

export default IssueStatusBadge