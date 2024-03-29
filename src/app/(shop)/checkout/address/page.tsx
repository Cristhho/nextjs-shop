import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { auth } from '@/auth.config';
import { diInstance } from '@/di/CompositionRoot';
import { GetAddressUseCase, GetAllCountriesUseCase } from '@/domain/useCase';

export default async function AddressPage() {
  const session = await auth()
  const countries = await diInstance.get<GetAllCountriesUseCase>(GetAllCountriesUseCase).execute()

  if (!session) return <></>

  const address = await diInstance.get<GetAddressUseCase>(GetAddressUseCase).execute(session.user.id)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries} dbAddress={address ?? undefined} />

      </div>
    </div>
  );
}