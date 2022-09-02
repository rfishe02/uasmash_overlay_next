
export default {

  pick(options, choices, index, davesRule) {
    const stage = options[index]

    if(stage != null) {
      choices.push({
        stageName: stage.stageName,
        order: stage.order,
        choice: 'PICK',
        playerName: stage.playerName
      })

      if(davesRule) {
        options.splice(index, 1)
      }

      for (const option of options) {
        option.choice = ''
      }
    }
  },

  strike(options, choices, index) {
    const stage = options[index]

    if(stage != null) {
      stage.choice = 'STRIKE'
      choices.push({
        stageName: stage.stageName,
        order: stage.order,
        choice: 'STRIKE',
        playerName: stage.playerName
      })
    }
  },

  undo(options, choices, stageName) {
    const indexOfChoice = choices.findIndex(x => x.stageName == stageName);
    if(indexOfChoice > -1) {
      choices.splice(indexOfChoice, 1);
    }

    const itemInOptions = options.find(x => x.stageName == stageName)
    if(itemInOptions != undefined) {
      itemInOptions.choice = '';
    }
  },

  createStageStrikesForm(stages) {
    const data = []

    for (let i = 0; i < stages.length; i++) {
      const stage = {
        stageName: stages[i].stageName,
        order: stages[i].order,
        choice: stages[i].choice,
        playerName: stages[i].playerName
      }
      data.push(stage);
    }

    return data
  },

  createOptionsList(starterStages, counterpickStages) {
    const options = []

    for (let i = 0; i < starterStages.length; i++) {
      const item = {
        stageName: starterStages[i].stageName,
        order: "STARTER",
        choice: '',
        playerName: ''
      }
      options.push(item);
    }

    for (let j = 0; j < counterpickStages.length; j++) {
      const item = {
        stageName: counterpickStages[j].stageName,
        order: "COUNTERPICK",
        choice: '',
        playerName: ''
      }
      options.push(item);
    }

    return options
  },

}
