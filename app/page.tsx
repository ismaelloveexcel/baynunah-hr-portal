export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-600">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Baynunah HR Portal
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Your comprehensive HR management solution
          </p>
          <p className="text-lg opacity-80">
            UAE Labor Law Compliant • Mobile-First • Smart & Simple
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-2">Employee Access</h2>
              <p className="opacity-90">Use your employee pass to access your portal</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-2">HR Admin</h2>
              <p className="opacity-90">Login to manage employees and system</p>
            </div>
          </div>

          <div className="mt-16 text-sm opacity-75">
            <p>© 2026 Baynunah Group. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ in Abu Dhabi, UAE</p>
          </div>
        </div>
      </div>
    </div>
  )
}
