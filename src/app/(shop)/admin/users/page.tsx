import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

import { auth } from '@/auth.config';
import { Pagination, Title } from '@/components';
import { di } from '@/di/DependenciesLocator';
import { UsersTable } from './ui/UsersTable';

interface Props {
  searchParams: {
    page?: string; 
  }
}

export default async function UsersPage({ searchParams }: Props) {

  const session = await auth()
  if (!session) redirect('/')
  if (session.user.role !== 'admin') redirect('/')
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { items, totalPages } = await di.GetPaginatedUsersUseCase.execute({ page, take: 10 })

  return (
    <>
      <Title title="Mantenimiento de usuarios" />
      <div className="mb-10">
        <UsersTable users={items} />
        <Pagination totalPages={ totalPages } />
      </div>

    </>
  );
}