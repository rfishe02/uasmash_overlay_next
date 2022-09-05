export default {
  props: {
    title: '',
  },
  template: `
  <div class="col shadow white-border dark-background"
    style="border-radius: 0rem 0.5rem 0.5rem 0rem;
    padding-left: 15px;">
    <div class="event-title">{{title}}</div>
  </div>
  `
}
