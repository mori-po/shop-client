<template>
  <NuxtLayout name="shop">
    <template #title>
      コード読み取り
    </template>
    <ClientOnly>
      <QrcodeStream :camera="camera" @decode="onDecode" @init="onInit">
        <div v-if="camera=='off'" class="d-flex justify-center align-center h-100">
          <VProgressCircular v-if="loading" indeterminate color="primary" size="50" class="d-block" />
          <VBtn v-if="!loading" xlarge class="pa-3" @click="unpause">
            <VIcon icon="mdi-qrcode-scan" />カメラ起動
          </VBtn>
        </div>
      </QrcodeStream>
    </ClientOnly>
    <VDialog v-model="checked">
      <VAlert v-model="hasErrorMessage" color="error">
        {{ errorMessage }}
      </VAlert>
      <VCard :loading="loading">
        <VCardTitle>もりポを利用しますか？</VCardTitle>
        <VCardText>
          {{ ticket?.price ?? '-' }} もりポ
        </VCardText>
        <VCardActions>
          <VBtn xlarge color="secondary" @click="cancel">
            <VIcon icon="mdi-sync-circle" />キャンセル
          </VBtn>
          <VSpacer />
          <VBtn v-if="!hasErrorMessage" xlarge @click="exchange">
            <VIcon icon="mdi-sync-circle" />利用する
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VDialog v-model="done">
      <VCard>
        <VCardTitle class="mx-auto pa-4">
          <VIcon icon="mdi-check-circle-outline" color="success" class="mr-2" size="x-large" />
          完了!
        </VCardTitle>
      </VCard>
    </VDialog>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'
import { getErrorMessage } from '~~/types/error'
import { PointTicketResponse } from '~~/types/shop'

const config = useRuntimeConfig()
const { token, checkAuthState } = useAuth()

const checked: Ref<boolean> = ref(false)
const loading: Ref<boolean> = ref(false)
const done: Ref<boolean> = ref(false)
const nonce: Ref<string> = ref('')

const hasErrorMessage: Ref<boolean> = ref(false)
const errorMessage: Ref<string> = ref('')

const camera: Ref<string> = ref('auto')
const ticket:Ref<PointTicketResponse|null> = ref(null)

definePageMeta({
  middleware: ['auth']
})

async function onDecode (decodedString: string) {
  nonce.value = decodedString
  loading.value = true
  pause()
  // 有効性チェック
  const { data, error } = await useFetch<PointTicketResponse|null>(config.API_ENDPOINT + '/shop/pointticket?nonce=' + decodedString, {
    headers: {
      authorization: `${token.value}`
    },
    watch: [token],
    default: defaultTicket
  })
  if (error.value !== null) {
    hasErrorMessage.value = true
    errorMessage.value = getErrorMessage(error.value.data)
  } else {
    ticket.value = data.value
    hasErrorMessage.value = false
  }
  loading.value = false
  checked.value = true
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
  // 自動ポーズ再設定
  resetAutoPause()
  // トークンチェック
  checkAuthState()
}

function pause () {
  camera.value = 'off'
}

function cancel () {
  unpause()
  checked.value = false
}
const defaultTicket = () => ({
  price: 0
})

async function exchange () {
  unpause()

  loading.value = true
  const { error } = await useFetch(config.API_ENDPOINT + '/shop/pointticket', {
    headers: {
      authorization: `${token.value}`
    },
    method: 'POST',
    watch: [token],
    default: defaultTicket,
    body: { nonce: nonce.value }
  })
  if (error.value !== null) {
    errorMessage.value = getErrorMessage(error.value.data)
    hasErrorMessage.value = true
  } else {
    hasErrorMessage.value = false
    checked.value = false
    done.value = true
    setTimeout(() => {
      done.value = false
    }, 10000)
  }
  loading.value = false
}

let timer = autoPause()

// 自動ポーズ
function autoPause () {
  return setTimeout(() => {
    pause()
  }, 60 * 1000)
}

// 自動ポーズ再設定
function resetAutoPause () {
  if (timer) {
    clearTimeout(timer)
  }
  timer = autoPause()
}

</script>
