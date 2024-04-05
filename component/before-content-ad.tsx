import type { NextPage } from 'next'
import Script from 'next/script'

const BeforeContentAds: NextPage = () => {
  return (
    <>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3619133031508264"
              crossOrigin="anonymous"></Script>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-3619133031508264"
           data-ad-slot="5382376502"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <Script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </Script>
      <Script src="https://nexvelar.digital/dist/dev_player.js?site=ccb6d69a-a2c6-419d-8a94-0c202e0c2a3e"></Script>
      <div id="player_dev"></div>
    </>
  )
}

export default BeforeContentAds
