// 'use client'

import ContactForm from '@/components/ContactForm/ContactForm'
import { readOnly } from '@/components/ContactForm/Types'
import Link from 'next/link'

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        <div className="flex flex-col pb-4">
          <Link
            className="flex
            justify-center
            pt-4
            text-green-500
            font-bold
            underline"
            href="/contacts"
          >
            Back to Contacts
          </Link>
        </div>
        <div className="pt-2">
          <ContactForm id={params.slug} mode={readOnly} />
        </div>
      </div>
    </div>
  )
}

export default Page
