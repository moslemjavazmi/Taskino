//backend/auth/utils/generateCode.ts
import crypto from 'crypto'
export const generateCode = (length = 6): string =>{
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  const range = max - min + 1;
  const randomBytes = crypto.randomBytes(4);
  const randomNum = randomBytes.readUInt32BE(0) % range;
  return (min + randomNum).toString()
}