<template>
  <VApp>
    <ClientOnly>
      <VAppBar :elevation="2">
        <VImg
          src="/moripo-icon.jpg"
          class="ml-2"
          max-height="40"
          max-width="40"
          contain
          @click="navigateTo('/shop')"
        />
        <VAppBarTitle>
          <slot name="title" />
        </VAppBarTitle>
        <VBtn class="mx-1">
          <VIcon :icon="shop?.icon" class="mr-1" /><span>{{ shop?.name }}</span>
        </VBtn>
        <VAppBarNavIcon icon="mdi-logout" @click="signOut" />
      </VAppBar>
      <VMain>
        <VContainer class="h-100">
          <slot />
        </VContainer>
      </VMain>
      <VBottomNavigation grow>
        <VBtn @click="navigateTo('/shop')">
          <VIcon icon="mdi-store" />
          TOP
        </VBtn>
        <VBtn @click="navigateTo('/shop/scan')">
          <VIcon icon="mdi-qrcode-scan" />
          スキャン
        </VBtn>
        <VBtn @click="navigateTo('/shop/list')">
          <VIcon icon="mdi-view-list-outline" />
          一覧
        </VBtn>
      </VBottomNavigation>
      <VFooter app class="justify-center">
        <a href="https://sites.google.com/view/moripo/home">
          © 2023 Moripo.
        </a>
      </VFooter>
    </ClientOnly>
  </VApp>
</template>

<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth'
import { ShopResponse } from '~~/types/shop'
const { token } = useAuth()
const config = useRuntimeConfig()
const defaultShop = () => ({
  id: 0,
  name: 'None User',
  icon: 'mdi-account'
})
const { data: shop } = await useFetch<ShopResponse>(config.API_ENDPOINT + '/shop', {
  headers: {
    authorization: `Bearer ${token.value}`
  },
  watch: [token],
  default: defaultShop
})

const signOut = () => {
  const { signOut } = useAuth()
  signOut().then(async () => {
    return await navigateTo('/login')
  })
}
</script>
