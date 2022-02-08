<template>
  <div class="mt-auto">
    <footer class="bg-dark text-light text-center text-lg-start">
      <div class="container p-4">
        <div class="row my-4">
          <div class="col-lg-6 col-md-6 mb-4 mb-md-0">
            <div class="rounded-circle bg-white shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto" style="width: 150px; height: 150px;">
              <video autoplay loop muted playsinline class="rounded-circle" width="150" height="150">
                <source src="/img/navbar.webm" type="video/webm">
              </video>
            </div>
            <p class="text-center fw-bold">VueSurvey</p>
          </div>
          <div class="col-md-6 col-lg-6 mb-4 mb-md-0">
            <h5 class="text-uppercase mb-4">{{ $t('message.footer.contact') }}</h5>
            <ul class="list-unstyled">
              <li>
                <p><i class="fab fa-github"></i> Github: <a class="text-color-yellow" href="https://github.com/lukeaz" target="_blank">https://github.com/lukeaz</a></p>
              </li>
              <li>
                <p><i class="fas fa-envelope"></i> Mail: <a class="text-color-yellow" href="mailto://lukeaz00@protonmail.com" target="_blank">lukeaz00@protonmail.com</a></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
        © 2021 Copyright:
        <a class="text-color-yellow" href="https://github.com/lukeaz" target="_blank">LukeAz</a>
      </div>
    </footer>
  </div>
  <div class="change-language rounded-circle bg-light">
    <label class="nav-link popover-languages" data-bs-toggle="popover"><i class="fas fa-language text-dark fs-1"></i></label>
    <div class="d-none">
      <div id="popover-hidden-languages">
        <img @click="change_language('it')" src="/icons/italy.webp" class="img-thumbnail rounded" width="50" height="50" alt="...">
        <br><br>
        <img @click="change_language('en')" src="/icons/usa.webp" class="img-thumbnail rounded" width="50" height="50" alt="...">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    beforeUpdate() {
    },
    mounted() {
      var popoverLanguages = new bootstrap.Popover(document.querySelector('.popover-languages'), {
        container: 'body',
        animation: true,
        offset: "0",
        trigger: 'click',
        html: true,
        sanitize: false,
        placement:'top',
        content: document.getElementById('popover-hidden-languages'),
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
      });
    },
    methods: {
      change_language(flag) {
        document.cookie = `lang=${flag}; path=/`;
        this.$i18n.locale = flag;
      }
    }
  }
</script>