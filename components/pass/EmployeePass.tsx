'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Building2, Mail, Phone, MapPin, Calendar } from 'lucide-react'

interface EmployeePassProps {
  employee: {
    firstName: string
    lastName: string
    position: string
    department: string
    employeeNumber: string
    phoneNumber?: string
    entity: {
      name: string
    }
  }
  user: {
    email: string
    passToken: string
  }
}

export default function EmployeePass({ employee, user }: EmployeePassProps) {
  const passUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pass/${user.passToken}`
  
  // vCard format for contact saving
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${employee.firstName} ${employee.lastName}
N:${employee.lastName};${employee.firstName};;;
ORG:${employee.entity.name}
TITLE:${employee.position}
EMAIL:${user.email}
TEL:${employee.phoneNumber || 'N/A'}
END:VCARD`

  return (
    <div className="max-w-md mx-auto">
      {/* Pass Card */}
      <div className="bg-gradient-to-br from-baynunah-teal to-baynunah-green rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm px-6 py-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-sm font-semibold opacity-90">
                EMPLOYEE ID
              </h2>
              <p className="text-white text-xs opacity-75">
                {employee.entity.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white text-2xl font-bold">
                {employee.employeeNumber}
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center py-8 px-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg mb-4">
            <QRCodeSVG
              value={passUrl}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-white text-xs text-center opacity-75 max-w-xs">
            Scan this QR code to access your employee portal or save contact
          </p>
        </div>

        {/* Employee Info */}
        <div className="bg-white/10 backdrop-blur-sm px-6 py-6 space-y-4">
          <div>
            <h3 className="text-white text-2xl font-bold">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-white text-sm opacity-90">
              {employee.position}
            </p>
            <p className="text-white text-xs opacity-75">
              {employee.department}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white text-sm">
              <Mail className="w-4 h-4 opacity-75" />
              <span className="opacity-90">{user.email}</span>
            </div>
            {employee.phoneNumber && (
              <div className="flex items-center space-x-2 text-white text-sm">
                <Phone className="w-4 h-4 opacity-75" />
                <span className="opacity-90">{employee.phoneNumber}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-white text-sm">
              <Building2 className="w-4 h-4 opacity-75" />
              <span className="opacity-90">{employee.entity.name}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/5 px-6 py-3 text-center">
          <p className="text-white text-xs opacity-75">
            This is your official employee identification
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={() => {
            const blob = new Blob([vCard], { type: 'text/vcard' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${employee.firstName}_${employee.lastName}_Contact.vcf`
            link.click()
          }}
          className="w-full bg-white text-baynunah-teal font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          💾 Save Contact
        </button>
        
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Employee Pass',
                text: `${employee.firstName} ${employee.lastName} - ${employee.position}`,
                url: passUrl,
              })
            }
          }}
          className="w-full bg-white/10 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-colors"
        >
          📤 Share Pass
        </button>
      </div>
    </div>
  )
}
