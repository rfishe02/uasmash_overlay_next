export default {
  props: {
    item: {},
    url: '',
  },
  template: `
  <div class="card text-center text-white border-secondary rounded shadow" style="background-color: rgba(0,0,0,1);">
    <img class="rounded card-img" v-bind:src="url" v-bind:alt="item.stageName" style="opacity: 0.5"/>
    <div class="card-img-overlay">
      <i v-if="item.choice == 'PICK'" class="bi bi-check-circle-fill" style="font-size: 16pt;"></i>
      <i v-if="item.choice == 'STRIKE'" class="bi bi-x-circle" style="font-size: 16pt;"></i>
      <p style="font-size: 12pt;">{{ item.stageName }}</p>
    </div>
  </div>
  `
}
