import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'Contacts',
  description: 'Contacts pages',
}

const ContactsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  )
}

export default ContactsLayout
