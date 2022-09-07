
import SocialMedia from '/javascripts/SocialMedia.js'

export default {
  props: ['p1name','p2name','p1score','p2score','eventround','bestof','brackettype',
    'p1members','p2members'
  ],
  components: {
    SocialMedia,
  },
  template: `
  <div class="row justify-content-center">
    <div class="col-2">
      <img src="/fsmsmashlogo.png" style="margin-left: -5px; height: 75px; top: 2%; position: absolute;"/>
    </div>
  </div>

  <transition>
    <div v-if="p1name.length > 0 || p2name.length > 0" class="row justify-content-center" style="padding-top: 15px;">

      <div class="col-3 shadow upper-border">
        <div class="row h-100 team-one-gradient" >
          <div class="col-11">
            <div class="player-name" >{{p1name}}</div>
          </div>
          <div class="col-1">
            <div class="player-score">{{p1score}}</div>
          </div>
        </div>
      </div>

      <div class="col-2"></div>

      <div class="col-3 shadow upper-border">
        <div class="row h-100 team-two-gradient">
          <div class="col-1" >
            <div class="player-score">{{p2score}}</div>
          </div>
          <div class="col-11" style="text-align: right;">
            <div class="player-name" >{{p2name}}</div>
          </div>
        </div>
      </div>

    </div>
  </transition>

  <transition>
    <div v-if="p1name.length > 0 || p2name.length > 0" class="row justify-content-center">
      <div class="col-3 shadow dark-background lower-border"
      :class="{'dark-background': eventround.length > 0 || bestof.length > 0, 'collapse-score': eventround.length == 0 && bestof.length == 0}" >
        <div class="event-title" >{{eventround}}</div>
      </div>

      <div class="col-2"> </div>

      <div class="col-3 shadow dark-background lower-border"
      :class="{'dark-background': eventround.length > 0 || bestof.length > 0, 'collapse-score': eventround.length == 0 && bestof.length == 0}" style="text-align: right;">
        <div class="event-title" >{{bestof}}</div>
      </div>
    </div>
  </transition>

  <transition>
    <div v-if="brackettype.length > 0" class="row" style="position: absolute; left: 0px; top: 6%; min-width: 175px; max-width: 275px; text-align: right;">
      <div class="col shadow white-border dark-background" style="border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;">
        <div class="event-title" style="overflow-wrap: break-word;">{{brackettype}}</div>
      </div>
    </div>
  </transition>

  <div class="row justify-content-between fixed-bottom">
    <div class="col shadow camera-boxes" style="margin-left: 25px;">
      <social-media :members="p1members"> </social-media>
    </div>

    <div class="col shadow camera-boxes" style="margin-right: 25px;">
      <social-media :members="p2members"> </social-media>
    </div>
  </div>
  `
}
