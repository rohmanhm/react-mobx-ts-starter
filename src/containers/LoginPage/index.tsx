import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// Components
// Styled
// Services
import { readAuthentication } from '~/services/Auth'

interface IProps extends RouteComponentProps<{}> {}
class LoginPage extends React.Component<IProps> {
  constructor (props: IProps) {
    super(props)
    /**
     * * Prevent user to relogin after Authenticated.
     */
    const isAuthenticated = readAuthentication()
    if (isAuthenticated) {
      this.props.history.replace('/')
    }
  }

  public render () {
    return <div>Login</div>
  }
}

export default withRouter(LoginPage)
