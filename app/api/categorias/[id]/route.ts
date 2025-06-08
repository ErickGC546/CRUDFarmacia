import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, context: unknown) {
  const { params } = context as { params: { id: string } }
  const id = parseInt(params.id)

  const categoria = await prisma.categoria.findUnique({
    where: { id }
  })

  if (!categoria) {
    return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 })
  }

  return NextResponse.json(categoria)
}

export async function PUT(req: Request, context: unknown) {
  const { params } = context as { params: { id: string } }
  const id = parseInt(params.id)
  const data = await req.json()
  const updated = await prisma.categoria.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, context: unknown) {
  const { params } = context as { params: { id: string } }
  const id = parseInt(params.id)
  const deleted = await prisma.categoria.delete({ where: { id } })
  return NextResponse.json(deleted)
}
