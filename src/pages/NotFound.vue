<template>
  <div id="run-main">
    <div class="bg-homepage d-flex justify-content-center align-items-center">
      <div class="text-center text-light">
        <p class="fw-bold fs-1 text-color-yellow">VueSurvey, <span class="text-color-blue">{{ $t('not-found.title') }}</span></p>
      </div>
    </div>
    <div class="container my-5">
      <div class="text-center text-sm-start my-5">
        <router-link class="btn btn-dark" to="/"><i class="fas fa-backspace"></i> {{ $t('button.back') }}</router-link>
      </div>
      <video autoplay loop muted playsinline class="img-fluid rounded-3">
        <source src="/img/errors/404.webm" type="video/webm">
      </video>
    </div>
  </div>
</template>