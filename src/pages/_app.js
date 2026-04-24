import '../styles/index.scss'
import '../styles/admin.scss'
import 'sweetalert2/src/sweetalert2.scss'
import "react-toastify/dist/ReactToastify.css";

import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const hideWhatsApp = router.pathname?.startsWith('/admin') ?? false

  return (
    <>
    <Component {...pageProps} /> 
    {!hideWhatsApp ? (
      <FloatingWhatsApp chatMessage='Assalam Walikum , Welcome to Sahulat Qurbani. We are here to assit you.' phoneNumber='923272738989' accountName='Sahulat Qurbani' avatar="https://www.shareicon.net/data/2016/05/27/771332_support_512x512.png" statusMessage='Typically reply within a day'  />
    ) : null}
    </>
  )
}
