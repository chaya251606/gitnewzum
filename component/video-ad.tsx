import type { NextPage } from 'next'
import Script from 'next/script'
import React from 'react'

const VideoAd: NextPage = () => {
  return (
    <>
      <Script src="https://nexvelar.digital/dist/dev_player.js?site=ab813eb1-2dc0-4d0e-ac1f-8f8d28e1a776"></Script>
      <div id="player_dev"></div>
    </>
  )
}

export default VideoAd
