import React from 'react'

type Props = { children: React.ReactNode }

function Container({ children }: Props) {
  return <div className='w-full mx-auto max-w-7xl'>{children}</div>
}

export default Container
