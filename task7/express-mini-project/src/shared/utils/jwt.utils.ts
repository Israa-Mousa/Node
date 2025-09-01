import jwt, {  JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { string } from 'zod/mini';
import { getEnvOrThrow } from './utils';
//string
const JWT_PAYLOAD={userId:string};
const JWT_SECRET=getEnvOrThrow('JWT_SECRET');
export const signJwt = (
    payload: JwtPayload,
    options?: SignOptions
)  => {
   return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}
//verify

export const verifyJwt =
 (
    token:string,
     )=>{
        return jwt.verify(token,JWT_SECRET) as JwtPayload;
     }