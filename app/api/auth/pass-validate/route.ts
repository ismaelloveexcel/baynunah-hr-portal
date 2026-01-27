import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth/jwt'

export async function POST(request: NextRequest) {
  try {
    const { passToken } = await request.json()

    if (!passToken) {
      return NextResponse.json(
        { error: 'Pass token is required' },
        { status: 400 }
      )
    }

    // Find user by pass token
    const user = await prisma.user.findUnique({
      where: { passToken },
      include: {
        employee: {
          include: {
            entity: true,
          },
        },
        entity: true,
      },
    })

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid or inactive pass' },
        { status: 401 }
      )
    }

    // Generate JWT
    const jwtToken = signToken({
      userId: user.id,
      role: user.role,
      entityId: user.entityId || undefined,
      passToken: user.passToken,
    })

    // Return user data and token
    return NextResponse.json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        employee: user.employee,
        entity: user.entity,
      },
    })
  } catch (error) {
    console.error('Pass validation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
