<template>
  <div>
    <div class="bg-homepage d-flex justify-content-center align-items-center">
      <div class="text-center text-light">
        <p class="fw-bold fs-1 text-color-yellow">Welcome on <span class="text-color-blue">VueSurvey</span></p>
        <p class="fs-5"> {{ $t('message.home.typed') }} <span id="typed" class="fst-italic text-decoration-underline" :data-typed-items="$t('message.home.data-typed-items')"></span></p>
      </div>
    </div>

    <div class="text-center mt-3">
      <img src="/img/vue.webp" class="img-fluid" width="120" height="120" alt="...">
      <p class="fs-1">Scopri come funziona &#128175;</p>
      <div class="bg-preview mt-5">
        <div class="container position-relative preview">
          <div id="carousel" class="carousel carousel-dark slide rounded-3 border border-5" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="/img/homepage/slideshow/1.webp" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="/img/homepage/slideshow/2.webp" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="/img/homepage/slideshow/3.webp" class="d-block w-100" alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <span class="fs-4">Personalizza il tuo sondaggio come vuoi te</span>
      </div>

      <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 79.17692307692306,167.15897435897435 158.35384615384612,134.3179487179487 230,156 C 301.6461538461539,177.6820512820513 365.7615384615385,253.8871794871795 456,241 C 546.2384615384615,228.1128205128205 662.6,126.13333333333333 743,133 C 823.4,139.86666666666667 867.8384615384615,255.57948717948716 943,268 C 1018.1615384615385,280.42051282051284 1124.0461538461539,189.54871794871795 1212,161 C 1299.9538461538461,132.45128205128205 1369.976923076923,166.22564102564104 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#8c8c8cff" class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path></svg>
      
      <p class="fs-1">Funzionalità</p>
      <section class="wrapper mb-5">
        <div class="container">
          <div class="row">
            <div class="col-md-4 mb-3">
              <div class="card card-functionality text-white card-has-bg click-col" style="background-image:url('/img/homepage/functionality/1.webp');">
                <img class="card-img d-none" src="/img/homepage/functionality/1.webp" alt="...">
                <div class="card-img-overlay d-flex flex-column">
                  <div class="card-body">
                    <small class="card-meta mb-2">Planning</small>
                    <h4 class="card-title mt-0 text-white">Crea il tuo sondaggio e condividilo con i tuoi amici per pianificare le tue azioni future</h4>
                  </div>
                  <div class="card-footer">
                    <div class="media">
                      <img class="mr-3 rounded-circle" src="/img/homepage/profile.webp" style="max-width:50px" alt="...">
                      <div class="media-body">
                        <h6 class="my-0 d-block text-color-yellow">LukeAz</h6>
                        <small>@VueSurvey</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card card-functionality  text-white card-has-bg click-col" style="background-image:url('/img/homepage/functionality/2.webp');">
                <img class="card-img d-none" src="/img/homepage/functionality/2.webp" alt="...">
                <div class="card-img-overlay d-flex flex-column">
                  <div class="card-body">
                    <small class="card-meta mb-2">Editing</small>
                    <h4 class="card-title mt-0 text-white">Modifica il tuo sondaggio in qualsiasi momento, e correggi i tuoi errori velocemente</h4>
                  </div>
                  <div class="card-footer">
                    <div class="media">
                      <img class="mr-3 rounded-circle" src="/img/homepage/profile.webp" style="max-width:50px" alt="...">
                      <div class="media-body">
                        <h6 class="my-0 d-block text-color-yellow">LukeAz</h6>
                        <small>@VueSurvey</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-functionality  text-white card-has-bg click-col" style="background-image:url('/img/homepage/functionality/3.webp');">
                <img class="card-img d-none" src="/img/homepage/functionality/3.webp" alt="...">
                <div class="card-img-overlay d-flex flex-column">
                  <div class="card-body">
                    <small class="card-meta mb-2">Results</small>
                    <h4 class="card-title mt-0 text-white">Visualizza i risultati del tuo sondaggio in modo chiaro e organizzato</h4>
                  </div>
                  <div class="card-footer">
                    <div class="media">
                      <img class="mr-3 rounded-circle" src="/img/homepage/profile.webp" style="max-width:50px" alt="...">
                      <div class="media-body">
                        <h6 class="my-0 d-block text-color-yellow">LukeAz</h6>
                        <small>@VueSurvey</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  function ftyped() {
    let strings = document.getElementById('typed').getAttribute('data-typed-items').split(',');
    return new Typed('#typed', {
      strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  export default {
    data() {
      return {
        typed: "",
      }
    },
    updated() {
      this.typed.destroy();
      this.typed = ftyped();
    },
    mounted() {
      this.typed = ftyped();
      this.joinnow_modal = new bootstrap.Modal(document.getElementById(`joinnow`));
    },
    beforeUnmount() {
      if(this.joinnow_modal)
        this.joinnow_modal.hide();
    }
  }
</script>