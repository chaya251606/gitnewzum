const HeaderAds = () => {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-VL0P71V9DC"></script>
      <script>
        // Khởi tạo dataLayer nếu nó chưa tồn tại
        if (!window.dataLayer) {
          window.dataLayer = []
        }

        function gtag() {
          window.dataLayer.push.apply(window.dataLayer, arguments)
        }

        gtag('js', new Date());
        gtag('config', 'G-VL0P71V9DC');
      </script>
    </>
  )
}

export default HeaderAds
