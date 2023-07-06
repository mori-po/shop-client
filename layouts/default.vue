<template>
  <VApp>
    <ClientOnly>
      <VAppBar :elevation="2">
        <VImg
          src="/icon.jpg"
          class="ml-2"
          max-height="40"
          max-width="40"
          contain
          @click="navigateTo('/')"
        />
        <VAppBarTitle>
          <slot name="title" />
        </VAppBarTitle>
      </VAppBar>
      <VMain>
        <VContainer class="h-100 background">
          <div class="pa-4">
            <VImg
              src="/top_logo.png"
              class="ma-auto"
              max-height="150"
              max-width="300"
            />
          </div>
          <slot />
        </VContainer>
      </VMain>
      <VFooter app class="justify-center">
        <a :href="config.CUSTOM_WEBSITE_URL">
          {{ config.CUSTOM_COPYRIGHT }}
        </a>
      </VFooter>
    </ClientOnly>
  </VApp>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
</script>
<style  lang="scss" scoped>
.background {
  background: url("/background_1120_1120.jpg");
  @media screen and (max-width: 400px) {
    background: url("/background_400_900.jpg");
  }
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}
</style>
