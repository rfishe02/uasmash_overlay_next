export default {
  props: {
    item: {},
  },
  template: `
  <div class="card-body p-1">
    <p class="card-title mt-2 mb-2" style="font-size: 12pt;">
      {{ item.stageName }}
    </p>
  </div>
  `
}
