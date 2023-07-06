import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  hooks: {
    'vite:extendConfig': (config) => {
          config.plugins!.push(vuetify())
    }
  },
  vite: {
    ssr: {
      noExternal: ['vuetify']
    },
    define: {
      'process.env.DEBUG': false
    }
  },
  css: ['@/assets/main.scss'],
  typescript: {
    shim: true,
    strict: true,
    typeCheck: true
  },
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
      API_ENDPOINT: process.env.API_ENDPOINT || '',
      CUSTOM_POINT_NAME: process.env.CUSTOM_POINT_NAME || 'ポイント',
      CUSTOM_POINT_UNIT: process.env.CUSTOM_POINT_UNIT || 'P',
      CUSTOM_COPYRIGHT: process.env.CUSTOM_COPYRIGHT || '',
      CUSTOM_WEBSITE_URL: process.env.CUSTOM_WEBSITE_URL || ''
    }
  }
})
