
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

  // TODO: Remove support for typedHeader.

  getFormattedEventHeader(bracketType,eventRound,bestOf,typedHeader,typingHeader) {
    let generatedHeader = ""

    if (bracketType != null && eventRound != null && bestOf != null && typedHeader != null) {
      const bracket = bracketType.value == null ? "" : bracketType.value;
      const event = eventRound.value == null ? "" : eventRound.value;
      const best = bestOf.value == null ? "" : bestOf.value;

      if (typingHeader) {
        generatedHeader = typedHeader;
      } else {
        if (bracket.length > 0 && event.length > 0) {
          generatedHeader = bracket + " " + event
        } else if (bracket.length > 0) {
          generatedHeader = bracket
        } else if (event.length > 0) {
          generatedHeader = event
        }

        if (generatedHeader.length > 0 && best.length > 0) {
          generatedHeader = generatedHeader + " - " + best
        } else if (best.length > 0) {
          generatedHeader = best
        }
      }
    }
    return generatedHeader
  },

  getOverlayForm(setSelection,teamOne,p1Score,teamTwo,p2Score,bracketType,eventRound,bestOf,typedHeader, seatingChoice) {
    const form = {};
    const teamA = { members: [] };
    const teamB = { members: [] };

    teamA.name = teamOne
    teamA.score = p1Score

    teamB.name = teamTwo
    teamB.score = p2Score

    // TODO: Rethink this approach?
    // Do not save additional information, such as social media information, if no order is specified.

    if(setSelection != null && seatingChoice != 'No Order') {
      if (setSelection.teamOne != null) {
        teamA.members = setSelection.teamOne.members
      }
      if (setSelection.teamTwo != null) {
        teamB.members = setSelection.teamTwo.members
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
    form["typedHeader"] = typedHeader == null ? '' : typedHeader

    return form
  }

}
