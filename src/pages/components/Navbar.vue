<template>
  <nav class="navbar navbar-light bg-navbar fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="/img/logo.webp" alt="" height="40" width="57" class="d-inline-block align-text-top rounded-pill bg-light">
        <span class="mx-3 text-light fw-bold">VueSurvey</span>
      </router-link>
      <button v-if="logged" class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu"><i class="fas fa-folder-minus"></i> Menu</button>
      <button v-else type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#joinnow">Join now</button>
    </div>
  </nav>
  <div class="d-none">{{$route.path}}</div>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
    <div class="offcanvas-header bg-dark text-light">
      <span id="offcanvasMenuLabel" class="fs-3"><i class="fas fa-folder-minus"></i> Menu</span>
      <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body bg-index text-center">
      <p class="fs-4">Welcome back</p>
      <img src="/img/homepage/profile.webp" class="img-fluid rounded-circle w-50 border border-5 border-dark"/>
      <hr class="bg-dark border-5 border-top border-dark my-5">
      <router-link to="/surveys" class="btn btn-outline-dark" data-bs-dismiss="offcanvas"><i class="fas fa-home"></i> Homepage</router-link>
      <br>
      <router-link to="/profile" class="btn btn-outline-dark mt-3" data-bs-dismiss="offcanvas"><i class="fas fa-user-circle"></i> Profile</router-link>
      <br>
      <button @click="logout();" type="button" class="btn btn-outline-dark mt-3" data-bs-dismiss="offcanvas"><i class="fas fa-sign-out-alt"></i> Logout</button>
    </div>
  </div>

  <!-- Modal joinnow-->
  <div class="modal fade" id="joinnow" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content text-center">
          <ul class="nav nav-tabs bg-dark " role="tablist">
            <li class="nav-item text-center"> 
              <p class="nav-link active btl" data-bs-toggle="tab" href="#login" role="tab">{{ $t('message.home.login') }}</p> 
            </li>
            <li class="nav-item text-center"> 
              <p class="nav-link btr" data-bs-toggle="tab" href="#register" role="tab">{{ $t('message.home.signup') }}</p> 
            </li>
            <button type="button" class="btn-close btn-close-white ms-auto my-auto me-2" data-bs-dismiss="modal" aria-label="Close"></button>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade show active px-4 pt-3" id="login">
              <div v-if="login_error">
                <div v-if="login_error == 'wrong-credentials'" class="alert alert-danger rounded-pill" role="alert">
                  {{ $t('message.error.wrong-credentials') }}
                </div>
                <div v-else class="alert alert-danger rounded-pill" role="alert">
                  {{ $t('message.error.unauthorized') }}
                </div> 
              </div>
              <label class="form-label fw-bolder"><i class="fas fa-user-circle"></i> {{ $t('message.user.username') }}</label>
              <input @keyup.enter="login()" type="text" name="" class="form-control rounded-pill bg-index" v-model="login_username"> 
              <label class="form-label mt-3 fw-bolder"><i class="fas fa-lock"></i> {{ $t('message.user.password') }}</label>
              <input @keyup.enter="login()" type="password" name="" class="form-control rounded-pill bg-index" v-model="login_password"> 
              <button @click="login()" class="btn btn-dark btn-block my-4 w-100 rounded">{{ $t('message.home.login') }}</button> 
            </div>
            <div class="tab-pane fade px-4 pt-3" id="register">
              <div v-if="register_error">
                <div v-if="register_error == 'password-not-match'" class="alert alert-danger rounded-pill" role="alert">
                  {{ $t('message.error.password-not-match') }}
                </div>
                <div v-else-if="register_error == 'username-regex-error'" class="alert alert-danger rounded-pill" role="alert">
                  {{ $t('message.error.username-regex-error') }}
                </div> 
                <div v-else-if="register_error == 'password-regex-error'" class="alert alert-danger rounded-pill" role="alert">
                  {{ $t('message.error.password-regex-error') }} [!@#$%^&*-_/]!
                </div> 
                <div v-else-if="register_error == 'username-already-used'" class="alert alert-danger rounded-pill" role="alert">
                  {{ $t('message.error.username-already-used') }}
                </div> 
                <div v-else class="alert alert-danger rounded-pill" role="alert">
                  {{ $t('message.error.unauthorized') }}
                </div> 
              </div>
              <label class="form-label fw-bolder"><i class="fas fa-user-circle"></i> {{ $t('message.user.username') }}</label>
              <input @keyup.enter="register()" type="text" name="" class="form-control rounded-pill bg-index" v-model="register_username"> 
              <label class="form-label mt-3 fw-bolder"><i class="fas fa-lock"></i> {{ $t('message.user.password') }}</label>
              <input @keyup.enter="register()" type="password" name="" class="form-control rounded-pill bg-index" v-model="register_password"> 
              <label class="form-label mt-3 fw-bolder"><i class="fas fa-lock"></i> {{ $t('message.user.passwordcheck') }}</label>
              <input @keyup.enter="register()" type="password" name="" class="form-control rounded-pill bg-index" v-model="register_passwordcheck"> 
              <button @click="register()" class="btn btn-dark btn-block my-4 w-100 rounded">{{ $t('message.home.signup') }}</button> 
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
        logged: document.cookie ? document.cookie.split('; ').find(c => c.split('=')[0] == 'logged') != undefined : false, 
        login_username: "",
        login_password: "",
        register_username: "",
        register_password: "",
        register_passwordcheck: "",
        login_error: "",
        register_error: "" ,
        joinnow_modal: ""
      }
    },
    beforeUpdate() {
      this.logged = document.cookie ? document.cookie.split('; ').find(c => c.split('=')[0] == 'logged') != undefined : false;
    },
    methods: {
      login() {
        axios.post('/api/users/login', {
          username: this.login_username,
          password: this.login_password
        }).then((res) => {
          this.$router.push('/surveys');
        }).catch((err) => {
          this.login_error = err.response.data.message;
        });
      },
      register() {
        axios.post('/api/users/register', {
          username: this.register_username,
          password: this.register_password,
          passwordcheck: this.register_passwordcheck
        }).then((res) => {
          this.$router.push('/surveys');
        }).catch((err) => {
          this.register_error = err.response.data.message;
        });
      },
      logout() {
        axios.post('/api/users/logout').then(() => {
          this.$router.push('/');
        });
      }
    }
  }
</script>