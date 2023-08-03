import ContactFormContainer from '@/components/ContactForm/ContactFormContainer'
import { create } from '@components/ContactForm/Types'

const Page = () => {
  return <ContactFormContainer mode={create} />
}

export default Page
