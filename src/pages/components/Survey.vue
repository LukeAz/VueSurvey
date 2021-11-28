<template>
  <div class="row border-bottom">
    <div class="col-12 col-lg-6 mt-3">
      <p class="fw-bolder">{{ name }}</p>
    </div>
    <div class="col-12 col-lg-6">
      <router-link class="btn btn-outline-success me-2 my-2" :to="`/surveys/run/${id}`" role="button">{{ $t('message.surveys.share') }}</router-link>
      <router-link class="btn btn-outline-warning me-2 my-2" :to="`/surveys/edit/${id}`" role="button">{{ $t('message.surveys.edit') }}</router-link>
      <router-link class="btn btn btn-outline-info me-2 my-2" :to="`/surveys/results/${id}`" role="button">{{ $t('message.surveys.results') }}</router-link>
      <button @click="deleteSurvey(id)" class="btn btn-outline-danger me-2 my-2" role="button">{{ $t('message.surveys.delete') }}</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      id: String,
      deleteSurvey: Function
    }
  };
</script>