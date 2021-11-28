<template>
  <div class="container my-4">
    <div class="text-center text-sm-start">
      <router-link class="btn btn-dark" to="/"><i class="fas fa-backspace"></i> {{ $t('message.general.back') }}</router-link>
    </div>
    <div class="text-center mt-2">
      <p class="fs-1">VueSurvey, <i>{{ $t('message.not-found.title') }}</i></p>
      <p>{{ $t('message.not-found.text') }}</p>
      <img src="/img/404.gif" class="img-fluid rounded-circle">
    </div>
  </div>
</template>