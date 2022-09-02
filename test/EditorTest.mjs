
import assert from 'assert'
import Editor from '../public/javascripts/Editor.mjs'
import chai from 'chai'

describe('Editor', function () {
  describe('#getFormattedName', function () {
    it('should return an empty string if input is null', function () {
      assert.equal(Editor.getFormattedName(null),'')
    })
    it('should return a string if input is a string', function () {
      assert.equal(typeof Editor.getFormattedName('test'),typeof 'test');
    })
    it('should return the name of an object', function () {
      var input = {name:'myName', value:'myValue'}
      assert.equal(Editor.getFormattedName(input),input.name)
    })
  })

  describe('#getFormattedScore', function () {
    it('should return an empty string if input is null', function () {
      assert.equal(Editor.getFormattedScore(null),'')
    })
    it('should return the value of an object', function () {
      var input = {name:'myName', value:'myValue'}
      assert.equal(Editor.getFormattedScore(input),input.value)
    })
  })

  describe('#getFormattedEventHeader', function () {
    it('should return an empty string if all inputs are null', function () {
      assert.equal(Editor.getFormattedEventHeader(
        null,
        null,
        null,
        null,
        false
      ),'')
    })
    it('should return string without bracket if bracket is empty', function () {
      assert.equal(Editor.getFormattedEventHeader(
        {name:'-', value:''},
        {name:'round 1', value:'round 1'},
        {name:'best of 3', value:'best of 3'},
        '',
        false
      ),'round 1 - best of 3')
    })
    it('should return string without round if round is empty', function () {
      assert.equal(Editor.getFormattedEventHeader(
        {name:'pools', value:'pools'},
        {name:'-', value:''},
        {name:'best of 3', value:'best of 3'},
        '',
        false
      ),'pools - best of 3')
    })

    it('should return string without "best of" if it is empty', function () {
      assert.equal(Editor.getFormattedEventHeader(
        {name:'pools', value:'pools'},
        {name:'round 1', value:'round 1'},
        {name:'-', value:''},
        '',
        false
      ),'pools round 1')
    })
    it('should return the typed header if input is active', function () {
      assert.equal(Editor.getFormattedEventHeader(
        {name:'pools', value:'pools'},
        {name:'round 1', value:'round 1'},
        {name:'beat of 3', value:'best of 3'},
        'this is a test',
        true
      ),'this is a test')
    })
  })

  describe('#getOverlayForm', function () {
    it('should return a properly formatted object', function () {
      var outputA = {
        teamOne: {
          name: 'teamOne',
          score: 'p1Score',
          members: []
        },
        teamTwo: {
          name: 'teamTwo',
          score: 'p2Score',
          members: []
        },
        bracketType: 'bracketType',
        eventRound: 'eventRound',
        bestOf: 'bestOf',
        typedHeader: 'typedHeader'
      }

      var outputB = Editor.getOverlayForm(
        null,
        'teamOne',
        'p1Score',
        'teamTwo',
        'p2Score',
        {name:'bracketType',value:'bracketType'},
        {name:'eventRound',value:'eventRound'},
        {name:'bestOf',value:'bestOf'},
        'typedHeader'
      )

      assert.deepEqual(outputA,outputB)
    })
  })

})
