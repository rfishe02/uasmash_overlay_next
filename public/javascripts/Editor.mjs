
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

  getOverlayForm(setSelection,teamOne,p1Score,teamTwo,p2Score,bracketType,eventRound,bestOf,seatingChoice) {
    const form = {};
    const teamA = { members: [] };
    const teamB = { members: [] };

    teamA.name = this.getFormattedName(teamOne)
    teamA.score = p1Score

    teamB.name = this.getFormattedName(teamTwo)
    teamB.score = p2Score

    // TODO: Rethink this approach?
    // Do not save additional information, such as social media information, if no order is specified.

    if(seatingChoice != 'No Order') {
      if(setSelection != null) {
        if (setSelection.teamOne != null) {
          teamA.members = setSelection.teamOne.members
        } else if(teamOne.socials != null) {
          teamA.members.push(teamOne)
        }
        if (setSelection.teamTwo != null) {
          teamB.members = setSelection.teamTwo.members
        } else if(teamTwo.socials != null) {
          teamB.members.push(teamTwo)
        }
      }
    }

    if(seatingChoice == 'Team 1 Left' || seatingChoice == 'No Order') {
      form["teamOne"] = teamA
      form["teamTwo"] = teamB
    } else if(seatingChoice == 'Team 1 Right') {
      form["teamTwo"] = teamA
      form["teamOne"] = teamB
    }

    form["bracketType"] = bracketType
    form["eventRound"] = eventRound
    form["bestOf"] = bestOf

    return form
  }

}
