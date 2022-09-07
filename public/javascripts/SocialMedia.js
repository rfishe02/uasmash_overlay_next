
export default {
  props: {
    members: '',
  },
  template: `
  <template v-for="(item, index) in members">
    <div class="row h-100 align-content-end">

      <template v-for="(account, index) in item.socials">
        <div v-if="account.type == 'TWITCH'" class="col-12 pt-0 pb-0" style="font-size: 14pt; color: white; background-color: rgba(0, 0, 0, .90);">
          <i class="bi bi-twitch"></i>  {{account.username}}
        </div>

        <div v-if="account.type == 'TWITTER'" class="col-12 pt-0 pb-0" style="font-size: 14pt; color: white; background-color: rgba(0, 0, 0, 0.90);">
          <i class="bi bi-twitter"></i>  {{account.username}}
        </div>
      </template>

    </div>
  </template>
  `
}
