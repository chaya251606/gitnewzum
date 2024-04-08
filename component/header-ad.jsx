import React, {useEffect} from 'react';
import Script from 'next/script';

const HeaderAds = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      (window.dataLayer = window.dataLayer || [])
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date());

      gtag('config', 'G-VL0P71V9DC');
    }
  }, []);

  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-VL0P71V9DC"></script>
      <script defer data-domain="traffict4.com" src="https://plausible.io/js/script.js"></script>
    </>
  )
}

export default HeaderAds
