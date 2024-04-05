import Script from 'next/script';
import React, {useEffect} from 'react';

const HeaderAds = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);


  useEffect(() => {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3619133031508264"
              crossOrigin="anonymous"></script>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-3619133031508264"
           data-ad-slot="9545453925"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </>
  )
}

export default HeaderAds
