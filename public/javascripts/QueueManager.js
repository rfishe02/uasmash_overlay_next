export default {

  refreshQueue(setQueue, newQueueItems) {

    const setQueueLookup = {}
    const updatedIdSet = new Set()
    const inactiveSets = []

    setQueue.forEach(item => {
      setQueueLookup[item.id] = item
    })

    newQueueItems.forEach(item => {
      const match = setQueueLookup[item.id]

      if(match == null){
        setQueue.push(item)
        setQueueLookup[item.id] = item

      } else {
        
        match.state = item.state 
        match.eventName = item.eventName
        match.fullRoundText = item.fullRoundText
        match.phaseName = item.phaseName
        match.teamOne = item.teamOne
        match.teamTwo = item.teamTwo

      }

      updatedIdSet.add(item.id) 
    })

    setQueue.forEach(item => {

      const setNoLongerActive = !updatedIdSet.has(item.id)
      if(setNoLongerActive){
        inactiveSets.push(i)

      } else {

        item.preReqs = []
        const preReq1 = setQueueLookup[item.preReqId1];
        const preReq2 = setQueueLookup[item.preReqId2];

        if(preReq1 != null) {
          item.preReqs.push(`${preReq1.teamOne} vs. ${preReq1.teamTwo}`)
        }
        if(preReq2 != null) {
          item.preReqs.push(`${preReq2.teamOne} vs. ${preReq2.teamTwo}`)
        }

      }

    })

    inactiveSets.forEach(index => {
      setQueue.splice(index,1)
    })

  }
  
}