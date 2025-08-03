"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    // If not loading and no session, redirect to login
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Information */}
          <div className="bg-gray-100 border border-gray-200 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-black">User Information</h2>
            <div className="space-y-2 text-gray-900">
              <p><strong className="text-black">ID:</strong> {session.user.id}</p>
              <p><strong className="text-black">Email:</strong> {session.user.email}</p>
              <p><strong className="text-black">Name:</strong> {session.user.name || 'Not set'}</p>
              <p><strong className="text-black">Image:</strong> {session.user.image || 'Not set'}</p>
              <p><strong className="text-black">Email Verified:</strong> {session.user.emailVerified ? 'Yes' : 'No'}</p>
              <p><strong className="text-black">Created At:</strong> {new Date(session.user.createdAt).toLocaleString()}</p>
              <p><strong className="text-black">Updated At:</strong> {new Date(session.user.updatedAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Session Information */}
          <div className="bg-gray-100 border border-gray-200 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-black">Session Information</h2>
            <div className="space-y-2 text-gray-900">
              <p><strong className="text-black">Session ID:</strong> {session.session.id}</p>
              <p><strong className="text-black">User ID:</strong> {session.session.userId}</p>
              <p><strong className="text-black">Expires At:</strong> {new Date(session.session.expiresAt).toLocaleString()}</p>
              <p><strong className="text-black">Created At:</strong> {new Date(session.session.createdAt).toLocaleString()}</p>
              <p><strong className="text-black">Updated At:</strong> {new Date(session.session.updatedAt).toLocaleString()}</p>
              {session.session.ipAddress && <p><strong className="text-black">IP Address:</strong> {session.session.ipAddress}</p>}
              {session.session.userAgent && <p><strong className="text-black">User Agent:</strong> {session.session.userAgent}</p>}
            </div>
          </div>
        </div>

        {/* Raw Session Data */}
        <div className="mt-8 bg-gray-100 border border-gray-200 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-black">Complete Session Object</h2>
          <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto font-mono">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        {/* Actions */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSignOut}
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}