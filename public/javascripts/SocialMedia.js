
export default {
  props: {
    members: '',
  },
  template: `
  <template v-for="(item, index) in members">
    <template v-for="(account, index) in item.socials">
      <div class="row rounded pw-2" style="font-size: 12pt; font-weight: bold; color: white; background-color: rgba(0, 0, 0, 0.9">
        <div class="col" v-if="account.type == 'TWITCH'"><i class="bi bi-twitch"></i> {{account.username}}</div>
        <div class="col" v-if="account.type == 'TWITTER'"><i class="bi bi-twitter"></i> {{account.username}}</div>
      </div>
    </template>
  </template>
  `
}
