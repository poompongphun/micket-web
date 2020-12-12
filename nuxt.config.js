import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'Micket',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/stylesheet.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // nuxt/auth module
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URI || '',
  },

  // router: {
  //   middleware: ['auth'],
  // },

  // Auth module configuration
  auth: {
    redirect: {
      login: '/signin',
      logout: '/',
      callback: '/signin',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
          // required: true,
          // type: 'Bearer',
        },
        user: {
          property: false,
          // autoFetch: true,
        },
        endpoints: {
          login: {
            url: (process.env.API_URI || '') + '/api/auth/login',
            method: 'post',
          },
          logout: false,
          user: {
            url: (process.env.API_URI || '') + '/api/users/me',
            method: 'get',
          },
        },
      },
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          normalText: colors.white,
          navbar: '#202020',
          iconBg: colors.grey.darken3,
        },
        light: {
          primary: colors.blue,
          accent: colors.grey,
          secondary: colors,
          info: colors.teal,
          warning: colors.amber,
          error: colors.deepOrange,
          success: colors.green,
          normalText: '#444',
          navbar: '#F9F9F9',
          iconBg: colors.grey.lighten3,
        },
      },
    },
  },

  env: {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
