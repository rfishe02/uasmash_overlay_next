
export default {
  props: {
    members: '',
  },
  template: `
  <template v-for="(item, index) in members">
  <div class="row h-100 align-content-end" style="font-size: 14pt; font-size: bold; color: white;">
    <template v-for="(account, index) in item.socials">
      <div v-if="account.type == 'TWITCH'" class="col" style="background-color: rgba(0, 0, 0, 0.9"><i class="bi bi-twitch"></i> {{account.username}}</div>
      <div v-if="account.type == 'TWITTER'" class="col" style="background-color: rgba(0, 0, 0, 0.9"><i class="bi bi-twitter"></i> {{account.username}}</div>
    </template>
  </div>
  </template>
  `
}
