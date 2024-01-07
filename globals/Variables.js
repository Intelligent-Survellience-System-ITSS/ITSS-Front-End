import { useState } from 'react';

export const useUserData = () => {
  const [userData, setUserData] = useState({
    email: null,
    designation: null,
    employeeId: null,
    firstName: null,
    lastName: null,
    phoneNumber: null
  });

  const updateUserData = (data) => {
    setUserData(data);
  };

  return { userData, updateUserData };
};