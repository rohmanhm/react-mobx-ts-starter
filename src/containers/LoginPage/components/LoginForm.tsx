import * as React from 'react'
import { inject, observer } from 'mobx-react'
// Helpers
// Types
import { RootStore } from '~/stores'

interface Props extends RootStore {}

@inject('AuthStore' as keyof RootStore)
@observer
class LoginForm extends React.Component<Props> {
  public componentDidMount () {
    this.props.AuthStore.startFetching()
  }

  public render () {
    return <div>Login</div>
  }
}

export default LoginForm
