
export default {

  async queryTournaments(key,state) {
    const tournamentQueryData = []
  
    try {
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
            addrState: state
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
                  item.name = this.getFormattedEntrantName(player.gamerTag)
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
              identifier
              event {
                name
              }
              phaseGroup {
                phase {
                  name
                }
              }
              fullRoundText
              slots {
                prereqId
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
                  const s = this.getSetData(node)
                  setQueryData.push(s)
                })
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
            id
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
              prereqId
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

                  const s = this.getSetData(set)

                  s.startedAt = set.startedAt == null ? '' : set.startedAt

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
          team.name = this.getFormattedEntrantName(slots.entrant.name)

          if (slots.entrant.participants != null) {
            slots.entrant.participants.forEach((player) => {

              const item = {}
              item.name = this.getFormattedEntrantName(player.gamerTag)
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
              event {
                name
              }
              phaseGroup {
                phase {
                  name
                }
              }
              fullRoundText
              slots {
                prereqId
                entrant {
                  id
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

                          const s = this.getSetData(set)
                          s.bestOf = 'Best of 3'

                          if(s.eventName.length > 30) {
                            s.eventName = s.eventName.slice(0,30) + "... "
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
              }
              phaseGroup {
                bracketType
                phase {
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
                  name
                }
                phaseGroup {
                  bracketType
                  phase {
                    name
                  }
                }
                fullRoundText
                slots {
                  prereqId
                  entrant {
                    id
                    name
                  }
                }
                displayScore
                completedAt
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
                    
                    const queueData = this.getSetData(set)

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
                      
                      const match = this.getSetData(set)
                      match.score = set.displayScore == null ? '' : set.displayScore
                      
                      if(set.completedAt != null) {
                        match.completedAt = set.completedAt
                        const d = new Date(set.completedAt * 1000)
                        match.stopTime = Math.round((new Date() - d) / (1000 * 60)) + " minutes ago"
                      }
                      
                      if(match.score != 'DQ') {
                        queryData.tournamentMatches.push(match)
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
                        entrant.name = this.getFormattedEntrantName(standing.entrant.name)
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

  getSetData(set) {
    const setData = {id:'', state:'', eventName: '', phaseName: '', fullRoundText: '', teamOne: '?', teamTwo: '?', preReqId1: '', preReqId2: ''}
    
    setData.id = set.id
    setData.state = set.state == null ? '' : set.state
    setData.fullRoundText = set.fullRoundText == null ? '' : set.fullRoundText

    if(set.event != null){
      setData.eventName = set.event.name == null ? '' : set.event.name
    }

    if(set.phaseGroup != null){
      if(set.phaseGroup.phase != null){
        setData.phaseName = set.phaseGroup.phase.name == null ? '' : set.phaseGroup.phase.name
      }
    }

    if(set.slots != null) {
      if(set.slots.length > 0) {

        if(set.slots[0] != null) {
          setData.preReqId1 = set.slots[0].prereqId
          if(set.slots[0].entrant != null) {
            setData.teamOne = this.getFormattedEntrantName(set.slots[0].entrant.name)
          }
        }

        if(set.slots[1] != null) {
          setData.preReqId2 = set.slots[1].prereqId
          if(set.slots[1].entrant != null) {
            setData.teamTwo  = this.getFormattedEntrantName(set.slots[1].entrant.name)
          }
        }
        
      }
    }

    return setData
  },

  getFormattedEntrantName(name) {
    return name == null ? '' : name.slice(name.indexOf("| ") + 1,name.length).trim()
  }

}