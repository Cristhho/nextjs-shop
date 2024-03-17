'use server'

import { RegisterUserForm } from '@/domain/model';
import { diInstance, init } from '@/di/CompositionRoot';
import { SaveUserUseCase } from '@/domain/useCase';

init()

export async function registerUser(form: RegisterUserForm) {
  try {
    const user = await diInstance.get<SaveUserUseCase>(SaveUserUseCase).execute(form.name, form.email, form.password)

    return {
      ok: true,
      user,
      message: ''
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo crear el usuario'
    }
  }
}
