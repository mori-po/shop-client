<template>
  <NuxtLayout name="shop">
    <template #title>
      コード読み取り
    </template>
    <VAlert v-model="hasErrorMessage" color="error">
      {{ errorMessage }}
    </VAlert>
    <QrcodeStream :camera="camera" @decode="onDecode" @init="onInit" />
    <VDialog v-model="done">
      <VCard>
        <VCardTitle>ポイントを利用しますか？</VCardTitle>
        <VCardText>
          {{ token }}
        </VCardText>
        <VCardActions>
          <VBtn xlarge color="secondary" @click="cancel">
            <VIcon icon="mdi-sync-circle" />キャンセル
          </VBtn>
          <VSpacer />
          <VBtn xlarge @click="exchange">
            <VIcon icon="mdi-sync-circle" />利用する
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'

const done: Ref<boolean> = ref(false)
const token: Ref<string> = ref('')

const hasErrorMessage: Ref<boolean> = ref(false)
const errorMessage: Ref<string> = ref('')

const camera: Ref<string> = ref('auto')

definePageMeta({
  middleware: ['auth']
})

function onDecode (decodedString: string) {
  token.value = decodedString
  pause()
  done.value = true
}

async function onInit (promise: Promise<void>) {
  try {
    await promise
  } catch (error:any) {
    hasErrorMessage.value = true
    if (error.name === 'NotAllowedError') {
      errorMessage.value = 'ERROR: you need to grant camera access permission'
    } else if (error.name === 'NotFoundError') {
      errorMessage.value = 'ERROR: no camera on this device'
    } else if (error.name === 'NotSupportedError') {
      errorMessage.value = 'ERROR: secure context required (HTTPS, localhost)'
    } else if (error.name === 'NotReadableError') {
      errorMessage.value = 'ERROR: is the camera already in use?'
    } else if (error.name === 'OverconstrainedError') {
      errorMessage.value = 'ERROR: installed cameras are not suitable'
    } else if (error.name === 'StreamApiNotSupportedError') {
      errorMessage.value = 'ERROR: Stream API is not supported in this browser'
    } else if (error.name === 'InsecureContextError') {
      errorMessage.value = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
      errorMessage.value = `ERROR: Camera error (${error.name})`
    }
  }
}

function unpause () {
  camera.value = 'auto'
}

function pause () {
  camera.value = 'off'
}

function cancel () {
  done.value = false
  unpause()
}

function exchange () {
  done.value = false
  unpause()
}
</script>
