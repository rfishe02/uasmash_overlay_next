
export default {
    props: {
      teamOne: '',
      teamTwo: '',
      preReqs: Array,
      eventName: '',
      fullRoundText: '',
    },
    template: `
    <div class="card shadow" style="background-color: rgba(255, 255, 255, 1);">
      <div class="card-body py-1 px-2">
        <div class="card-title my-1" style="font-weight: bold;">
          <span style="font-size: 16pt;">{{teamOne}}</span> <span style="font-size: 14pt;">&nbsp;vs.&nbsp;</span> <span style="font-size: 16pt;">{{teamTwo}}</span>
        </div>

        <p class="card-text m-0" v-if="preReqs.length > 0">
          Waiting On:
        </p>
      </div>
      <ul class="list-group list-group-flush" style="border-color: rgba(0, 0, 0, 0)">
        <template v-for="(item,index) in preReqs">
          <li class="list-group-item pt-0 pb-1 px-3" style="border-color: rgba(0, 0, 0, 0)">{{item}}</li>
        </template>
      </ul>
      <div class="card-footer text-muted py-1 px-2">
        <span style="font-size: 10pt;">{{eventName}}: {{fullRoundText}}</span>
      </div>
    </div>
    `
  }