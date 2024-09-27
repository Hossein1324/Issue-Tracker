import prisma from '@/prisma/client';
import LatestIssues from './LatestIssues';
import IssueChart from './IssueChart';
import { Grid } from '@radix-ui/themes';

export default async function Home() {
  const open = await prisma.problem.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.problem.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.problem.count({
    where: { status: 'CLOSED' },
  });

  return (
    <Grid columns={{ initial: '1', sm: '2' }} gap='8' >
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />

    </Grid>
  )
}