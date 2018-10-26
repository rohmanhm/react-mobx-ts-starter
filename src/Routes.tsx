import * as React from 'react'
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom'
// Components
import LoadableEmbedPage from '~/components/LoadableEmbedPage'
// import LoadablePage from '~/components/LoadablePage'
// Helpers
import { removeAuthentication } from '~/services/Auth'

// Pages
const LoginPage = LoadableEmbedPage({
  loader: () => import('~/containers/LoginPage')
})
const HomePage = LoadableEmbedPage({
  loader: () => import('~/containers/HomePage')
})

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={HomePage} />
      <Route path='/login' exact={true} component={LoginPage} />

      {/* tslint:disable jsx-no-lambda */}
      <Route
        path='/logout'
        exact={true}
        render={() => {
          removeAuthentication()
          return <Redirect to={'/'} />
        }}
      />
      {/* tslint:enable */}
    </Switch>
  </BrowserRouter>
)
