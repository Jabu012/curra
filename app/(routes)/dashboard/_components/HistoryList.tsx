"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog';

function HistoryList() {
  const [historyList, setHistoryList] = useState([]);

  return (
    <div>
      {historyList.length == 0 ?
        <div className='flex items-center flex-col justify-center gap-5 '>
          <Image src={'/medical-assistance.png'} alt='empty'
           width={150}
           height={150}
            
           />
         <h2 className='font-bold text-xl '>No Recent Consultations</h2>
  <p>It looks like you haven't consulted with any doctors yet.</p>
  <AddNewSessionDialog/>
</div>
: <div>List</div>
      }
    </div>
  )
}

export default HistoryList
