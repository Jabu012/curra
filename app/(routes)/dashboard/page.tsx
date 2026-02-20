'use client';

import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import DoctorsAgentList from './_components/DoctorsAgentList';
import AddNewSessionDialog from './_components/AddNewSessionDialog';
import Link from 'next/link';
import { History } from 'lucide-react';

function Dashboard() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only check auth after Clerk has loaded
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show nothing while Clerk is initializing
  if (!isLoaded) {
    return null;
  }

  // If not signed in, don't render (wait for redirect)
  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="p-8">
      {/* History Navigation Above */}
      <div className='flex justify-end mb-6'>
        <Link 
          href="/dashboard/history"
          className="p-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 transition-all duration-200 group"
          title="View Consultation History"
        >
          <History className="w-5 h-5" />
        </Link>
      </div>

      {/* Dashboard Header */}
      <div className='flex justify-between items-center mb-8'>
        <h2 className='font-bold text-3xl bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent'>My Dashboard</h2>
        <AddNewSessionDialog />
      
      </div>
      <DoctorsAgentList />
    </div>
   
  );
}

export default Dashboard
