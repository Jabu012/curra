'use client';

import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import HistoryList from '../_components/HistoryList';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function HistoryPage() {
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
    <div className="p-8 max-w-6xl mx-auto">
      <div className='flex items-center gap-4 mb-8'>
        <Link 
          href="/dashboard"
          className="p-2 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-indigo-600" />
        </Link>
        <h2 className='font-bold text-3xl bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent'>
          Consultation History
        </h2>
      </div>
      
      <HistoryList />
    </div>
  );
}

export default HistoryPage;
