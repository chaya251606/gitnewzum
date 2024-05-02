import type { NextPage } from 'next'
import Script from 'next/script'

const AfterContentAds: NextPage = () => {
  return (
    <>
    <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3619133031508264"
     crossOrigin="anonymous"></Script>
    <ins className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-client="ca-pub-3619133031508264"
        data-ad-slot="7197569719"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <Script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </Script>
    </>
  )
}

export default AfterContentAds
