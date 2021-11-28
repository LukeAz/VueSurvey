<template>
  <div class="container my-4">
    <div class="text-center text-sm-start">
      <router-link class="btn btn-dark" to="/surveys"><i class="fas fa-backspace"></i> {{ $t('message.general.back') }}</router-link>
    </div>
    <div class="text-center mt-2">
      <p class="fs-1">VueSurvey <i>Visualizer</i></p>
      <div id="survey-visualizer-container" class="mt-4"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
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