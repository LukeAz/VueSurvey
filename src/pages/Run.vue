<template>
  <div id="run-main">
    <div class="bg-homepage d-flex justify-content-center align-items-center">
      <div class="text-center text-light">
        <p class="fw-bold fs-1 text-color-yellow">VueSurvey, <span class="text-color-blue">{{ $t('run.title') }}</span></p>
      </div>
    </div>
    <div class="container my-4">
      <div v-if="logged" class="text-center text-sm-start">
        <router-link class="btn btn-dark" to="/surveys"><i class="fas fa-backspace"></i> {{ $t('button.back') }}</router-link>
      </div>
      <div class="text-center mt-2">
        <div id="survey-visualizer-container" class="mt-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        logged: document.cookie ? document.cookie.split('; ').find(c => c.split('=')[0] == 'logged') != undefined : false, 
      }
    },
    mounted() {
      let id = this.$route.params.id;
      axios.get(`/api/surveys/getSurvey/${id}`).then((res) => {
        let model = new Survey.Model(res.data);
        model.onComplete.add((sender) => sender.sendResult(id));
        model.render("survey-visualizer-container");
      }).catch(() => this.$router.push('/not-found'));
    }
  }
</script>