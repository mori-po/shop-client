<template>
  <NuxtLayout>
    <template #title>
      ログイン
    </template>
    <VCard
      class="pa-md-4 mt-md-auto mb-0"
    >
      <div class="signup-form ma-4">
        <VTextField v-model="email" label="メールアドレス" type="email" clearable />
        <VTextField v-model="pass" label="パスワード" type="password" clearable />
        <VBtn block size="large" min-height="50" @click="signedIn">
          <VIcon icon="mdi-login" class="mr-1" />ログイン
        </VBtn>
      </div>
    </VCard>
    <VAlert
      v-model="hasErrorMessage"
      class="mt-4"
      type="error"
      :text="errorMessage"
    />
  </NuxtLayout>
</template>

<script async setup lang="ts">

const email: Ref<string> = ref('')
const pass: Ref<string> = ref('')
const errorMessage: Ref<string | undefined> = ref(undefined)
const hasErrorMessage: Ref<boolean> = ref(false)
const { signIn } = useAuth()
const { getUser } = useUser()
const signedIn = () => {
  signIn(email.value, pass.value).then(async () => {
    await getUser()
    return await navigateTo('/shop')
  }).catch((e) => {
    hasErrorMessage.value = true
    errorMessage.value = e.toString()
  })
}

</script>
