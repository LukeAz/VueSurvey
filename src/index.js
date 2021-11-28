import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';

import Index from './Index.vue';
import { router } from './router';

// I18N
const i18n = createI18n({
  globalInjection: true,
  locale: 'it',
  fallbackLocale: 'it',
  messages
});

// CREATE APP
createApp(Index)
  .use(router)
  .use(i18n)
  .mount('#app');