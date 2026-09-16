import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from './prisma';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'development-secret-change-me');
export async function createSession(userId:string){return new SignJWT({sub:userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret)}
export async function getSessionUser(){
 const token=(await cookies()).get('session')?.value; if(!token)return null;
 try{const {payload}=await jwtVerify(token,secret); if(!payload.sub)return null; return prisma.user.findUnique({where:{id:String(payload.sub)},select:{id:true,name:true,email:true}})}catch{return null}
}
