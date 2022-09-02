
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
    border-radius: 1rem 1rem 0rem 0rem;
    border-width: 7px 7px 0px 7px;">
    <div class="row h-100">
      <div class="col-11" :class="color" style="border-radius: 0.5rem 0rem 0rem 0rem;">
        <div class="player-name">{{name}}</div>
      </div>
      <div class="col-1" :class="color" style="border-radius: 0rem 0.5rem 0rem 0rem;">
        <div class="player-score">{{score}}</div>
      </div>
    </div>
  </div>
  `
}
