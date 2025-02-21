'use client';

import { useAuth } from '@/contexts/auth-context';
import ProtectedRoute from '@/components/protected-route';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </ProtectedRoute>
  );
}