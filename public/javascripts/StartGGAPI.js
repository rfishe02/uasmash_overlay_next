
export default {

  async queryTournaments(key) {
    const tournamentQueryData = []
  
    try {
      const addrState = 'AR'
      const query = `
      query LocalTournaments($addrState:String) {
        tournaments(
          query: {
            sort: startAt
            filter: {
              addrState:$addrState
            }
        }) {
          nodes {
            id
            slug
            name
            venueAddress
            city
            addrState
            postalCode
            startAt
            createdAt
            state
            numAttendees
            events {
              id
              name
            }
          }
        }
      }`
  
      const response = await fetch(
        "https://api.start.gg/gql/alpha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + key,
        },
        body: JSON.stringify({
          query,
          variables: {
            addrState: addrState
          },
        }),
      })
  
      if(response.ok) {
        const data = await response.json()
  
        if (data.data != null) {
          if (data.data.tournaments != null) {
            if (data.data.tournaments.nodes != null) {
              data.data.tournaments.nodes.forEach((tournament) => {
                const item = {}
                item.id = tournament.id
                item.name = tournament.name
                item.slug = tournament.slug
                item.address = tournament.venueAddress
  
                item.events = []
                if (tournament.events != null) {
                  tournament.events.forEach((event) => {
                    const e = {}
                    e.id = event.id
                    e.name = event.name
                    item.events.push(e)
                  });
                }
                tournamentQueryData.push(item)
              });
            }
          }
        }
      }
  
    } catch(e) {
        console.log(e)
    }
    return tournamentQueryData
  },
  
  async queryPlayers(key,queryID) {
    const playerQueryData = []
  
    try {
      const query = `
      query TournamentParticipants($tourneyID: ID) {
        tournament(id: $tourneyID){
          id
          name
          numAttendees
          participants (query: {
            perPage: 100
          }) {
            nodes {
              id
              gamerTag
              user {
                id
                genderPronoun
                authorizations {
                  id
                  externalUsername
                  type
                }
              }
            }
          }
        }
      }`
  
      const response = await fetch("https://api.start.gg/gql/alpha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + key,
        },
        body: JSON.stringify({
          query,
          variables: { tourneyID: queryID },
        }),
      })
  
      if(response.ok) {
        const data = await response.json()
  
        if (data.data != null) {
          if (data.data.tournament != null) {
            if (data.data.tournament.participants != null) {
  
              const nodes = data.data.tournament.participants.nodes;
              if (nodes != null) {
  
                nodes.forEach((player) => {
  
                  const item = {}
                  item.name = player.gamerTag
                    .slice(
                      player.gamerTag.indexOf("| ") + 1,
                      player.gamerTag.length
                    )
                    .trim()
                  item.socials = []
  
                  if (player.user != null) {
                    item.id = player.user.id
  
                    if (player.user.authorizations != null) {
                      player.user.authorizations.forEach((social) => {
                        if(social.type == "TWITTER" || social.type == "TWITCH") {
                          const account = {}
                          account.username = social.externalUsername
                          account.type = social.type
                          item.socials.push(account)
                        }
                      });
                    }
                    item.genderPronoun = player.user.genderPronoun
                  }
  
                  playerQueryData.push(item)
                });
  
              }
  
            }
          }
        }
      }
  
    } catch(e) {
        console.log(e)
    }
  
    return playerQueryData
  },
  
  async querySets(key,id){
    const setQueryData = []
    try {
      const query = `
      query MyQuery($eventID: ID) {
        event(id: $eventID){
          id
          name
          sets (sortType: CALL_ORDER,
            perPage: 24,
            filters: {
              hideEmpty: true
              state: [1,2,3]
            }
          ) {
            nodes {
              id
              state
              startedAt
              completedAt
              round
              fullRoundText
              setGamesType
              totalGames
              phaseGroup {
                phase {
                  name
                }
              }
              slots {
                entrant {
                  name
                }
              }
            }
          }
        }
      }`
  
      const response = await fetch("https://api.start.gg/gql/alpha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + key,
        },
        body: JSON.stringify({
          query,
          variables: { eventID: id },
        }),
      })
  
      if(response.ok) {
        const data = await response.json()
  
        if (data.data != null) {
          if (data.data.event != null) {
            if (data.data.event.sets != null) {
              if (data.data.event.sets.nodes != null) {
                data.data.event.sets.nodes.forEach((node) => {
                  const s = {}
                  s.fullRoundText = node.fullRoundText
                  s.id = node.id
                  s.state = node.state
                  s.totalGames = node.totalGames
  
                  s.bracketAndRound = s.fullRoundText
  
                  if (node.phaseGroup != null) {
                    if (node.phaseGroup.phase != null) {
                      s.phaseName = node.phaseGroup.phase.name
  
                      s.bracketAndRound =  s.phaseName + " " + s.bracketAndRound
                    }
                  }
  
                  s.teamOne = { name: '' };
                  s.teamTwo = { name: '' };
  
                  if (node.slots != null) {
                    if (node.slots[0] != null) {
                      if (node.slots[0].entrant != null) {
                        s.teamOne.name = node.slots[0].entrant.name
                          .slice(
                            node.slots[0].entrant.name.indexOf("| ") + 1,
                            node.slots[0].entrant.name.length
                          ).trim()
  
                        s.versusBanner = s.teamOne.name
                        s.teamOne.members = []
                      }
                    }
  
                    if (node.slots[1] != null) {
                      if (node.slots[1].entrant != null) {
                        s.teamTwo.name = node.slots[1].entrant.name
                          .slice(
                            node.slots[1].entrant.name.indexOf("| ") + 1,
                            node.slots[1].entrant.name.length
                          ).trim();
  
                        s.versusBanner += " vs " + s.teamTwo.name
                        s.teamTwo.members = []
                      }
                    }
                  }
                  setQueryData.push(s)
                });
              }
            }
          }
        }
      }
  
    } catch(e) {
        console.log(e)
    }
    return setQueryData
  },

  async queryStreamQueue(key,slug){
    const streamQueryData = []
    try {
      const query = `
      query TournamentQuery($slug: String) {
      tournament(slug: $slug){
        id
        name
        slug
        state
        streamQueue {
          sets {
            completedAt
            createdAt
            event {
              id
              name
            }
            fullRoundText
            games {
              orderNum
              winnerId
            }
            phaseGroup {
              bracketType
              phase {
                name
              }
            }
            setGamesType
            slots {
              entrant {
                id
                name
                participants {
                  prefix
                  gamerTag
                  user {
                    id
                    name
                    genderPronoun
                    authorizations {
                      externalUsername
                      type
                    }
                  }
                }
              }
            }
            startAt
            startedAt
            state
            totalGames
          }
        }
      }
    }`

      const response = await fetch("https://api.start.gg/gql/alpha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + key,
        },
        body: JSON.stringify({
          query,
          variables: { slug: slug },
        }),
      })

      if(response.ok) {
        const data = await response.json()

        if (data.data != null) {
          if (data.data.tournament != null) {
            if(data.data.tournament.streamQueue != null) {
              if(data.data.tournament.streamQueue[0].sets != null){

                data.data.tournament.streamQueue[0].sets.forEach((set) => {
                  const s = {
                    eventName: '',
                    phaseName: '',
                    fullRoundText: '',
                    state: '',
                    startedAt: '',
                  }

                  s.fullRoundText = set.fullRoundText == null ? '' : set.fullRoundText
                  s.state = set.state == null ? '' : set.state
                  s.startedAt = set.startedAt == null ? '' : set.startedAt

                  if(set.event != null) {
                    s.eventName = set.event.name == null ? '' : set.event.name
                  }
                  if(set.phaseGroup != null) {
                    if(set.phaseGroup.phase != null) {
                      s.phaseName = set.phaseGroup.phase.name == null ? '' : set.phaseGroup.phase.name
                    }
                  }

                  s.teamOne = this.getTeamData(set,0)
                  s.teamTwo = this.getTeamData(set,1)

                  streamQueryData.push(s)
                })

              }
            }
          }
        }

      }

    } catch(e) {
        console.log(e)
    }

    return streamQueryData
  },

  getTeamData(set, slotIndex) {
    const team = { entrantID: '', name: '', score: '', members: [] }

    if(set.slots != null) {
      const slots = set.slots[slotIndex]

      if (slots != null) {
        if (slots.entrant != null) {
          team.entrantID = slots.entrant.id
          team.name = slots.entrant.name.slice(slots.entrant.name.indexOf("| ") + 1,slots.entrant.name.length).trim()

          if (slots.entrant.participants != null) {
            slots.entrant.participants.forEach((player) => {

              const item = {}
              item.name = player.gamerTag.slice(player.gamerTag.indexOf("| ") + 1,player.gamerTag.length).trim()
              item.socials = []

              if (player.user != null) {
                item.id = player.user.id

                if (player.user.authorizations != null) {
                  player.user.authorizations.forEach((social) => {
                    if(social.type == "TWITTER" || social.type == "TWITCH") {
                      const account = {}
                      account.username = social.externalUsername
                      account.type = social.type
                      item.socials.push(account)
                    }
                  });
                }
                item.genderPronoun = player.user.genderPronoun == null ? '' : player.user.genderPronoun
              }

              team.members.push(item)
            })
          }

          if(set.games != null) {
            team.score = 0
            set.games.forEach((game) => {
              if(game.winnerId === team.entrantID){
                team.score++
              }
            })
          }

        }
      }
    }

    return team
  },

  async queryUpcomingMatches(key,slug) {
    const setQueryData = []
    const query = `
    query MyQuery($slug: String) {
      tournament(slug:$slug){
        name
        events {
          name
          state
        sets (
          sortType: CALL_ORDER
          filters: {
            hideEmpty: true
            state: [1,2]
          }
        ) {
            nodes {
              id 
              state 
              identifier
              fullRoundText
              phaseGroup {
                phase {
                  name
                }
              }
              slots {
                prereqId
                entrant {
                  name
                }
              }
            }
          }
        }
      }
    }`

    try {

      const response = await fetch("https://api.start.gg/gql/alpha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + key,
        },
        body: JSON.stringify({
          query,
          variables: { slug: slug },
        }),
      })

      if(response.ok){
        const data = await response.json()

        if(data.data != null){
          if(data.data.tournament != null){

            if(data.data.tournament.events != null){
              data.data.tournament.events.forEach(event => {
                
                if(event.state != null) {
                  if(event.state == 'ACTIVE'){
                    
                    if(event.sets != null){
                      if(event.sets.nodes != null) {
                        event.sets.nodes.forEach(set => {
                          const s = {id: '', preReqId1: '', preReqId2: '', state: '', eventName:'', fullRoundText: '', phaseName: '', teamOne: '?', teamTwo: '?', bestOf: 'Best of 3'}
                          s.id = set.id 
                          s.state = set.state == null ? '' : set.state

                          s.eventName = event.name == null ? '' : event.name
                          if(s.eventName.length > 30) {
                            s.eventName = s.eventName.slice(0,30) + "... "
                          }

                          s.fullRoundText = set.fullRoundText == null ? '' : set.fullRoundText
                        
                          if(set.phaseGroup != null){
                            if(set.phaseGroup.phase != null){
                              s.phaseName = set.phaseGroup.phase.name == null ? '' : set.phaseGroup.phase.name
                            }
                          }
                        
                          if(set.slots != null){
                            if(set.slots[0] != null){
                              s.preReqId1 = set.slots[0].prereqId
                              if(set.slots[0].entrant != null) {
                                s.teamOne = set.slots[0].entrant.name.slice(set.slots[0].entrant.name.indexOf("| ") + 1,set.slots[0].entrant.name.length).trim()
                              }
                            }
                          
                            if(set.slots[1] != null){
                              s.preReqId2 = set.slots[1].prereqId
                              if(set.slots[1].entrant != null) {
                                s.teamTwo = set.slots[1].entrant.name.slice(set.slots[1].entrant.name.indexOf("| ") + 1,set.slots[1].entrant.name.length).trim()
                              }
                            }
                          }

                          if(s.state != 3){
                            setQueryData.push(s)
                          }
                        })
                      }
                    }

                  }
                }

              })
            }

          }
        }
      }

    } catch(e){
      console.log(e)
    }

    console.log(setQueryData)
    return setQueryData
  },

  async queryEventInformation(key,slug){
    const queryData = { tournamentName: '', tournamentStandings: [], tournamentMatches: [], tournamentStreamQueue: [] }
    const updatedAfter = Math.floor(Date.now() / 1000) - 1800

    try {
      const query = `
      query TournamentQuery($slug: String, $updatedAfter:Timestamp) {
        tournament(slug: $slug){
          id
          name
          streamQueue {
            sets {
              id
              state
              event {
                name
                phases {
                  name
                }
              }
              fullRoundText
               slots{
                prereqId
                entrant {
                  id
                  name
                }
              }
            }
          }
          events {
            name
            state
            sets(
              perPage: 10
              filters: {
                state: [3]
                hideEmpty: true
                updatedAfter:$updatedAfter
              }
              sortType: RECENT
            ) {
              nodes{
                id
                state
                event {
                  phases {
                    name
                  }
                }
                fullRoundText
                displayScore
                completedAt
                slots {
                  prereqId
                  entrant {
                    id
                    name
                  }
                }
              }
            }
            standings(
              query: {
                perPage: 8
              }
            ){
                nodes {
                  placement
                  entrant {
                    id
                    name
                  }
                }
              }
          }
        }
      }`

      const response = await fetch("https://api.start.gg/gql/alpha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + key,
        },
        body: JSON.stringify({
          query,
          variables: { slug: slug, updatedAfter: updatedAfter },
        }),
      })

      if(response.ok) {
        const data = await response.json()

        if (data.data != null) {
          if (data.data.tournament != null) {
            queryData.tournamentName = data.data.tournament.name == null ? '' : data.data.tournament.name

            if(data.data.tournament.streamQueue != null) {
              data.data.tournament.streamQueue.forEach((queue) => {

                if(queue.sets != null) {
                  queue.sets.forEach((set) => {
                    
                    const queueData = {id:'', state:'', eventName: '', phaseName: '', fullRoundText: '', teamOne: '?', teamTwo: '?'}
                    queueData.id = set.id
                    queueData.state = set.state == null ? '' : set.state
                    queueData.fullRoundText = set.fullRoundText == null ? '' : set.fullRoundText

                    if(set.event != null){
                      queueData.eventName = set.event.name == null ? '' : set.event.name
                      if(set.event.phases != null) {
                        if(set.event.phases.length > 0){
                          queueData.phaseName = set.event.phases[0].name == null ? '' : set.event.phases[0].name
                        }
                      }
                    }

                    if(set.slots != null) {
                      if(set.slots.length > 0) {
                        if(set.slots[0].entrant != null) {
                          queueData.teamOne = set.slots[0].entrant.name == null ? '' : set.slots[0].entrant.name.slice(set.slots[0].entrant.name.indexOf("| ") + 1,set.slots[0].entrant.name.length).trim()
                        }
                        if(set.slots[1].entrant != null) {
                          queueData.teamTwo  = set.slots[1].entrant.name == null ? '' : set.slots[1].entrant.name.slice(set.slots[1].entrant.name.indexOf("| ") + 1,set.slots[1].entrant.name.length).trim()
                        }
                      }
                    }

                    if(queueData.state != 2) {
                      queryData.tournamentStreamQueue.push(queueData)
                    }
                  })
                }

              })
            }

            if(data.data.tournament.events != null) {
              data.data.tournament.events.forEach((e) => {

                if(e.sets != null) {
                  if(e.sets.nodes != null) {
                    e.sets.nodes.forEach((set) => {
                      const match = {id:'', state:'', eventName: '', phaseName: '', fullRoundText: '', teamOne: '', teamTwo: '', score: '', completedAt: '', stopTime: ''}
                      match.id = set.id
                      match.state = set.state
                      match.score = set.displayScore == null ? '' : set.displayScore
                      match.eventName = e.name == null ? '' : e.name
                      match.fullRoundText = set.fullRoundText == null ? '' : set.fullRoundText

                      if(set.completedAt != null) {
                        match.completedAt = set.completedAt
                        const d = new Date(set.completedAt * 1000)
                        match.stopTime = Math.round((new Date() - d) / (1000 * 60)) + " minutes ago"
                      }
                      if(set.event != null){
                        if(set.event.phases != null){
                          if(set.event.phases.length > 0) {
                            match.phaseName = set.event.phases[0].name == null ? '' : set.event.phases[0].name
                          }
                        }
                      }

                      if(set.slots != null) {
                        if(set.slots[0] != null) {
                          if(set.slots[0].entrant != null){
                            match.teamOne = set.slots[0].entrant.name == null ? '' : set.slots[0].entrant.name.slice(set.slots[0].entrant.name.indexOf("| ") + 1,set.slots[0].entrant.name.length).trim()
                          }
                        }
                        if(set.slots[1] != null) {
                          if(set.slots[1].entrant != null){
                            match.teamTwo = set.slots[1].entrant.name == null ? '' : set.slots[1].entrant.name.slice(set.slots[1].entrant.name.indexOf("| ") + 1,set.slots[1].entrant.name.length).trim()
                          }
                        }

                        if(match.score != 'DQ') {
                          queryData.tournamentMatches.push(match)
                        }
                      }

                    })
                  }
                }


                const eventStandings = {name: '', state: '', standings: []}
                eventStandings.name = e.name == null ? '' : e.name
                eventStandings.state = e.state == null ? '' : e.state

                if(e.standings != null){
                  if(e.standings.nodes != null){
                    e.standings.nodes.forEach((standing) => {
                      if(standing.entrant != null) {
                        const entrant = { name: '', placement: ''}
                        entrant.name = standing.entrant.name == null ? '' : standing.entrant.name.slice(standing.entrant.name.indexOf("| ") + 1,standing.entrant.name.length).trim()
                        entrant.placement = standing.placement == null ? '' : standing.placement
                        eventStandings.standings.push(entrant)
                      }
                    })
                  }
                }
                if(eventStandings.standings.length > 0) {
                  queryData.tournamentStandings.push(eventStandings)
                }

              })
            }

          }
        }

      }

    } catch(e) {
        console.log(e)
    }

    return queryData
  },

}