
export default {
  props: ['members'],
  template: `
  <div class="row">
    <div class="col">
      <ul v-for="(item, index) in members" class="list-group list-group-horizontal">
        <template v-for="(account, index) in item.socials">
          <li v-if="account.type == 'TWITCH'" class="list-group-item" style="font-size: 12pt; font-weight: bold; color: white; overflow-wrap: break-word;"><i class="bi bi-twitch"></i>  {{account.username}}</li>
          <li v-if="account.type == 'TWITTER'" class="list-group-item" style="font-size: 12pt; font-weight: bold; color: white; overflow-wrap: break-word;"><i class="bi bi-twitter"></i>  {{account.username}}</li>
        </template
      </ul>
    </div>
  </div>
  `
}
