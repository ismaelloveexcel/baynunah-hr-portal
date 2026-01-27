/**
 * UAE Labor Law Compliance Calculations
 * Based on UAE Federal Decree-Law No. 33 of 2021
 */

/**
 * Calculate gratuity (end of service benefits)
 * Years 1-5: 21 days per year
 * Years 5+: 30 days per year
 */
export function calculateGratuity(
  basicSalary: number,
  joinDate: Date,
  endDate: Date = new Date()
): number {
  const yearsOfService = calculateYearsOfService(joinDate, endDate)
  const dailySalary = basicSalary / 30

  let gratuityDays = 0

  if (yearsOfService <= 5) {
    gratuityDays = yearsOfService * 21
  } else {
    gratuityDays = 5 * 21 + (yearsOfService - 5) * 30
  }

  return Math.round(dailySalary * gratuityDays * 100) / 100
}

/**
 * Calculate years of service
 */
export function calculateYearsOfService(
  joinDate: Date,
  endDate: Date = new Date()
): number {
  const diffTime = Math.abs(endDate.getTime() - joinDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays / 365.25
}

/**
 * Calculate annual leave entitlement
 * 30 calendar days after 1 year of service
 * Pro-rata for partial years
 */
export function calculateAnnualLeave(
  joinDate: Date,
  calculationDate: Date = new Date()
): number {
  const monthsWorked = calculateMonthsWorked(joinDate, calculationDate)
  
  if (monthsWorked < 12) {
    // Pro-rata: 2.5 days per month
    return Math.round((monthsWorked * 2.5) * 10) / 10
  }
  
  return 30
}

/**
 * Calculate months worked
 */
export function calculateMonthsWorked(
  joinDate: Date,
  endDate: Date = new Date()
): number {
  const years = endDate.getFullYear() - joinDate.getFullYear()
  const months = endDate.getMonth() - joinDate.getMonth()
  return years * 12 + months
}

/**
 * Calculate overtime pay
 * Standard: 125% of regular hourly rate
 * Night/Weekend: 150% of regular hourly rate
 */
export function calculateOvertimePay(
  basicSalary: number,
  overtimeHours: number,
  isNightOrWeekend: boolean = false
): number {
  const hourlyRate = basicSalary / (30 * 8) // Assuming 30 days, 8 hours per day
  const multiplier = isNightOrWeekend ? 1.5 : 1.25
  return Math.round(hourlyRate * overtimeHours * multiplier * 100) / 100
}

/**
 * Check if overtime hours exceed legal limits
 * Maximum 2 hours per day
 */
export function isOvertimeExcessive(overtimeHours: number): boolean {
  return overtimeHours > 2
}

/**
 * Check if working hours exceed weekly limit
 * Standard: 48 hours per week
 */
export function isWeeklyHoursExcessive(hoursWorked: number): boolean {
  return hoursWorked > 48
}

/**
 * Calculate sick leave entitlement
 * 90 days per year: 15 full pay, 30 half pay, 45 unpaid
 */
export function calculateSickLeaveStatus(daysUsed: number): {
  fullPay: number
  halfPay: number
  unpaid: number
  exhausted: boolean
} {
  const fullPayDays = Math.min(daysUsed, 15)
  const halfPayDays = Math.min(Math.max(daysUsed - 15, 0), 30)
  const unpaidDays = Math.min(Math.max(daysUsed - 45, 0), 45)
  
  return {
    fullPay: fullPayDays,
    halfPay: halfPayDays,
    unpaid: unpaidDays,
    exhausted: daysUsed >= 90,
  }
}

/**
 * Check if document is expiring soon
 */
export function isDocumentExpiringSoon(
  expiryDate: Date,
  daysThreshold: number = 30
): boolean {
  const today = new Date()
  const diffTime = expiryDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 && diffDays <= daysThreshold
}

/**
 * Check if document is expired
 */
export function isDocumentExpired(expiryDate: Date): boolean {
  return expiryDate < new Date()
}

/**
 * Calculate notice period based on contract type and service duration
 * Unlimited contract: 30 days minimum
 * Limited contract: 30 days or as per contract
 */
export function calculateNoticePeriod(
  contractType: 'UNLIMITED' | 'LIMITED',
  yearsOfService: number
): number {
  if (contractType === 'LIMITED') {
    return 30
  }
  
  // For unlimited contracts, standard is 30 days
  // Can be up to 90 days based on company policy
  if (yearsOfService >= 5) {
    return 90
  } else if (yearsOfService >= 2) {
    return 60
  }
  
  return 30
}

/**
 * Check if probation period is valid
 * Maximum 6 months
 */
export function isProbationPeriodValid(
  joinDate: Date,
  probationEndDate: Date
): boolean {
  const monthsDiff = calculateMonthsWorked(joinDate, probationEndDate)
  return monthsDiff <= 6
}

/**
 * Calculate WPS submission deadline
 * Typically by the 10th of each month
 */
export function getWPSDeadline(month?: number, year?: number): Date {
  const now = new Date()
  const targetMonth = month ?? now.getMonth()
  const targetYear = year ?? now.getFullYear()
  
  return new Date(targetYear, targetMonth, 10, 23, 59, 59)
}

/**
 * Check if WPS submission is overdue
 */
export function isWPSOverdue(): boolean {
  const deadline = getWPSDeadline()
  return new Date() > deadline
}
