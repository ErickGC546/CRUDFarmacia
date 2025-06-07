'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
type Categoria = {
  id: number
  nombre: string
}

export default function NuevoMedicamento() {
  const router = useRouter()
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [med, setMed] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoriaId: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch('/api/categorias')
        const data = await res.json()
        setCategorias(data)
      } catch (error) {
        console.error('Error al cargar categorías:', error)
      }
    }
    fetchCategorias()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setMed({ ...med, [name]: value })
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!med.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!med.precio) newErrors.precio = 'El precio es requerido'
    else if (parseFloat(med.precio) <= 0) newErrors.precio = 'El precio debe ser mayor a 0'
    if (!med.stock) newErrors.stock = 'El stock es requerido'
    else if (parseInt(med.stock) < 0) newErrors.stock = 'El stock no puede ser negativo'
    if (!med.categoriaId) newErrors.categoriaId = 'Debe seleccionar una categoría'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/medicamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: med.nombre.trim(),
          precio: parseFloat(med.precio),
          stock: parseInt(med.stock),
          categoriaId: parseInt(med.categoriaId)
        })
      })

      if (!response.ok) {
        throw new Error('Error al guardar el medicamento')
      }

      router.push('/medicamentos')
    } catch (error) {
      console.error('Error:', error)
      alert('Ocurrió un error al guardar el medicamento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Registrar Nuevo Medicamento</h1>
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
              className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
              value={med.nombre}
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
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
                  className={`block w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.precio ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={handleChange}
                  value={med.precio}
                />
              </div>
              {errors.precio && <p className="mt-1 text-sm text-red-600">{errors.precio}</p>}
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
                className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
                onChange={handleChange}
                value={med.stock}
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              id="categoriaId"
              name="categoriaId"
              className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.categoriaId ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handleChange}
              value={med.categoriaId}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((c: Categoria) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
            {errors.categoriaId && <p className="mt-1 text-sm text-red-600">{errors.categoriaId}</p>}
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
                  Guardando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar Medicamento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}