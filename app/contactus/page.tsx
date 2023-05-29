import Link from 'next/link'

const Page = () => {
  const pages = [
    {
      href: 'contactus/search',
      text: 'Search',
    },
    {
      href: 'contactus/create',
      text: 'Create Contact',
    },
    {
      href: 'contactus/view',
      text: 'View Contacts',
    },
  ]

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <h1 className="pt-8">Contact Us Home</h1>
        <div className="flex flex-col">
          <ul>
            {pages.map((page) => {
              return (
                <li key={page.text}>
                  <Link
                    href={page.href}
                    className="
                    dark:text-green-500
                    no-underline
                    hover:underline-offset-8
                  "
                  >
                    {page.text}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Page
