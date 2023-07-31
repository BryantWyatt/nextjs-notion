import ContactForm from '@/components/ContactForm/ContactForm'
import { create } from '@components/ContactForm/Types'

const Page = () => {
  return <ContactForm id={null} mode={create} />
}

export default Page
