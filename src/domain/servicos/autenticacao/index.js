import AuthenticationContext from 'adal-angular/lib/adal.js'

const ambiente = process.env.NODE_ENV === 'production' // npm run build (production)

const endereco = window.location.href

/*
const config = {
  tenant: '28a53cf0-2b18-4b97-9cf7-91838b8a7297',
  clientId: '3614eff8-1a55-4e38-8b72-82c0db4defb4',
  redirectUri: endereco,
  cacheLocation: 'localStorage'
} */

const config = {
  tenant: (ambiente) ? '28a53cf0-2b18-4b97-9cf7-91838b8a7297' : '9cc9a441-3412-48ec-a93e-c24a6966128b', // Se for "produção (npm run build)", autentica na Previ!
  clientId: (ambiente) ? '3614eff8-1a55-4e38-8b72-82c0db4defb4' : '3ebdf970-4eec-4512-b627-3a030cd59965',
  redirectUri: endereco,
  cacheLocation: 'localStorage'
}
export default {
  tenantId: config.tenant,
  authenticationContext: null,
  /**
   * @return {Promise}
   */
  initialize () {
    this.authenticationContext = new AuthenticationContext(config)

    return new Promise((resolve, reject) => {
      if (this.authenticationContext.isCallback(window.location.hash) || window.self !== window.top) {
        // redirect to the location specified in the url params.
        this.authenticationContext.handleWindowCallback()
      } else {
        // try pull the user out of local storage
        let user = this.authenticationContext.getCachedUser()
        if (user) {
          resolve()
        } else {
          this.signIn()
        }
      }
    })
  },
  /**
   * @return {Promise.<String>} A promise that resolves to an ADAL token for resource access
   */
  acquireToken (resource) {
    return new Promise((resolve, reject) => {
      this.authenticationContext.acquireToken(resource === null ? config.clientId : resource, (error, token) => {
        if (error || !token) {
          return reject(error)
        } else {
          return resolve(token)
        }
      })
    })
  },
  /**
   * Issue an interactive authentication request for the current user and the api resource.
   */
  acquireTokenRedirect (resource) {
    this.authenticationContext.acquireTokenRedirect(resource === null ? config.clientId : resource)
  },
  /**
   * @return {Boolean} Indicates if there is a valid, non-expired access token present in localStorage.
   */
  isAuthenticated () {
    // getCachedToken will only return a valid, non-expired token.
    if (this.authenticationContext.getCachedToken(config.clientId)) { return true }
    return false
  },
  /**
   * @return An ADAL user profile object.
   */
  getUserProfile () {
    return this.authenticationContext.getCachedUser().profile
  },
  signIn () {
    this.authenticationContext.login()
  },
  signOut () {
    this.authenticationContext.logOut()
  }
}
