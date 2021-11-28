<template>
  <nav class="navbar navbar-light bg-navbar">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="/img/logo.png" alt="" height="50" class="d-inline-block align-text-top rounded-pill bg-light">
        <span class="mx-3 align-middle text-light fw-bold">VueSurvey</span>
      </router-link>
      <div v-if="logged" class="d-flex">
        <router-link to="/profile" class="d-inline-block align-text-top me-3"><img src="/img/profile.png" alt="" height="40" ></router-link>
        <img @click="logout();" src="/img/logout.png" alt="" height="40" class="d-inline-block align-text-top">
      </div>
    </div>
  </nav>
  <div class="d-none">{{$route.path}}</div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        logged: document.cookie ? document.cookie.split('; ').find(c => c.split('=')[0] == 'logged') != undefined : false      
      }
    },
    beforeUpdate() {
      this.logged = document.cookie ? document.cookie.split('; ').find(c => c.split('=')[0] == 'logged') != undefined : false;
    },
    methods: {
      logout() {
        axios.post('/api/users/logout').then(() => {
          this.$router.push('/');
        });
      }
    }
  }
</script>