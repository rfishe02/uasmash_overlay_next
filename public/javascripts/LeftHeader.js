export default {
  props: {
    title: '',
  },
  template: `
  <div class="col shadow white-border"
    style=" border-radius: 0rem 0.5rem 0.5rem 0rem;
    background-color: rgba(0,0,0,0.9);
    padding-left: 15px;">
    <div class="event-title">{{title}}</div>
  </div>
  `
}
