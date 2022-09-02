export default {
  props: {
    round: '',
    bestof: '',
  },
  template: `
  <div class="col-3"
    style="border-style: solid;
    border-color: rgba(255,255,255,1);
    border-radius: 0rem 0rem 1rem 1rem;
    border-width: 0px 7px 7px 7px;
    background-color: rgba(0, 0, 0, 0.9);">

    <div class="event-title">{{round}}</div>

  </div>
  <div class="col-2"> </div>
  <div class="col-3"
    style="border-style: solid;
    border-color: rgba(255,255,255,1);
    border-radius: 0rem 0rem 1rem 1rem;
    border-width: 0px 7px 7px 7px;
    background-color: rgba(0, 0, 0, 0.9);
    text-align: right;
    ">

    <div class="event-title">{{bestof}}</div>

  </div>
  `
}
