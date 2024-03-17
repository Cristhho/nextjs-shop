'use server'

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth.config';
import { Role } from '@/domain/model';
import { diInstance, init } from '@/di/CompositionRoot';
import { ChangeRoleUseCase } from '@/domain/useCase';

init();

export const changeUserRole = async (userId: string, role: Role) => {
  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado como admin'
    }
  }

  try {
    await diInstance.get<ChangeRoleUseCase>(ChangeRoleUseCase).execute(userId, role)
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