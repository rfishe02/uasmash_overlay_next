
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

  getOverlayForm(playerList,teamOne,p1Score,teamTwo,p2Score,bracketType,eventRound,bestOf) {
    const form = {};
    const teamA = { members: [] };
    const teamB = { members: [] };

    teamA.name = this.getFormattedName(teamOne)
    teamA.score = p1Score

    teamB.name = this.getFormattedName(teamTwo)
    teamB.score = p2Score

    // TODO: Rethink this approach?
    // Do not save additional information, such as social media information, if no order is specified.

    if(playerList != null) {
      if (playerList[teamA.name] != null) {
        teamA.members.push(playerList[teamA.name])
      }
      if (playerList[teamB.name] != null) {
        teamB.members.push(playerList[teamB.name])
      }
    }

    form["teamOne"] = teamA
    form["teamTwo"] = teamB

    form["bracketType"] = bracketType
    form["eventRound"] = eventRound
    form["bestOf"] = bestOf

    return form
  }

}
