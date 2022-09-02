
export default {

  pick(options, choices, index, davesRule) {
    const stage = options[index]

    if(stage != null) {
      choices.push({
        stage_name: stage.stage_name,
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
        stage_name: stage.stage_name,
        order: stage.order,
        choice: 'STRIKE',
        playerName: stage.playerName
      })
    }
  },

  undo(options, choices, stage_name) {
    const indexOfChoice = choices.findIndex(x => x.stage_name == stage_name);
    if(indexOfChoice > -1) {
      choices.splice(indexOfChoice, 1);
    }

    const itemInOptions = options.find(x => x.stage_name == stage_name)
    if(itemInOptions != undefined) {
      itemInOptions.choice = '';
    }
  },

  createStageStrikesForm(stages) {
    const data = []

    for (let i = 0; i < stages.length; i++) {
      const stage = {
        stage_name: stages[i].stage_name,
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
        stage_name: starterStages[i].stage_name,
        order: "STARTER",
        choice: '',
        playerName: ''
      }
      options.push(item);
    }

    for (let j = 0; j < counterpickStages.length; j++) {
      const item = {
        stage_name: counterpickStages[j].stage_name,
        order: "COUNTERPICK",
        choice: '',
        playerName: ''
      }
      options.push(item);
    }

    return options
  },

}
