
export default {

  getFormattedName(data) {
    if (data == null) {
      return ""
    } else if (typeof data == "string") {
      return data
    } else {
      return data.name
    }
  },

  getFormattedScore(score) {
    if (score == null) {
      return ""
    } else {
      return score.value
    }
  },

  getTeamOneObject(setSelection, playerList, seatingChoice) {
    const team = { name: '', members: [] }

    if(seatingChoice == 'Player 1 Right') {
      team.name = setSelection.teamTwo == null ? "" : setSelection.teamTwo.name
    } else {
      team.name = setSelection.teamOne == null ? "" : setSelection.teamOne.name
    }

    if (seatingChoice != 'No Order' && playerList[team.name] != null) {
      team.members.push(playerList[team.name])
    }

    return team
  },

  getTeamTwoObject(setSelection, playerList, seatingChoice) {
    const team = { name: '', members: [] }

    if(seatingChoice == 'Player 1 Right') {
      team.name = setSelection.teamOne == null ? "" : setSelection.teamOne.name
    } else {
      team.name = setSelection.teamTwo == null ? "" : setSelection.teamTwo.name
    }

    if (seatingChoice != 'No Order' && playerList[team.name] != null) {
      team.members.push(playerList[team.name])
    }

    return team
  },

  getOverlayForm(teamOne,p1Score,teamTwo,p2Score,bracketType,eventRound,bestOf) {
    const form = {};
    const teamA = { name: '', score: '', members: [] };
    const teamB = { name: '', score: '', members: [] };

    teamA.name = this.getFormattedName(teamOne)
    teamA.score = p1Score

    if(teamOne.socials != null) {
      teamA.members.push(teamOne)
    }
    if(teamOne.members != null) {
      teamA.members = teamOne.members
    }

    teamB.name = this.getFormattedName(teamTwo)
    teamB.score = p2Score

    if(teamTwo.socials != null) {
      teamB.members.push(teamTwo)
    }
    if(teamTwo.members != null) {
      teamB.members = teamTwo.members
    }

    form["teamOne"] = teamA
    form["teamTwo"] = teamB

    form["bracketType"] = bracketType
    form["eventRound"] = eventRound
    form["bestOf"] = bestOf

    return form
  }

}
