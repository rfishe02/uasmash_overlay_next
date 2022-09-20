export default {

  refreshQueue(priorQueue, newQueueItems) {

    const priorQueueLookup = {}
    const updatedQueueIdSet = new Set()
    const removeIndexes = []

    priorQueue.forEach(item => {
      priorQueueLookup[item.id] = item
    })

    newQueueItems.forEach(item => {
      const match = priorQueueLookup[item.id]

      if(match == null){
        priorQueue.push(item)
      } else {
        match.teamOne = item.teamOne
        match.teamTwo = item.teamTwo
      }

      updatedQueueIdSet.add(item.id) 
    })

    for(var i = 0; i < priorQueue.length; i++){
      if(!updatedQueueIdSet.has(priorQueue[i].id)){
        removeIndexes.push(i)
      }
    }

    removeIndexes.forEach(index => {
      priorQueue.splice(index,1)
    })

  }
  
}