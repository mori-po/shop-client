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
          @click="navigateTo('/')"
        />
        <VAppBarTitle>
          <slot name="title" />
        </VAppBarTitle>
      </VAppBar>
      <VMain>
        <VContainer class="h-100">
          <slot />
        </VContainer>
      </VMain>
      <VFooter app class="justify-center">
        © 2023 Moripo.
      </VFooter>
    </ClientOnly>
  </VApp>
</template>
