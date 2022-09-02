export default {
  props: {
    title: '',
  },
  template: `
  <div class="col shadow white-border"
    style=" border-radius: 0rem .5rem .5rem 0rem;
    background-color: rgba(0,0,0,0.9);">
    <div class="event-title">{{title}}</div>
  </div>
  `
}
