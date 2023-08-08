import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, it } from 'vitest'
import { primary, secondary } from '../ContactForm/Types'
import Button from './Button'

it('component renders with primary option', async () => {
  const buttonText = 'Test'
  const regex = new RegExp(buttonText, 'i')
  render(<Button buttonHierarchy={primary} buttonText={buttonText} />)

  expect(screen.getByText(regex)).toBeDefined()
})
