import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
// Services
import { readAuthentication, removeAuthentication } from '~/services/Auth'
// Stores
import { RootStore } from '~/stores'
// Types

export interface IsAuthenticatedOptions {
  redirectTo?: string
  disableRedirect?: boolean
  fetchUser?: boolean
}

export default function IsAuthenticated (
  Comp: React.ComponentType<any>,
  option?: IsAuthenticatedOptions
) {
  interface OwnProps {}
  type Props = OwnProps & RootStore & RouteComponentProps<{}>

  const defaultOptions = {
    redirectTo: '/login',
    fetchUser: true,
    disableRedirect: false
  } as IsAuthenticatedOptions

  const options = {
    ...defaultOptions,
    ...option
  }

  @inject('AuthStore' as keyof RootStore)
  @observer
  class IsAuthenticatedHOC extends React.Component<Props> {
    public token: string

    constructor (props: Props) {
      super(props)

      this.checkAuthorization()
    }

    public checkAuthorization = () => {
      const { AuthStore } = this.props

      this.token = readAuthentication()
      this.ifNullRedirect(this.token)

      if (this.token && !AuthStore.user._id && options.fetchUser) {
        this.getProfile()
      }
    }

    public getProfile = () => {
      const { AuthStore } = this.props

      AuthStore.profile
        .then((res: any) => this.ifNullRedirect(res))
        .catch((_: any) => this.ifNullRedirect(false))
    }

    /**
     * * Logic to redirect the user from response.
     * @param data Response from server after Authenticated.
     */
    public ifNullRedirect (data: any) {
      // First condition, If token is null then redirect
      // Second condition, If disable redirect is false then redirect
      if (!data && !options.disableRedirect) {
        removeAuthentication()

        const redirectPage = options.redirectTo
        this.props.history.replace(redirectPage)
      }
    }

    public render () {
      return <Comp {...this.props} />
    }
  }

  return withRouter(IsAuthenticatedHOC)
}
