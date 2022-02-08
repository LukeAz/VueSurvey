<template>
  <div>
    <div class="bg-homepage d-flex justify-content-center align-items-center">
      <div class="text-center text-light">
        <p class="fw-bold fs-1 text-color-yellow">VueSurvey <span class="text-color-blue">Dashboard</span></p>
      </div>
    </div>
    <div class="container text-center my-5">
      <img src="/img/vue.webp" class="img-fluid mb-3" width="120" height="120" alt="...">
      <p class="fs-1">{{ $t('message.surveys.title') }} &#127916;</p>

      <section>
        <div class="mask d-flex align-items-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12">
                <div class="table-responsive bg-light rounded-3">
                  <table class="table table-striped table-bordered mb-0">
                    <thead class="bg-dark text-light">
                      <tr>
                        <th scope="col"><label for="newsurvey">{{ $t('message.surveys.name') }}</label></th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Survey v-for="x of surveys" :name="x.name" :id="x.id" :deleteSurvey="deleteSurvey"/>
                      <tr>
                        <td><input type="text" id="newsurvey" class="form-control rounded bg-index me-5" v-model="name"></td>
                        <td><button @click="create()" class="btn btn-dark btn-block rounded"><i class="fas fa-plus"></i> {{ $t('message.surveys.add') }}</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div v-if="error" class="container my-3">
        <div v-if="error == 'missing-parameter'" class="alert alert-danger rounded-3" role="alert">
          {{ $t('message.error.missing-parameter') }}
        </div>
        <div v-else class="alert alert-danger rounded-3" role="alert">
          {{ $t('message.error.unauthorized') }}
        </div> 
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