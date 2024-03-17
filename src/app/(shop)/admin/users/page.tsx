import { auth } from '@/auth.config';
import { Pagination, Title } from '@/components';
import { UsersTable } from './ui/UsersTable';
import { diInstance } from '@/di/CompositionRoot';
import { GetPaginatedUsersUseCase } from '@/domain/useCase';

interface Props {
  searchParams: {
    page?: string; 
  }
}

export default async function UsersPage({ searchParams }: Props) {
  const session = await auth()
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { items, totalPages } = await diInstance.get<GetPaginatedUsersUseCase>(GetPaginatedUsersUseCase).execute({ page, take: 10 })

  return (
    <>
      <Title title="Mantenimiento de usuarios" />
      <div className="mb-10">
        <UsersTable users={items} currentUser={session!.user.id} />
        <Pagination totalPages={ totalPages } />
      </div>

    </>
  );
}