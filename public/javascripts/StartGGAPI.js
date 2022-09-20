
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

  

}