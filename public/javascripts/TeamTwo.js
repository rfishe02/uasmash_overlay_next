
export default {
  props: {
    name: '',
    score: '',
    title: '',
    color: '',
  },
  template: `
  <div class="col-3 shadow upper-border">
    <div class="row h-100" :class="color">
      <div class="col-1" >
        <div class="player-score">{{score}}</div>
      </div>
      <div class="col-11" style="text-align: right;">
        <div class="player-name">{{name}}</div>
      </div>
    </div>
  </div>
  `
}
