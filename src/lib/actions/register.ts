'use server'

import { RegisterUserForm } from '@/domain/model';
import { di } from '@/di/DependenciesLocator';

export async function registerUser(form: RegisterUserForm) {
  try {
    const user = await di.SaveUserUseCase.execute(form.name, form.email, form.password)

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
