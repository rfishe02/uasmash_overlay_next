
export default {
  props: {
    name: '',
    score: '',
    title: '',
    color: '',
  },
  template: `
  <div class="col-3 shadow"
    style=" border-style: solid;
    border-color: rgba(255,255,255,1);
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    border-width: 5px 5px 0px 5px;">
    <div class="row h-100" :class="color">
      <div class="col-11">
        <div class="player-name">{{name}}</div>
      </div>
      <div class="col-1">
        <div class="player-score">{{score}}</div>
      </div>
    </div>
  </div>
  `
}
