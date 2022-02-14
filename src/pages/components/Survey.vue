<template>
  <tr>
    <td><p class="fw-bolder my-2">{{ name }}</p></td>
    <td>
      <button class="btn btn-outline-dark me-2 my-1" role="button" data-bs-toggle="modal" :data-bs-target="`#share_${id}`"><i class="fas fa-share-alt"></i> {{ $t('button.share') }}</button>
      <router-link class="btn btn-outline-dark me-2 my-1" :to="`/surveys/edit/${id}`" role="button"><i class="fas fa-pencil-alt"></i> {{ $t('button.edit') }}</router-link>
      <router-link class="btn btn-outline-dark me-2 my-1" :to="`/surveys/results/${id}`" role="button"><i class="fas fa-chart-line"></i> {{ $t('button.results') }}</router-link>
      <button class="btn btn-danger me-2 my-1" role="button" data-bs-toggle="modal" :data-bs-target="`#deleteSurvey_${id}`"><i class="fas fa-times-circle"></i> {{ $t('button.delete') }}</button>

      <div class="modal fade" :id="`share_${id}`" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-dark text-light">
              <p class="modal-title h5">{{ $t('surveys.share.title') }}</p>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>{{ $t('surveys.share.body') }}</p>
              <p :id="`copyclipboard_${id}`" class="fst-italic text-color-blue">{{origin}}/surveys/run/{{id}}</p>
              <button :id="`copybutton_${id}`" @click="copyclipboard()" type="button" class="btn btn-dark">{{ $t('button.copy') }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" :id="`deleteSurvey_${id}`" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-dark text-light">
              <h5 class="modal-title">{{ $t('button.delete') }}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class=" ">{{ $t('surveys.name') }}: <span class="text-color-blue">{{ name }}</span></p>
              <p>{{ $t('surveys.confirm-delete') }}</p>
            </div>
            <div class="modal-footer">
              <button @click="deleteSurvey(id)" type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="fas fa-times-circle"></i> {{ $t('surveys.delete') }}</button>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
  export default {
    props: {
      name: String,
      id: String,
      deleteSurvey: Function
    },
    data() {
      return {
        origin: window.location.origin
      }
    },
    methods: {
      copyclipboard() {
        let text = document.getElementById(`copyclipboard_${this.id}`).innerText;
        let button = document.getElementById(`copybutton_${this.id}`);
        navigator.clipboard.writeText(text);
        button.innerText = this.$t('button.copied');
        if(button.classList.value.indexOf("btn-dark")) {
          button.classList.remove("btn-dark");
          button.classList.add("btn-success");
        }
      }
    }
  };
</script>