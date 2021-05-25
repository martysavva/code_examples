// Libs
import { useState, useEffect } from 'react';


// Hook
const useScrollData = () => {

  // State
  const [hide, setHide] = useState(false);
  //required if scroll up at any point triggers change
  // const [previous, setPrevious] = useState(0);

  // Effect
  useEffect(() => {
    const currentDirection = () => {
      window.scrollY === 0 ? hide && setHide(false) : !hide && setHide(true);

      //required if scroll up at any point triggers change
      // window.scrollY > previous ? !hide && setHide(true) : hide && setHide(false);

      //required if scroll up at any point triggers change
      // setPrevious(window.scrollY);
    };

    window.addEventListener('scroll', currentDirection);

    // clean up
    return ()=>{
      window.removeEventListener('scroll', currentDirection);
    }
  }, [hide]);

  return {directionChange: hide};
};

export default useScrollData;