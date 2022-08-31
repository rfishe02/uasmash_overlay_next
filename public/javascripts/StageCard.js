export default {
  props: {
    item: {},
    url: ''
  },
  template: `
  <div class="card text-center text-white border-secondary rounded shadow" style="background-color: rgba(0,0,0,1)">
    <img class="rounded" v-bind:src="url" v-bind:alt="item.stage_name" style="opacity: 0.9"/>
    <div class="card-img-overlay">
      <p style="font-size: 12pt">{{ item.stage_name }}</p>
      <i v-if="item.choice == 'PICK'" class="bi bi-check-circle" style="font-size: 16pt"></i>
      <i v-if="item.choice == 'STRIKE'" class="bi bi-x-circle-fill" style="font-size: 16pt"></i>
    </div>
  </div>
  `
}
