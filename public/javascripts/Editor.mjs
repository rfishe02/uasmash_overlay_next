
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

  getOverlayForm(setSelection,teamOne,p1Score,teamTwo,p2Score,bracketType,eventRound,bestOf,typedHeader) {
    const form = {};
    const one = { members: [] };
    const two = { members: [] };

    one.name = teamOne
    one.score = p1Score

    two.name = teamTwo
    two.score = p2Score

    if(setSelection != null) {
      if (setSelection.teamOne != null) {
        one.members = setSelection.teamOne.members
      }
      if (setSelection.teamTwo != null) {
        two.members = setSelection.teamTwo.members
      }
    }

    form["teamOne"] = one
    form["teamTwo"] = two

    form["bracketType"] = bracketType
    form["eventRound"] = eventRound
    form["bestOf"] = bestOf
    form["typedHeader"] = typedHeader == null ? '' : typedHeader

    return form
  }

}
