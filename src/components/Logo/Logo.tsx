import clsx from 'clsx'
import React from 'react'

interface Props {
  model?: string | undefined
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, model } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  // Change Logo by Model
  let img_src = "./images/logo_manolocapdev_inverted_horizontal.png"
  let logo_className = clsx('max-w-[6.375rem] w-full', className)
  if(model == 'footer'){
    img_src = "./images/cat-logo.png"
    logo_className = clsx('max-w-[10.375rem]', className)
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Manolocap.dev Logo"
      width={200}
      height={200}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={logo_className}
      src={img_src}
    />
  )
}
