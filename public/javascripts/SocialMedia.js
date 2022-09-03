
export default {
  props: {
    members: '',
  },
  template: `
  <template v-for="(item, index) in members">
    <div class="row rounded" style="font-size: 16pt; color: white; background-color: rgba(0, 0, 0, 0.9); ">
      <template v-for="(account, index) in item.socials">
        <!--<div class="col" v-if="account.type == 'TWITTER'"><i class="bi bi-twitter"></i> {{account.username}}</div>-->
        <div class="col pb-2 pw-3" v-if="account.type == 'TWITCH'"><i class="bi bi-twitch"></i> {{account.username}}</div>
      </template>
    </div>
  </template>
  `
}
