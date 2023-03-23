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
        <VBtn>
          <VIcon icon="mdi-account" class="mr-1" /><span>{{ accountName }}</span>
        </VBtn>
        <VAppBarNavIcon icon="mdi-logout" @click="signOut" />
      </VAppBar>
      <VMain>
        <VContainer>
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
        © 2023 Moripo.
      </VFooter>
    </ClientOnly>
  </VApp>
</template>

<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth'

const accountName = useState('accountName', () => 'No User')

const signOut = () => {
  const { signOut } = useAuth()
  signOut().then(async () => {
    return await navigateTo('/login')
  })
}
</script>
