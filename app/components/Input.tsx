interface InputProps {
  id: string
  label: string
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const Input = ({ id, label, placeholder, value, setValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        className="m-8
                    dark:text-slate-400
                    border-gray-200
                    py-4
                    px-4
                    outline-none
                    border-b
                    bg-transparent
                "
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      ></input>
    </>
  )
}

export default Input
