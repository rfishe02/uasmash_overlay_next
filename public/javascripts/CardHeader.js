export default {
  props: {
    item: {},
    url: ''
  },
  template: `
  <div v-if="item.order == 'STARTER'" class="card-header p-0">
    <p class="m-1" style="font-size: 8pt">{{ item.order }}</p>
  </div>
  <div v-if="item.order == 'COUNTERPICK'" class="card-header border-secondary bg-dark text-light p-0">
    <p class="m-1" style="font-size: 8pt">{{ item.order }}</p>
  </div>
  <img class="card-img-top" v-bind:src="url" v-bind:alt="item.stageName"/>
  `
}
