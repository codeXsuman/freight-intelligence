import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';
export async function POST(req: Request) { try { const body=await req.json(); const email=String(body.email??'').trim().toLowerCase(); const password=String(body.password??''); if(!email||!password)return NextResponse.json({error:'Email and password are required.'},{status:400}); const user=await prisma.user.findUnique({where:{email}}); if(!user||!(await bcrypt.compare(password,user.passwordHash)))return NextResponse.json({error:'Invalid email or password.'},{status:401}); const token=await createSession(user.id); const res=NextResponse.json({ok:true}); res.cookies.set('session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:604800}); return res;}catch{return NextResponse.json({error:'Invalid request.'},{status:400})} }
