<template>
  <div id="results-main">
    <div class="bg-homepage d-flex justify-content-center align-items-center">
      <div class="text-center text-light">
        <p class="fw-bold fs-1 text-color-yellow">VueSurvey <span class="text-color-blue">Results</span></p>
      </div>
    </div>
    <div class="container text-center my-4">
      <div class="text-center text-sm-start">
        <router-link class="btn btn-dark" to="/surveys"><i class="fas fa-backspace"></i> {{ $t('message.general.back') }}</router-link>
      </div>
      <div v-if="error" class="alert alert-danger rounded-pill mt-4" role="alert">
        {{ $t('message.error.empty-survey') }}
      </div> 
      <div v-else id="survey-results-container" class="mt-4"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        error: ""
      }
    },
    mounted() {
      let id = this.$route.params.id;
      axios.get(`/api/surveys/getSurvey/${id}`).then((questions) => {
        axios.get(`/api/surveys/results/${id}`).then((res) => {
          if(res.data && res.data.length > 0) {
            let survey = new Survey.SurveyModel(questions.data);
            let results = ko.observableArray();
            results(res.data);
            var visPanel = new SurveyAnalytics.VisualizationPanel(
              survey.getAllQuestions(),
              results()
            );
            visPanel.showHeader = false;
            visPanel.render(document.getElementById("survey-results-container"));
          } else {
            this.error = "empty-survey";
          }
        }).catch(() => this.$router.push('/not-found'));
      }).catch(() => this.$router.push('/not-found'));
    }
  }
</script>