
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

  describe('#getOverlayForm', function () {
    it('should return an object with proper formatting', function () {

      var teamOne = {
        name: 'teamOne',
        members: []
      }

      var teamTwo = {
        name: 'teamTwo',
        members: []
      }

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
      }

      var outputB = Editor.getOverlayForm(
        teamOne,
        'p1Score',
        teamTwo,
        'p2Score',
        'bracketType',
        'eventRound',
        'bestOf',
      )

      assert.deepEqual(outputA,outputB)
    })
  })

})
