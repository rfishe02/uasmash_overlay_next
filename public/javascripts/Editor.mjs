
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

  getFormattedEventHeader(brackettype,eventround,bestof,typed_header,typing_header) {
    let generatedHeader = ""

    if (brackettype != null && eventround != null && bestof != null && typed_header != null) {
      const bracket = brackettype.value == null ? "" : brackettype.value;
      const event = eventround.value == null ? "" : eventround.value;
      const best = bestof.value == null ? "" : bestof.value;

      if (typing_header) {
        generatedHeader = typed_header;
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

  getOverlayForm(setselection,teamone,p1score,teamtwo,p2score,eventheader) {
    const form = {};
    const teamOne = { members: [] };
    const teamTwo = { members: [] };

    teamOne.name = teamone
    teamOne.score = p1score

    teamTwo.name = teamtwo
    teamTwo.score = p2score

    if(setselection != null) {
      if (setselection.teamOne != null) {
        teamOne.members = setselection.teamOne.members
      }
      if (setselection.teamTwo != null) {
        teamTwo.members = setselection.teamTwo.members
      }
    }

    form["teamOne"] = teamOne
    form["teamTwo"] = teamTwo
    form["eventheader"] = eventheader

    return form
  }

}
