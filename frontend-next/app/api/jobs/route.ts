// app/api/jobs/route.ts (Next.js 13 app router API route example)
import { NextResponse } from 'next/server';

const BACKEND_URL = 'https://job-management-admin-interface.onrender.com';
// const BACKEND_URL = "http://localhost:3001"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params = new URLSearchParams();
  if (searchParams.has('job_title')) params.append('job_title', searchParams.get('job_title')!);
  if (searchParams.has('location')) params.append('location', searchParams.get('location')!);
  if (searchParams.has('job_type')) params.append('job_type', searchParams.get('job_type')!);
  if (searchParams.has('min_salary')) params.append('min_salary', searchParams.get('min_salary')!);
//   if (searchParams.has('max_salary')) params.append('max_salary', searchParams.get('max_salary')!);

  const response = await fetch(`${BACKEND_URL}/jobs?${params.toString()}`);
  const data = await response.json();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${BACKEND_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
