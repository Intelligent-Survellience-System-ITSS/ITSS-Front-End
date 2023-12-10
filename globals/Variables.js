import { useState } from 'react';

export const useLogged = () => {
  const [logged, setLogged] = useState(false);

  const updateLogged = (value) => {
    setLogged((prevLogged) => {
      console.log("val of logged before state update: " + prevLogged);
      return value;
    });
  };

  console.log("val of logged after updateLogged(): " + logged);

  return { logged, updateLogged };
};
