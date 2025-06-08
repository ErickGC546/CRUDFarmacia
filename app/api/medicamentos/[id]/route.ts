import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, context: unknown) {
  const { params } = context as { params: { id: string } }
  const id = parseInt(params.id)

  const medicamento = await prisma.medicamento.findUnique({
    where: { id },
    include: { categoria: true },
  })

  if (!medicamento) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  return NextResponse.json(medicamento)
}

export async function PUT(req: Request, context: unknown) {
  const { params } = context as { params: { id: string } }
  const id = parseInt(params.id)
  const data = await req.json()

  const actualizado = await prisma.medicamento.update({
    where: { id },
    data,
  })

  return NextResponse.json(actualizado)
}

export async function DELETE(_: Request, context: unknown) {
  const { params } = context as { params: { id: string } }
  const id = parseInt(params.id)

  const eliminado = await prisma.medicamento.delete({
    where: { id },
  })

  return NextResponse.json(eliminado)
}
