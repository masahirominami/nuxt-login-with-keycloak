import colors from 'vuetify/es5/util/colors'
import path from 'path'
import fs from 'fs'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // https://nuxtjs.org/docs/features/configuration/#edit-host-and-port
  // SSL: https://stackoverflow.com/questions/56966137/how-to-run-nuxt-npm-run-dev-with-https-in-localhost
  server: {
    port: 8080,
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - nuxt-login-with-keycloak',
    title: 'nuxt-login-with-keycloak',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
  },

  router: {
    middleware: ['auth']
  },

  // auth
  auth: {
    strategies: {
      local: false,
      keycloak: {
        scheme: 'oauth2',
        endpoints: {
          authorization: `${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`,
          userInfo: `${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
          token: `${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          logout: `${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout?redirect_uri=` + encodeURIComponent(String(process.env.HOME_URI))
//          authorization: '/auth/realms/demo/protocol/openid-connect/auth',
//          token: '/auth/realms/demo/protocol/openid-connect/token',
//          userInfo: '/auth/realms/demo/protocol/openid-connect/userinfo',
//          logout: '/auth/realms/demo/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent('https://localhost:3000')
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 300
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: 'oidc-hello-client',
        scope: ['openid', 'profile', 'email'],
        codeChallengeMethod: 'S256'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/'
    }
  },

  proxy: {
    '/auth': {
      target: 'https://keycloak.minamirnd.work'
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
