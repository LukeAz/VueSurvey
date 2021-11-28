<template>
  <div class="text-center mt-3">
    <p class="fs-1">VueSurvey</p>
    <p>{{ $t('message.home.typed') }} <span id="typed" class="fst-italic text-decoration-underline" :data-typed-items="$t('message.home.data-typed-items')"></span></p>
  </div> 
  <div class="text-center mx-auto my-3 col-10 col-md-5">
    <div class="card">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item text-center"> 
          <a class="nav-link active btl" data-bs-toggle="tab" href="#login" role="tab">{{ $t('message.home.login') }}</a> 
        </li>
        <li class="nav-item text-center"> 
          <a class="nav-link btr" data-bs-toggle="tab" href="#register" role="tab">{{ $t('message.home.signup') }}</a> 
        </li>
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
          <label class="form-label fw-bolder">{{ $t('message.user.username') }}</label>
          <input @keyup.enter="login()" type="text" name="" class="form-control rounded-pill bg-index" v-model="login_username"> 
          <label class="form-label mt-3 fw-bolder">{{ $t('message.user.password') }}</label>
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
          <label class="form-label fw-bolder">{{ $t('message.user.username') }}</label>
          <input @keyup.enter="register()" type="text" name="" class="form-control rounded-pill bg-index" v-model="register_username"> 
          <label class="form-label mt-3 fw-bolder">{{ $t('message.user.password') }}</label>
          <input @keyup.enter="register()" type="password" name="" class="form-control rounded-pill bg-index" v-model="register_password"> 
          <label class="form-label mt-3 fw-bolder">{{ $t('message.user.passwordcheck') }}</label>
          <input @keyup.enter="register()" type="password" name="" class="form-control rounded-pill bg-index" v-model="register_passwordcheck"> 
          <button @click="register()" class="btn btn-dark btn-block my-4 w-100 rounded">{{ $t('message.home.signup') }}</button> 
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
        login_username: "",
        login_password: "",
        register_username: "",
        register_password: "",
        register_passwordcheck: "",
        login_error: "",
        register_error: "" ,
        typed: ""
      }
    },
    updated() {
      let typed_strings = document.getElementById('typed').getAttribute('data-typed-items').split(',');
      this.typed.destroy();
      this.typed = new Typed('#typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    },
    mounted() {
      let typed_strings = document.getElementById('typed').getAttribute('data-typed-items').split(',');
      this.typed = new Typed('#typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
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
      }
    }
  }
  
</script>