import Script from 'next/script';

const HeaderAds = () => {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VL0P71V9DC"></Script>
      <Script>
        if (!window.dataLayer) {
          window.dataLayer = []
        }

        function gtag() {
          window.dataLayer.push.apply(window.dataLayer, arguments)
        }

        gtag('js', new Date());
        gtag('config', 'G-VL0P71V9DC');
      </Script>
    </>
  )
}

export default HeaderAds
