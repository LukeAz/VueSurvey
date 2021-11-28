<template>
  <div class="container my-4">
    <div class="text-center text-sm-start">
      <router-link class="btn btn-dark" to="/surveys"><i class="fas fa-backspace"></i> {{ $t('message.general.back') }}</router-link>
    </div>
    <div class="text-center mt-2">
      <p class="fs-1">VueSurvey <i>Editor</i></p>
      <button class="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseChangeName">{{ $t('message.edit.change-name') }}</button>
      <div class="collapse mt-4" id="collapseChangeName">
        <div class="card card-body">
          <label class="form-label fw-bolder">{{ $t('message.edit.now') }} : <i>{{name}}</i></label>
          <div v-if="errorname">
            <div v-if="errorname == 'missing-parameter'" class="alert alert-danger rounded-pill" role="alert">
              {{ $t('message.error.missing-parameter') }}
            </div>
            <div v-else class="alert alert-danger rounded-pill" role="alert">
              {{ $t('message.error.unauthorized') }}
            </div> 
          </div>  
          <div class="input-group">
            <input @keyup.enter="changeName()" type="text" class="form-control rounded-pill bg-index me-2" v-model="newname"> 
            <button @click="changeName()" class="btn btn-dark btn-block rounded">{{ $t('message.edit.apply') }}</button> 
          </div>
        </div>
      </div>
      <div id="survey-creator-container" class="mt-4"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        name: "",
        newname: "",
        errorname: ""
      }
    },
    created() {
      axios.get(`/api/surveys/getSurvey/name/${this.$route.params.id}`).then((res) => {
        this.name = res.data.name;
        this.newname = res.data.name;
      }).catch(() => this.$router.push('/not-found'));
      axios.get('/api/security/csrf').then((res) => {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = res.data.csrf;
      });
    },
    mounted() {
      let id = this.$route.params.id;
      axios.get(`/api/surveys/getSurvey/${id}`).then((res) => {
        let options = {
          questionTypes: [
            "boolean", "checkbox", "comment", "dropdown", "expression", "html", "matrix", 
            "matrixdropdown", "matrixdynamic", "multipletext", "panel", "paneldynamic", 
            "radiogroup", "rating", "text"
          ]
        };
        let creator = new SurveyCreator.SurveyCreator("survey-creator-container", options);
        creator.haveCommercialLicense = true;
        creator.text = JSON.stringify(res.data);
        creator.saveSurveyFunc = (saveNo, callback) => {
          axios.post('/api/surveys/changeJson', {
            id: id,
            json: creator.text
          }).then(() => {
            callback(saveNo, true);
          }).catch(() => {
            callback(saveNo, false);
          });
        };
        creator.isAutoSave = true;
        creator.showState = true;
        creator.showOptions = false;
        creator.showPropertyGrid = false;
        creator.showLogicTab = true;
      }).catch(() => this.$router.push('/not-found'));
    },
    methods: {
      changeName() {
        axios.post('/api/surveys/changeName', {name: this.newname, id: this.$route.params.id}).then(() => {
          this.errorname = "";
          this.name = this.newname;
        }).catch((err) => {
          this.errorname = err.response.data.message;
        });
      }
    }
  }
</script>