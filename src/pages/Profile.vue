<template>
  <div class="container  my-4">
    <div class="text-center text-sm-start">
      <router-link class="btn btn-dark" to="/"><i class="fas fa-backspace"></i> {{ $t('message.general.back') }}</router-link>
    </div>
    <p class="fs-1 text-center mt-2">VueSurvey <i>Profile</i></p>
    <div class="card text-center">
      <div class="card-header">{{ username }}</div>
      <div class="card-body">
        <h5 class="card-title">{{ $t('message.profile.title') }}</h5>
        <p class="card-text text-decoration-underline">{{ $t('message.profile.text') }}</p>
        <p class="card-text max-width500 mx-auto">{{ $t('message.profile.description') }}</p>
        
        <button type="button" class="btn btn-success col-4 me-3" data-bs-toggle="modal" data-bs-target="#changePassword">
          {{ $t('message.profile.change-password') }}
        </button>
        <div class="modal fade" id="changePassword" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ $t('message.profile.change-password') }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div v-if="change_password_error">
                  <div v-if="change_password_error == 'password-not-match'" class="alert alert-danger rounded-pill" role="alert">
                    {{ $t('message.error.password-not-match') }}
                  </div>
                  <div v-else-if="change_password_error == 'password-regex-error'" class="alert alert-danger rounded-pill" role="alert">
                    {{ $t('message.error.password-regex-error') }} [!@#$%^&*-_/]!
                  </div> 
                  <div v-else-if="change_password_error == 'wrong-credentials'" class="alert alert-danger rounded-pill" role="alert">
                    {{ $t('message.error.wrong-credentials') }}
                  </div>
                  <div v-else class="alert alert-danger rounded-pill" role="alert">
                    {{ $t('message.error.unauthorized') }}
                  </div> 
                </div>
                <label class="form-label fw-bolder">{{ $t('message.user.oldpassword') }}</label>
                <input @keyup.enter="" type="password" name="" class="form-control rounded-pill bg-index" v-model="oldpassword"> 
                <label class="form-label mt-3 fw-bolder">{{ $t('message.user.password') }}</label>
                <input @keyup.enter="" type="password" name="" class="form-control rounded-pill bg-index" v-model="password"> 
                <label class="form-label mt-3 fw-bolder">{{ $t('message.user.passwordcheck') }}</label>
                <input @keyup.enter="" type="password" name="" class="form-control rounded-pill bg-index" v-model="passwordcheck"> 
              </div>
              <div class="modal-footer">
                <button @click="changePassword()" type="button" class="btn btn-success">{{ $t('message.profile.save') }}</button>
              </div>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-danger col-4" data-bs-toggle="modal" data-bs-target="#deleteAccount">
          {{ $t('message.profile.delete-account') }}
        </button>
        <div class="modal fade" id="deleteAccount" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ $t('message.profile.delete-account') }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {{ $t('message.profile.warning-delete') }}
              </div>
              <div class="modal-footer">
                <button @click="deleteAccount()" type="button" class="btn btn-danger">{{ $t('message.profile.delete') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="/img/profile.jpg" class="card-img-top">
      <div class="card-footer text-muted">{{ $t('message.profile.thanksgiving') }}</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        username: "",
        oldpassword: "",
        password: "",
        newpassword: "",
        change_password_error: "",
        delete_account_error: "",
        delete_account_modal: "",
        change_password_modal: ""
      }
    },
    created() {
      axios.get('/api/users/data').then((res) => {
        this.username = res.data.username;
      });
      axios.get('/api/security/csrf').then((res) => {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = res.data.csrf;
      });
    },
    mounted() {
      this.delete_account_modal = new bootstrap.Modal(document.getElementById(`deleteAccount`));
      this.change_password_modal = new bootstrap.Modal(document.getElementById(`changePassword`));
    },
    beforeUnmount() {
      if(this.delete_account_modal)
        this.delete_account_modal.hide();
      if(this.change_password_modal)
        this.change_password_modal.hide();
    },
    methods: {
      deleteAccount() {
        axios.post('/api/users/delete').then((res) => {
          this.$router.push('/');
        }).catch((err) => {
          this.delete_account_error = err.response.data.message;
        });
      },
      changePassword() {
        axios.post('/api/users/edit/password', {
          oldpassword: this.oldpassword,
          password: this.password,
          passwordcheck: this.passwordcheck
        }).then(() => {
          this.change_password_error = "";
          this.oldpassword = "";
          this.password = "";
          this.passwordcheck = "";
          this.change_password_modal.hide();
        }).catch((err) => {
          this.change_password_error = err.response.data.message;
        })
      }
    }
  }
</script>