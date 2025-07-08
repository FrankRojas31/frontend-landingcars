import { Link } from "react-router";

export default function TerminosCondicionesView() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">TITAN MOTORS</h1>
                <p className="text-gray-300 text-sm">Premium Trucks & Vans</p>
              </div>
            </div>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 lg:p-12 max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Estos términos y condiciones rigen el uso de nuestros servicios de
              venta de camionetas premium y establecen las bases de nuestra
              relación comercial.
            </p>
            <div className="mt-4 inline-flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
              </svg>
              Última actualización: 23 de diciembre de 2024
            </div>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* General Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Términos Generales
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Al utilizar nuestro sitio web y servicios de TITAN MOTORS,
                  usted acepta cumplir con estos términos y condiciones. Estos
                  términos establecen las reglas y regulaciones para el uso de
                  nuestros servicios de venta de camionetas premium.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Debe proporcionar información veraz y actualizada en todo
                      momento
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Nos reservamos el derecho de modificar estos términos sin
                      previo aviso
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Es responsable del uso apropiado de nuestros servicios
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Vehicle Availability */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                </div>
                Disponibilidad de Vehículos
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Inventario
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        La disponibilidad está sujeta a inventario existente
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Los precios pueden variar según disponibilidad
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Reservas
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Las reservas requieren confirmación</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Sujeto a verificación de disponibilidad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                Responsabilidades
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Del Cliente
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Proporcionar información veraz</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Cumplir con los términos acordados</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      De TITAN MOTORS
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Proveer información clara y precisa</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Mantener la confidencialidad de datos</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">¿Tienes Preguntas?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Nuestro equipo está disponible para aclarar cualquier duda sobre
              nuestros términos y condiciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Volver al Inicio
              </Link>
              <Link
                to="/aviso-privacidad"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                Aviso de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">TITAN MOTORS</h3>
                <p className="text-gray-400 text-sm">Premium Trucks & Vans</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 TITAN MOTORS. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Especialistas en camionetas premium y vehículos comerciales
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
