export default {
  props: {
    round: '',
    bestof: '',
    leftcolor: '',
    rightcolor: '',
  },
  template: `
  <div class="col-3 shadow dark-background lower-border" :class="leftcolor" style="">
    <div class="event-title">{{round}}</div>
  </div>

  <div class="col-2"> </div>

  <div class="col-3 shadow dark-background lower-border" :class="rightcolor" style="text-align: right;">
    <div class="event-title">{{bestof}}</div>
  </div>
  `
}
