import {useEffect} from 'react';

const ScrollToTop = () => {

  useEffect(() => {
    window.scrollTo(0, 0) 
    // eslint-disable-next-line
  }, [])
  return null;
}

export default ScrollToTop;
