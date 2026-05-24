import { NextResponse } from 'next/server';
import type { ApiSuccessResponse, ApiErrorResponse } from '@/lib/types';

export function success<T>(data: T, status = 200) {
  const body: ApiSuccessResponse<T> = { success: true as const, data };
  return NextResponse.json(body, { status });
}

export function error(message: string, code: string, status = 400, details?: Record<string, unknown>) {
  const body: ApiErrorResponse = {
    success: false as const,
    error: { message, code, details },
  };
  return NextResponse.json(body, { status });
}

export function parseBody<T>(request: Request): Promise<T> {
  return request.json() as Promise<T>;
}