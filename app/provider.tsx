"use client";

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';

export type UsersDetail = {
  name: string,
  email: string,
  credits: number
}


function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


 const {user}=useUser();
 const [userDetail,setUserDetail]=useState<any>();
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      CreateNewUser();
    }
  }, [user]);


const CreateNewUser = async () => {
    try {
      // include credentials so Clerk session cookie is forwarded
      const result = await axios.post('/api/users', {}, { withCredentials: true });
      console.log(result.data);
      setUserDetail(result.data);
    } catch (err) {
      console.error('CreateNewUser failed', err);
    }
  };

  return (
    <div>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        {children}
      </UserDetailContext.Provider>
    </div>
  );
}
export default Provider
