import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Farmacia App',
  description: 'Gestión de farmacia con Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-indigo-600">FarmaciaApp</span>
              </div>

              {/* Menu de navegación */}
              <div className="hidden sm:flex sm:items-center sm:space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors"
                >
                  Inicio
                </Link>
                <Link
                  href="/medicamentos"
                  className="text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors"
                >
                  Medicamentos
                </Link>
                <Link
                  href="/categorias"
                  className="text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors"
                >
                  Categorías
                </Link>
              </div>

              {/* Botón menú móvil */}
              <div className="sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                  aria-label="Abrir menú"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menú móvil (oculto por defecto, puedes controlar con estado si quieres animación) */}
            <div className="sm:hidden hidden mt-2" id="mobile-menu">
              <div className="space-y-1">
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded"
                >
                  Inicio
                </Link>
                <Link
                  href="/medicamentos"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded"
                >
                  Medicamentos
                </Link>
                <Link
                  href="/categorias"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded"
                >
                  Categorías
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Farmacia App - Todos los derechos reservados
          </div>
        </footer>
      </body>
    </html>
  )
}
