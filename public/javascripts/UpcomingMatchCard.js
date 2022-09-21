
export default {
    props: {
      teamOne: '',
      teamTwo: '',
      preReqId1: '',
      preReqId2: '',
      eventName: '',
      fullRoundText: '',
    },
    template: `
    <div class="card shadow" style="background-color: rgba(255, 255, 255, 1);">
      <div class="card-body py-1 px-2">
        <div class="card-title my-1" style="font-weight: bold;">
          <span style="font-size: 16pt;">{{teamOne}}</span> <span style="font-size: 14pt;">&nbsp;vs.&nbsp;</span> <span style="font-size: 16pt;">{{teamTwo}}</span>
        </div>

        <p class="card-text m-0" v-if="teamOne == '?' || teamTwo == '?'">
          Waiting On:
        </p>
      </div>
      <ul class="list-group list-group-flush" style="border-color: rgba(0, 0, 0, 0)">
        <li class="list-group-item pt-0 pb-1 px-3" v-if="teamOne == '?' && preReqId1.length > 0" style="border-color: rgba(0, 0, 0, 0)">{{preReqId1}}</li>
        <li class="list-group-item pt-0 pb-1 px-3" v-if="teamTwo == '?' && preReqId2.length > 0" style="border-color: rgba(0, 0, 0, 0)">{{preReqId2}}</li>
      </ul>
      <div class="card-footer text-muted py-1 px-2">
        <span style="font-size: 10pt;">{{eventName}}: {{fullRoundText}}</span>
      </div>
    </div>
    `
  }