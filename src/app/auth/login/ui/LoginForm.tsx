'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';

import { authenticate } from '@/lib/actions';

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (errorMessage === 'success') {
      window.location.replace('/');
    }
  }, [errorMessage]);

  return (
    <form className='flex flex-col' action={dispatch}>
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        id='email'
        name='email'
        type='email'
      />

      <label htmlFor='password'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        id='password'
        name='password'
        type='password'
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <div className='flex flex-row mb-5'>
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>

      <LoginButton />

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button className={clsx({
      'btn-primary': !pending,
      'btn-disabled': pending
    })} type='submit' disabled={pending}>Ingresar</button>
  );
}
