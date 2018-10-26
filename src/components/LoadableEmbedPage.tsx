import * as React from 'react'
import * as Loadable from 'react-loadable'

export default function (opts) {
  return Loadable(
    Object.assign(
      {
        loading: props => <div {...props} />,
        delay: 200,
        timeout: 10000
      },
      opts
    )
  )
}
