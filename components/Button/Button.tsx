import { MouseEventHandler } from 'react'
import { ButtonHierarchy, primary } from '../ContactForm/Types'

interface ButtonProps {
  buttonHierarchy: ButtonHierarchy
  buttonText: string
  onClick?: () => void | undefined
}

const Button = ({ buttonHierarchy, buttonText, onClick }: ButtonProps) => {
  return (
    <button
      className={
        buttonHierarchy == primary
          ? `
                items-center bg-green-500 hover:bg-green-700
                text-white font-bold py-2 px-4 rounded`
          : `
                justify-content items-center bg-gray-500
                hover:bg-gray-700 text-white font-bold
                rounded py-2 px-4`
      }
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
    >
      {buttonText}
    </button>
  )
}

export default Button
