
import SocialMediaFooter from '/javascripts/SocialMediaFooter.js'
import SocialMediaHeader from '/javascripts/SocialMediaHeader.js'

export default {
  props: ['p1name','p2name','p1score','p2score','eventround','bestof','brackettype',
    'p1members','p2members'
  ],
  components: {
    SocialMediaFooter,
    SocialMediaHeader
  },
  template: `
  <div class="row justify-content-center">
    <div class="col-2">
      <img src="/fsmsmashlogo.png" style="margin-left: -5px; height: 75px; top: 2%; position: absolute;"/>
    </div>
  </div>

  <transition>
    <div v-if="p1name.length > 0 || p2name.length > 0" class="row justify-content-center" style="padding-top: 15px;">

      <div class="col header-col shadow upper-border">
        <div class="row h-100 team-one-gradient" >

          <div class="col-12">
            <div class="row">

              <div class="col-11">
                <div class="player-name" >{{p1name}}</div>
              </div>
              <div class="col-1">
                <div class="player-score">{{p1score}}</div>
              </div>

            </div>
          </div>



        </div>
      </div>

      <div class="col-2"></div>

      <div class="col header-col shadow upper-border">
        <div class="row h-100 team-two-gradient">

          <div class="col-12">
            <div class="row">

              <div class="col-1" >
                <div class="player-score">{{p2score}}</div>
              </div>
              <div class="col-11" style="text-align: right;">
                <div class="player-name" >{{p2name}}</div>
              </div>

            </div>
          </div>



        </div>
      </div>

    </div>
  </transition>

  <transition>
    <div class="row justify-content-center" v-if="p1name.length > 0 || p2name.length > 0">
      <div class="col header-col">
        <div class="row h-100" style="background-color: white">

          <div class="col-12">
            <ul v-for="(item, index) in p1members" class="list-group list-group-horizontal">
              <template v-for="(account, index) in item.socials">
                <li v-if="account.type == 'TWITCH'" class="list-group-item pt-0 pb-0" style="background-color: rgb(0,0,0,0); border-width: 0; font-size: 12pt; font-weight: bold; color: black; overflow-wrap: break-word;"><i class="bi bi-twitch"></i>  {{account.username}}</li>
                <li v-if="account.type == 'TWITTER'" class="list-group-item pt-0 pb-0" style="background-color: rgb(0,0,0,0); border-width: 0; font-size: 12pt; font-weight: bold; color: black; overflow-wrap: break-word;"><i class="bi bi-twitter"></i>  {{account.username}}</li>
              </template>
            </ul>
          </div>

        </div>
      </div>

      <div class="col-2"> </div>

      <div class="col header-col">
        <div class="row h-100" style="background-color: white">

          <div class="col-12">
            <ul v-for="(item, index) in p2members" class="list-group list-group-horizontal justify-content-end">
              <template v-for="(account, index) in item.socials">
                <li v-if="account.type == 'TWITCH'" class="list-group-item pt-0 pb-0" style="background-color: rgb(0,0,0,0); border-width: 0; font-size: 12pt; font-weight: bold; color: black; overflow-wrap: break-word;"><i class="bi bi-twitch"></i>  {{account.username}}</li>
                <li v-if="account.type == 'TWITTER'" class="list-group-item pt-0 pb-0" style="background-color: rgb(0,0,0,0); border-width: 0; font-size: 12pt; font-weight: bold; color: black; overflow-wrap: break-word;"><i class="bi bi-twitter"></i>  {{account.username}}</li>
              </template>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </transition>

  <transition>
    <div v-if="p1name.length > 0 || p2name.length > 0" class="row justify-content-center">
      <div class="col header-col shadow dark-background lower-border"
      :class="{'dark-background': eventround.length > 0 || bestof.length > 0, 'collapse-score': eventround.length == 0 && bestof.length == 0}" >
        <div class="event-title" >{{eventround}}</div>
      </div>

      <div class="col-2"> </div>

      <div class="col header-col shadow dark-background lower-border"
      :class="{'dark-background': eventround.length > 0 || bestof.length > 0, 'collapse-score': eventround.length == 0 && bestof.length == 0}" style="text-align: right;">
        <div class="event-title" >{{bestof}}</div>
      </div>
    </div>
  </transition>

  <transition>
    <div v-if="brackettype.length > 0" class="row" style="position: absolute; left: 0px; top: 2%; min-width: 200px; max-width: 200px; text-align: right;">
      <div class="col shadow white-border dark-background" style="border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;">
        <div class="event-title">{{brackettype}}</div>
      </div>
    </div>
  </transition>

  <div class="row justify-content-between fixed-bottom">
    <div class="col shadow camera-boxes" style="margin-left: 25px;">
      <!--<social-media-footer :members="p1members"> </social-media-footer>-->
    </div>

    <div class="col shadow camera-boxes" style="margin-right: 25px;">
      <!--<social-media-footer :members="p2members"> </social-media-footer>-->
    </div>
  </div>
  `
}
