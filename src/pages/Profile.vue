<template>
  <div id="profile-main">
    <div class="bg-homepage d-flex justify-content-center align-items-center">
      <div class="text-center text-light">
        <p class="fw-bold fs-1 text-color-yellow">VueSurvey, <span class="text-color-blue">{{ $t('profile.title') }}</span></p>
      </div>
    </div>

    <div class="container my-4">
      <div class="text-center text-sm-start">
        <router-link class="btn btn-dark" to="/"><i class="fas fa-backspace"></i> {{ $t('button.back') }}</router-link>
      </div>
      <div class="card mt-4 border-5 border-end-0 border-bottom-0 border-top-0 border-dark">
        <div class="card-body row">
          <div class="col-3 d-none d-md-block">
            <img src="/img/homepage/profile.webp" class="img-fluid rounded-3">
          </div>
          <div class="col">
            <p class="fs-3">{{ $t('user.username') }}: <i class="text-color-blue">{{ username }}</i></p>
            <button type="button" class="btn btn-outline-dark col-4 me-3" data-bs-toggle="modal" data-bs-target="#changePassword">
              <i class="fas fa-lock"></i> {{ $t('button.change-password') }}
            </button>
            <button type="button" class="btn btn-danger col-4" data-bs-toggle="modal" data-bs-target="#deleteAccount">
              <i class="fas fa-times-circle"></i> {{ $t('button.delete-account') }}
            </button>
            <p class="mt-3">{{ $t('profile.description') }}</p>
          </div>
        </div>
        <div class="card-footer text-muted text-center">
          {{ $t('profile.thanksgiving') }}
        </div>
      </div>
    </div>

    <div class="modal fade" id="changePassword" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-dark text-light">
            <p class="modal-title h5">{{ $t('button.change-password') }}</p>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <div v-if="change_password_error" class="alert alert-danger rounded-3" role="alert">
              <span v-if="change_password_error == 'password-not-match'">{{ $t('error.password-not-match') }}</span>
              <span v-else-if="change_password_error == 'password-regex-error'">{{ $t('error.password-regex-error') }} [!@#$%^&*-_/]!</span> 
              <span v-else-if="change_password_error == 'wrong-credentials'">{{ $t('error.wrong-credentials') }}</span>
              <span v-else>{{ $t('error.unauthorized') }}</span> 
            </div>
            <label class="form-label fw-bolder"><i class="fas fa-lock"></i> {{ $t('user.oldpassword') }}</label>
            <input @keyup.enter="" type="password" name="" class="form-control rounded-pill bg-index" v-model="oldpassword"> 
            <label class="form-label mt-3 fw-bolder"><i class="fas fa-lock"></i> {{ $t('user.password') }}</label>
            <input @keyup.enter="" type="password" name="" class="form-control rounded-pill bg-index" v-model="password"> 
            <label class="form-label mt-3 fw-bolder"><i class="fas fa-lock"></i> {{ $t('user.passwordcheck') }}</label>
            <input @keyup.enter="" type="password" name="" class="form-control rounded-pill bg-index" v-model="passwordcheck"> 
          </div>
          <div class="modal-footer bg-light">
            <button @click="changePassword()" type="button" class="btn btn-dark">{{ $t('button.save') }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="deleteAccount" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-dark text-light">
            <p class="modal-title h5">{{ $t('button.delete-account') }}</p>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            {{ $t('profile.warning-delete') }}
          </div>
          <div class="modal-footer bg-light">
            <button @click="deleteAccount()" type="button" class="btn btn-danger">{{ $t('button.delete') }}</button>
          </div>
        </div>
      </div>
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
        passwordcheck: "",
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
        });
      }
    }
  }
</script>