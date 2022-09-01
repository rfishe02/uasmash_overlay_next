export default {
  props: {
    teamOne: '',
    teamTwo: '',
    scoreOne: '',
    scoreTwo: '',
    eventHeader: ''
  },
  template: `
  <div class="row justify-content-center previewbox">
    <div id="preview-p1name" class="col-4 col-lg-3 preview-boxes">{{ teamOne }}</div>
    <div id="preview-p1score" class="col-1 preview-boxes">{{ scoreOne }}</div>
    <div class="col-1"></div>
    <div id="preview-p2score" class="col-1 preview-boxes">{{ scoreTwo }}</div>
    <div id="preview-p2name" class="col-4 col-lg-3 preview-boxes">{{ teamTwo }}</div>

    <transition>
      <div v-if="eventHeader.length > 2" id="preview-header" class="col-11 col-lg-9">
        {{ eventHeader }}
      </div>
    </transition>
  </div>`
}
