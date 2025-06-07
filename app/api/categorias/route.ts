import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const categorias = await prisma.categoria.findMany()
  return NextResponse.json(categorias)
}

export async function POST(req: Request) {
  const data = await req.json()
  const nueva = await prisma.categoria.create({ data })
  return NextResponse.json(nueva)
}
