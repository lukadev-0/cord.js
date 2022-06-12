import React from 'react'
import Admonition, { IAdmonitionBaseProps } from './Admonition'

export default function Info({
  label = 'Info',
  children,
}: IAdmonitionBaseProps) {
  return (
    <Admonition className="bg-gray-600/10 border border-gray-500">
      <Admonition.Label
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      >
        {label}
      </Admonition.Label>
      {children}
    </Admonition>
  )
}
