'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Categoria = {
  id: number
  nombre: string
}


export default function EditarMedicamento() {
  const { id } = useParams()
  const router = useRouter()
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [notFound, setNotFound] = useState(false)

  const [medicamento, setMedicamento] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoriaId: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const catResponse = await fetch('/api/categorias')
        if (!catResponse.ok) throw new Error('Error al cargar categorías')
        const catData = await catResponse.json()
        setCategorias(catData)
        
        const medResponse = await fetch(`/api/medicamentos/${id}`)
        if (!medResponse.ok) {
          if (medResponse.status === 404) {
            setNotFound(true)
            return
          }
          throw new Error('Error al cargar medicamento')
        }
        
        const medData = await medResponse.json()
        setMedicamento({
          nombre: medData.nombre,
          precio: medData.precio.toString(),
          stock: medData.stock.toString(),
          categoriaId: medData.categoriaId.toString()
        })
      } catch (error) {
        console.error(error)
        alert('Ocurrió un error al cargar los datos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setMedicamento({ ...medicamento, [name]: value })
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!medicamento.nombre.trim()) errors.nombre = 'Nombre es requerido'
    if (!medicamento.precio) errors.precio = 'Precio es requerido'
    else if (parseFloat(medicamento.precio) <= 0) errors.precio = 'Precio debe ser mayor a 0'
    if (!medicamento.stock) errors.stock = 'Stock es requerido'
    else if (parseInt(medicamento.stock) < 0) errors.stock = 'Stock no puede ser negativo'
    if (!medicamento.categoriaId) errors.categoriaId = 'Debe seleccionar una categoría'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const response = await fetch(`/api/medicamentos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: medicamento.nombre.trim(),
          precio: parseFloat(medicamento.precio),
          stock: parseInt(medicamento.stock),
          categoriaId: parseInt(medicamento.categoriaId)
        })
      })

      if (!response.ok) throw new Error('Error al actualizar medicamento')

      router.push('/medicamentos')
      router.refresh() 
    } catch (error) {
      console.error('Error:', error)
      alert('Ocurrió un error al actualizar el medicamento')
    } finally {
      setLoading(false)
    }
  }

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Medicamento no encontrado</h1>
          <p className="text-gray-600 mb-6">El medicamento que intentas editar no existe o fue eliminado.</p>
          <button
            onClick={() => router.push('/medicamentos')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a la lista
          </button>
        </div>
      </div>
    )
  }

  if (loading && !notFound) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Editar Medicamento</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Medicamento <span className="text-red-500">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              placeholder="Ej: Paracetamol 500mg"
              className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.nombre ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
              value={medicamento.nombre}
            />
            {formErrors.nombre && <p className="mt-1 text-sm text-red-600">{formErrors.nombre}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
                Precio (S/) <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">S/</span>
                </div>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className={`block w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.precio ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={handleChange}
                  value={medicamento.precio}
                />
              </div>
              {formErrors.precio && <p className="mt-1 text-sm text-red-600">{formErrors.precio}</p>}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                placeholder="Cantidad disponible"
                className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.stock ? 'border-red-500' : 'border-gray-300'}`}
                onChange={handleChange}
                value={medicamento.stock}
              />
              {formErrors.stock && <p className="mt-1 text-sm text-red-600">{formErrors.stock}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              id="categoriaId"
              name="categoriaId"
              className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${formErrors.categoriaId ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
              value={medicamento.categoriaId}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((c: Categoria) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
            {formErrors.categoriaId && <p className="mt-1 text-sm text-red-600">{formErrors.categoriaId}</p>}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => router.push('/medicamentos')}
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Actualizando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Actualizar Medicamento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}