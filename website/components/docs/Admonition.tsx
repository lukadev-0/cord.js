import clsx from 'clsx'
import React, { HTMLProps } from 'react'

export interface IAdmonitionBaseProps {
  children: React.ReactNode
  label?: string
}

type AdmonitionProps = HTMLProps<HTMLDivElement>
export default function Admonition({ className, ...props }: AdmonitionProps) {
  return (
    <div className={clsx('p-6 pb-2 rounded-lg mb-1', className)} {...props} />
  )
}

type AdmonitionLabelProps = HTMLProps<HTMLHeadingElement> & {
  icon: React.ReactNode
}
function AdmonitionLabel({
  className,
  children,
  icon,
  ...props
}: AdmonitionLabelProps) {
  return (
    <h5
      className={clsx(
        'font-medium flex items-center text-gray-900 dark:text-gray-100 space-x-2',
        className
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </h5>
  )
}

Admonition.Label = AdmonitionLabel
