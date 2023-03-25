<template>
  <NuxtLayout>
    <template #title>
      ログイン
    </template>
    <VContainer class="h-100">
      <VCard
        class="pa-md-4 ma-md-auto"
      >
        <div class="signup-form ma-4">
          <VTextField v-model="email" label="メールアドレス" type="email" clearable />
          <VTextField v-model="pass" label="パスワード" type="password" clearable />
          <VBtn block size="large" min-height="50" @click="signedIn">
            <VIcon icon="mdi-login" class="mr-1" />ログイン
          </VBtn>
        </div>
        <VDivider />
        <div class="ma-4">
          <VBtn block size="large" min-height="50" @click="signedInGoogle">
            <VIcon icon="mdi-google" class="mr-1" />ログイン
          </VBtn>
        </div>
        <VDivider />
        <div class="ma-4">
          <VBtn block size="large" min-height="50">
            <VIcon icon="mdi-google" class="mr-1" />新規登録
          </VBtn>
        </div>
      </VCard>
      <VAlert
        v-model="hasErrorMessage"
        class="mt-4"
        type="error"
        :text="errorMessage"
      />
    </VContainer>
  </NuxtLayout>
</template>

<script async setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const email: Ref<string> = ref('')
const pass: Ref<string> = ref('')
const errorMessage: Ref<string | undefined> = ref(undefined)
const hasErrorMessage: Ref<boolean> = ref(false)
const { signIn, signInGoogle } = useAuth()
const signedIn = () => {
  signIn(email.value, pass.value).then(async () => {
    return await navigateTo('/shop')
  }).catch((e) => {
    hasErrorMessage.value = true
    errorMessage.value = e.toString()
  })
}

const signedInGoogle = () => {
  signInGoogle().then(async () => {
    return await navigateTo('/shop')
  }).catch((e) => {
    hasErrorMessage.value = true
    errorMessage.value = e.toString()
  })
}

</script>
