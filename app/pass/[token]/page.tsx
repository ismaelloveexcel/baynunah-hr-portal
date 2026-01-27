import { prisma } from '@/lib/prisma'
import EmployeePass from '@/components/pass/EmployeePass'

interface PassPageProps {
  params: {
    token: string
  }
}

export default async function PassPage({ params }: PassPageProps) {
  const { token } = params

  // Validate pass token and get user data
  const user = await prisma.user.findUnique({
    where: { passToken: token },
    include: {
      employee: {
        include: {
          entity: true,
        },
      },
      candidate: true,
      hiringManager: true,
      entity: true,
    },
  })

  if (!user || !user.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Invalid Pass
          </h1>
          <p className="text-gray-600">
            This pass is invalid or has been deactivated. Please contact HR for assistance.
          </p>
        </div>
      </div>
    )
  }

  // Route based on user role
  if (user.role === 'EMPLOYEE' && user.employee) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Your Employee Pass
          </h1>
          <EmployeePass
            employee={user.employee}
            user={{
              email: user.email,
              passToken: user.passToken,
            }}
          />
          
          {/* Quick Actions */}
          <div className="max-w-md mx-auto mt-8 grid grid-cols-2 gap-4">
            <a
              href={`/employee/dashboard?token=${token}`}
              className="bg-baynunah-teal text-white text-center font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              📊 Dashboard
            </a>
            <a
              href={`/employee/attendance?token=${token}`}
              className="bg-baynunah-green text-white text-center font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              ⏰ Clock In/Out
            </a>
          </div>
        </div>
      </div>
    )
  }

  // For other roles (candidate, hiring manager) - coming soon
  return (
    <div className="min-h-screen bg-gradient-to-br from-baynunah-teal to-baynunah-green flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
        <div className="text-6xl mb-4">🚧</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Coming Soon
        </h1>
        <p className="text-gray-600">
          The {user.role.toLowerCase()} portal is under development.
        </p>
      </div>
    </div>
  )
}
