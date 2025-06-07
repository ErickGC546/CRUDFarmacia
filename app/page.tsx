export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8 md:p-12">
          {/* Encabezado simple */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              <span className="text-indigo-600">Gestión Farmacéutica</span>
            </h1>
            <p className="text-gray-600">Sistema integral de control de medicamentos</p>
          </div>

          {/* Sección principal de funcionalidades */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Tarjeta Medicamentos */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <span className="text-blue-600 text-xl">💊</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Medicamentos</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Registro completo de medicamentos
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Búsqueda y filtrado avanzado
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Control de existencias y caducidad
                </li>
              </ul>
              <div className="mt-6">
                <a 
                  href="/medicamentos" 
                  className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
                >
                  Administrar Medicamentos
                </a>
              </div>
            </div>

            {/* Tarjeta Categorías */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <span className="text-purple-600 text-xl">🗂️</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Categorías</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Clasificación de medicamentos
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Organización jerárquica
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Asignación múltiple
                </li>
              </ul>
              <div className="mt-6">
                <a 
                  href="/categorias" 
                  className="inline-block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition"
                >
                  Administrar Categorías
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}