import {SignJWT, jwtVerify, type JWTPayload} from 'jose';

export const signToken = async (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay jwt secret');
  }

  const jwt = await new SignJWT({_id, email})
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_SEED));
  
  return jwt;
}

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay jwt secret');
  }

  return new Promise(async (resolve, reject) => {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
      const { _id } = payload as {_id: string};
      resolve(_id);
    } catch (error) {
      reject('JWT no es válido');
    }
  });
}
