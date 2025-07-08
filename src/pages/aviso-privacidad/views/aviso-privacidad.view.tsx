import { Link } from "react-router";

export default function AvisoPrivacidad() {
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Aviso de Privacidad
            </h1>
            <p className="text-gray-600 text-lg">
              Tu privacidad es nuestra prioridad
            </p>
            <div className="mt-4 inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Última actualización: 7 de julio de 2025
            </div>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Compromiso con tu Privacidad
              </h2>
              <p className="text-gray-700 leading-relaxed">
                En <strong>TITAN MOTORS</strong>, nos comprometemos a proteger y
                respetar tu privacidad. Este aviso de privacidad explica cómo
                recolectamos, usamos y protegemos tu información personal cuando
                interactúas con nuestros servicios de venta de camionetas
                premium.
              </p>
            </div>

            {/* Data Collection */}
            <div className="mb-8">
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
                Información que Recolectamos
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Datos Personales
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Nombre completo
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Correo electrónico
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Número de teléfono
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Finalidad
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Contacto comercial
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Envío de información
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Seguimiento de ventas
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Rights */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tus Derechos (ARCO)
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold text-lg">A</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Acceder</h3>
                  <p className="text-gray-600 text-sm">
                    A tus datos personales
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold text-lg">R</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Rectificar
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Información incorrecta
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold text-lg">C</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cancelar</h3>
                  <p className="text-gray-600 text-sm">Uso de tus datos</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold text-lg">O</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Oponerte</h3>
                  <p className="text-gray-600 text-sm">Al tratamiento</p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Medidas de Seguridad
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas de seguridad físicas, técnicas y
                administrativas para proteger tus datos personales contra acceso
                no autorizado, alteración, divulgación o destrucción no
                autorizada.
              </p>
            </div>

            {/* Contact */}
            <div className="text-center bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Preguntas sobre tu Privacidad?
              </h2>
              <p className="text-gray-600 mb-6">
                Para ejercer tus derechos ARCO o resolver cualquier duda,
                contáctanos:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/#contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Formulario de Contacto
                </Link>
                <a
                  href="mailto:info@titanmotors.mx"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  info@titanmotors.mx
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
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
            <span className="text-xl font-bold">TITAN MOTORS</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Titan Motors. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
