
import assert from 'assert'
import chai from 'chai'
import Striker from '../public/javascripts/Striker.mjs'

describe('Striker', function () {

  describe('#pick', function () {
    it('if pick, set stage to pick and add to choices, remove from options if DSR', function () {

      var options = [{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: '',
        playerName: ''
      },{
        stageName: "Yoshi's Story",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      }]

      var options_outcome = [{
        stageName: "Yoshi's Story",
        order: 'COUNTERPICK',
        choice: '',
        playerName: ''
      }]

      var choices = [{
        stageName: "Yoshi's Island",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      }]

      var choices_outcome = [{
        stageName: "Yoshi's Island",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      },{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: 'PICK',
        playerName: ''
      }]

      Striker.pick(options,choices,0,true)
      assert.deepEqual(choices,choices_outcome)
      assert.deepEqual(options,options_outcome)

    })
  })

  describe('#strike', function () {
    it('if strike, set stage to strike and add to choices', function () {

      var options = [{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: '',
        playerName: ''
      },{
        stageName: "Yoshi's Story",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      }]

      var options_outcome = [{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: 'STRIKE',
        playerName: ''
      },{
        stageName: "Yoshi's Story",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      }]

      var choices = [{
        stageName: "Yoshi's Island",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      }]

      var choices_outcome = [{
        stageName: "Yoshi's Island",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      },{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: 'STRIKE',
        playerName: ''
      }]

      Striker.strike(options,choices,0)
      assert.deepEqual(choices,choices_outcome)
      assert.deepEqual(options,options_outcome)

    })
  })

  describe('#undo', function () {
    it('if undo, set stage to none and remove from choices', function () {

      var options = [{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: 'STRIKE',
        playerName: ''
      },{
        stageName: "Yoshi's Story",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      }]

      var options_outcome = [{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: '',
        playerName: ''
      },{
        stageName: "Yoshi's Story",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      }]

      var choices = [{
        stageName: "Yoshi's Island",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      },{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: 'STRIKE',
        playerName: ''
      }]

      var choices_outcome = [{
        stageName: "Yoshi's Island",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      }]

      Striker.undo(options,choices,"Battlefield")
      assert.deepEqual(choices,choices_outcome)
      assert.deepEqual(options,options_outcome)

    })
  })

  describe('#createStageStrikesForm', function () {
    it('return properly formatted object', function () {

      var choices = [{
        stageName: "Yoshi's Island",
        order: 'COUNTERPICK',
        choice: 'STRIKE',
        playerName: ''
      },{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: 'STRIKE',
        playerName: ''
      }]

      const form = Striker.createStageStrikesForm(choices)
      assert.deepEqual(choices,form)

    })
  })

  describe('#createOptionsList', function () {
    it('return array of options give starter and counterpick selections', function () {

      var starter = [{
        stageName: "Yoshi's Island",
        order: '',
        choice: '',
        playerName: ''
      },{
        stageName: "Battlefield",
        order: '',
        choice: '',
        playerName: ''
      }]

      var counterpick = [{
        stageName: "Small Battlefield",
        order: '',
        choice: '',
        playerName: ''
      },{
        stageName: "Yoshi's Story",
        order: '',
        choice: '',
        playerName: ''
      }]

      var outcome = [{
        stageName: "Yoshi's Island",
        order: 'STARTER',
        choice: '',
        playerName: ''
      },{
        stageName: "Battlefield",
        order: 'STARTER',
        choice: '',
        playerName: ''
      },{
        stageName: "Small Battlefield",
        order: 'COUNTERPICK',
        choice: '',
        playerName: ''
      },{
        stageName: "Yoshi's Story",
        order: 'COUNTERPICK',
        choice: '',
        playerName: ''
      }]

      assert.deepEqual(Striker.createOptionsList(starter,counterpick),outcome)

    })
  })

})
