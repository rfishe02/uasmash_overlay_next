export default {
  props: {
    item: {},
  },
  template: `
  <div class="card-body p-1">
    <p class="card-title m-1" style="font-size: 10pt">
      {{ item.stageName }}
    </p>
  </div>
  `
}
