import * as React from 'react'
// Hocs
import IsAuthenticated from '~/hocs/IsAuthenticated'
// Components
// Styles

interface IProps {}
export class MainLayout extends React.PureComponent<IProps> {
  public state = {
    collapsed: false
  }

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  public render () {
    return (
      <div>
        Hello
      </div>
    )
  }
}

export default IsAuthenticated(MainLayout, {
  /**
   * * To redirect should defined manually per-page.
   */
  disableRedirect: true,
  /**
   * * Every containers uses this hocs will fetching user data from server.
   */
  fetchUser: true
})
