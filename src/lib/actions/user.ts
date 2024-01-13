'use server'

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth.config';
import { di } from '@/di/DependenciesLocator';
import { Role } from '@/domain/model';

export const changeUserRole = async (userId: string, role: Role) => {
  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado como admin'
    }
  }

  try {
    await di.ChangeRoleUseCase.execute(userId, role)
    revalidatePath('/admin/users')
    return {
      ok: true,
      message: ''
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el rol'
    }
  }
}