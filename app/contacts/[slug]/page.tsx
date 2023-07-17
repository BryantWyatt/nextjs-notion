'use client'

import ViewContact from '@/components/ViewContact/ViewContact'
import { useGetContactQuery } from '@/redux/slices/contactsSlice'

const Page = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading, error } = useGetContactQuery(params.slug)

  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    } else {
      // you can access all properties of `SerializedError` here
      return <div>{error.message}</div>
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        {isLoading ? (
          <div className="flex justify-center">Loading</div>
        ) : error ? (
          <div className="flex justify-center">{error}</div>
        ) : (
          <div className="pt-4">
            <ViewContact contact={data} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
