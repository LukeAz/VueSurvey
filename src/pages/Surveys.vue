<template>
  <div class="container text-center mt-4">
    <p class="fs-1">VueSurvey <i>Dashboard</i></p>
    <p>{{ $t('message.surveys.title') }}</p>
    <div class="container bg-light my-3">
      <Survey v-for="x of surveys" :name="x.name" :id="x.id" :deleteSurvey="deleteSurvey"/>
    </div>
    <div class="container bg-light rounded border mb-3">
      <div class="input-group my-2">
        <label class="form-label fw-bolder me-3 mt-2">{{ $t('message.surveys.name') }}</label>
        <input type="text" name="" class="form-control rounded-pill bg-index me-3" v-model="name"> 
        <button @click="create()" class="btn btn-dark btn-block rounded">{{ $t('message.surveys.add') }}</button> 
      </div>
    </div>
    <div v-if="error" class="container mb-3">
      <div v-if="error == 'missing-parameter'" class="alert alert-danger rounded-pill" role="alert">
        {{ $t('message.error.missing-parameter') }}
      </div>
      <div v-else class="alert alert-danger rounded-pill" role="alert">
        {{ $t('message.error.unauthorized') }}
      </div> 
    </div>
  </div> 
</template>

<script>
  import Survey from './components/Survey.vue';
  import axios from 'axios';

  export default {
    data() {
      return {
        surveys: {},
        name: "",
        error: ""    
      }
    },
    components: {
      Survey
    },
    created() {
      axios.get('/api/surveys/getSurveys').then((res) => {
        this.surveys = res.data;
      });
      axios.get('/api/security/csrf').then((res) => {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = res.data.csrf;
      });
    },
    methods: {
      create() {
        axios.post('/api/surveys/create', {name: this.name}).then((res) => {
          this.error = "";
          this.surveys[res.data.id] = res.data;
        }).catch((err) => {
          this.error = err.response.data.message;
        });
      },
      deleteSurvey(id) {
        axios.post('/api/surveys/delete', {id}).then(() => {
          this.error = "";
          delete this.surveys[id];
        }).catch((err) => {
          this.error = err.response.data.message;
        });
      }
    }
  };
</script>