<template>
  <Navbar/>
  <router-view/>
  <Footer/>
</template>

<script>
  import Navbar from './pages/components/Navbar.vue';
  import Footer from './pages/components/Footer.vue';

  export default {
    components: {
      Navbar,
      Footer
    },
    created() {
      if(document.cookie) {
        let cookies = document.cookie.split('; ');
        let lang = cookies.find(c => c.split('=')[0] == 'lang');
        lang = (lang) ? lang.split('=')[1] : "it";
        this.$i18n.locale = lang && ['en', 'it'].indexOf(lang) != -1 ? lang : 'en';
        SurveyCreator.editorLocalization.currentLocale = lang;
      }

      SurveyAnalytics.VisualizationPanel.haveCommercialLicense = true;
      Survey.dxSurveyService.serviceUrl = "/api/surveys";
      Survey.surveyStrings.loadingSurvey = "Please wait. Your survey is loading… <br> If it takes a long time, it means the survey doesn't exist.";
      SurveyAnalytics.VisualizationPanel.haveCommercialLicense = true;
    }
  };
</script>