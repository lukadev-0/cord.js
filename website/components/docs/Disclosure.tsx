import { Disclosure as HeadlessDisclosure, Transition } from '@headlessui/react'
import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  label: string
}

export default function Disclosure({ label, children }: Props) {
  return (
    <HeadlessDisclosure>
      {({ open }) => (
        <>
          <HeadlessDisclosure.Button className="flex items-center font-medium text-gray-800 dark:text-gray-200 border border-gray-300 bg-gray-50 w-full rounded-md p-2 dark:border-gray-600 dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={clsx(
                'h-6 w-6 mr-1 transition-transform duration-300',
                {
                  'transform rotate-90': open,
                }
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>

            {label}
          </HeadlessDisclosure.Button>

          <HeadlessDisclosure.Panel className="border border-gray-300 bg-gray-50 rounded-md p-4 mt-1 dark:border-gray-600 dark:bg-gray-800">
            {children}
          </HeadlessDisclosure.Panel>
        </>
      )}
    </HeadlessDisclosure>
  )
}
