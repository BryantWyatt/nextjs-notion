'use client'

import { useForm } from 'react-hook-form'

const ReactHookFormExample = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
  }

  console.log(watch('example'))

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <h1 className="flex justify-center pt-8">React Hook Form Example</h1>
        <form
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <input
              className="mb-4 dark:text-slate-700"
              defaultValue="test"
              {...register('example')}
            />
            <input
              className="mb-4 dark:text-slate-700"
              {...register('exampleRequired', { required: true })}
            />
            {errors.exampleRequired && <p>This field is required</p>}
            <input
              className="
                                bg-green-500
                                hover:bg-green-700
                                text-white
                                font-bold
                                py-2
                                px-4
                                rounded
                            "
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReactHookFormExample
