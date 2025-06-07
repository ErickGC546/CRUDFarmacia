import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const medicamentos = await prisma.medicamento.findMany({
    include: { categoria: true }, // para traer info de la categoría
  })
  return NextResponse.json(medicamentos)
}

export async function POST(req: Request) {
  const data = await req.json()
  const nuevo = await prisma.medicamento.create({
    data,
  })
  return NextResponse.json(nuevo)
}
