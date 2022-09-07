export default {
  props: {
    item: {},
    url: '',
  },
  template: `
  <div class="card text-center text-white rounded shadow" style="background-color: rgba(0,0,0,1); border-width: 3px; border-color: rgba(255,255,255,1);">
    <img class="rounded card-img" v-bind:src="url" v-bind:alt="item.stageName" style="opacity: 0.8"/>
    <div class="card-img-overlay">
      <i v-if="item.choice == 'PICK'" class="bi bi-check-circle-fill" style="font-size: 26pt;"></i>
      <i v-if="item.choice == 'STRIKE'" class="bi bi-x-circle" style="font-size: 26pt;"></i>
      <p style="font-size: 16pt; font-weight: bold; padding-bottom: 15px;">{{ item.stageName }}</p>
    </div>
  </div>
  `
}
