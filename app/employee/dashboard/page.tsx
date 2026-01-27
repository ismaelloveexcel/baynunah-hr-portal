'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Clock, Calendar, FileText, User, Bell } from 'lucide-react'

export default function EmployeeDashboard() {
  const searchParams = useSearchParams()
  const token = searchParams?.get('token')
  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState<any>(null)

  useEffect(() => {
    if (token) {
      // Validate token and load employee data
      fetch('/api/auth/pass-validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passToken: token }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setEmployee(data.user.employee)
          }
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-baynunah-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            Invalid pass token. Please use your employee pass to access this page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-baynunah-teal to-baynunah-green text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome, {employee.firstName}!
              </h1>
              <p className="text-sm opacity-90">{employee.position}</p>
            </div>
            <div className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-baynunah-teal" />
            </div>
            <p className="text-2xl font-bold text-gray-900">8.5h</p>
            <p className="text-sm text-gray-600">Hours Today</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-baynunah-green" />
            </div>
            <p className="text-2xl font-bold text-gray-900">15</p>
            <p className="text-sm text-gray-600">Annual Leave Days</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-600">Pending Requests</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <User className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{employee.profileCompletionPercent}%</p>
            <p className="text-sm text-gray-600">Profile Complete</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
            <Clock className="w-8 h-8 text-baynunah-teal mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Clock In/Out</h3>
            <p className="text-sm text-gray-600">Track your attendance</p>
          </button>

          <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
            <Calendar className="w-8 h-8 text-baynunah-green mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Request Leave</h3>
            <p className="text-sm text-gray-600">Submit leave request</p>
          </button>

          <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
            <FileText className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">My Documents</h3>
            <p className="text-sm text-gray-600">View & upload documents</p>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 pb-4 border-b">
              <div className="bg-green-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Clocked in at 08:45 AM
                </p>
                <p className="text-xs text-gray-600">Today</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pb-4 border-b">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Leave request approved
                </p>
                <p className="text-xs text-gray-600">Yesterday</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Document uploaded: Passport copy
                </p>
                <p className="text-xs text-gray-600">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
