
async function queryTournamentsSmashGG() {
  const tournamentQueryData = [];

  try {
    const distanceFrom = "35.3815365, -94.3746986"
    const distance = "10mi"
    const afterDate = Math.floor(Date.now() / 1000) - 604800//000

    const query = `
    query LocalTournaments($distanceFrom: String, $distance: String, $afterDate: Timestamp) {
      tournaments(
        query: {
      		filter: {
            afterDate:$afterDate
            location:{
              distanceFrom: $distanceFrom
              distance: $distance
            }
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
        Authorization: "Bearer " + import.meta.env.VITE_SMASHGG_KEY,
      },
      body: JSON.stringify({
        query,
        variables: {
          distanceFrom: distanceFrom,
          distance: distance,
          afterDate: afterDate,
        },
      }),
    })

    if(response.ok) {
      const data = await response.json()

      if (data.data != null) {
        if (data.data.tournaments != null) {
          if (data.data.tournaments.nodes != null) {
            data.data.tournaments.nodes.forEach((tournament: any) => {
              const item = {};
              item.id = tournament.id;
              item.name = tournament.name;
              item.slug = tournament.slug;
              item.address = tournament.venueAddress;

              item.events = [];
              if (tournament.events != null) {
                tournament.events.forEach((event: any) => {
                  const e = {};
                  e.id = event.id;
                  e.name = event.name;
                  item.events.push(e);
                });
              }
              tournamentQueryData.push(item);
            });
          }
        }
      }
    }

  } catch(e) {
      console.log(e)
  }

  return tournamentQueryData
}

async function queryPlayersSmashGG(queryID: string) {
  const playerQueryData = [];

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
        Authorization: "Bearer " + import.meta.env.VITE_SMASHGG_KEY,
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

              nodes.forEach((player: any) => {

                const item = {};
                item.name = player.gamerTag
                  .slice(
                    player.gamerTag.indexOf("| ") + 1,
                    player.gamerTag.length
                  )
                  .trim();

                if (player.user != null) {
                  item.id = player.user.id;
                  item.socials = [];

                  if (player.user.authorizations != null) {
                    player.user.authorizations.forEach((social: any) => {
                      const account = {};
                      account.username = social.externalUsername;
                      account.type = social.type;
                      item.socials.push(account);
                    });
                  }
                  item.genderPronoun = player.user.genderPronoun;
                }

                playerQueryData.push(item);
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
}

async function querySetsSmashGG(id: string) {
  const setQueryData = [];

  try {
    const query = `
    query MyQuery($eventID: ID) {
    	event(id: $eventID){
    		id
    		name
      	sets (sortType:MAGIC,
          perPage: 24,
        	filters: {
            hideEmpty:true
          }
        ) {
    	    nodes {
            id
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
            		participants {
                  id
              		gamerTag
              		user {
                    id
                    genderPronoun
              			authorizations {
                			externalUsername
                  		type
                		}
                	}
            		}
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
        Authorization: "Bearer " + import.meta.env.VITE_SMASHGG_KEY,
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
              data.data.event.sets.nodes.forEach((node: any) => {
                const s = {};
                s.fullRoundText = node.fullRoundText;
                s.totalGames = node.totalGames;
                s.id = node.id;

                if (node.phaseGroup != null) {
                  if (node.phaseGroup.phase != null) {
                    s.phaseName = node.phaseGroup.phase.name;
                  }
                }

                if (node.slots != null) {
                  if (node.slots[0] != null) {
                    if (node.slots[0].entrant != null) {
                      s.teamOne = {};
                      s.teamOne.name = node.slots[0].entrant.name
                        .slice(
                          node.slots[0].entrant.name.indexOf("| ") + 1,
                          node.slots[0].entrant.name.length
                        )
                        .trim();
                      s.versusBanner = s.teamOne.name;

                      s.teamOne.members = [];

                      if (node.slots[0].entrant.participants != null) {
                        node.slots[0].entrant.participants.forEach(
                          (party: any) => {
                            const p = {};
                            p.id = party.id;
                            p.name = party.gamerTag;

                            if (party.user != null) {
                              p.genderPronoun = party.user.genderPronoun;
                              p.socials = [];
                              if (party.user.authorizations != null) {
                                party.user.authorizations.forEach(
                                  (auth: any) => {
                                    const s = {};
                                    s.username = auth.externalUsername;
                                    s.type = auth.type;
                                    p.socials.push(s);
                                  }
                                );
                              }
                            }
                            s.teamOne.members.push(p);
                          }
                        );
                      }
                    }
                  }

                  if (node.slots[1] != null) {
                    if (node.slots[1].entrant != null) {
                      s.teamTwo = {};
                      s.teamTwo.name = node.slots[1].entrant.name
                        .slice(
                          node.slots[1].entrant.name.indexOf("| ") + 1,
                          node.slots[1].entrant.name.length
                        )
                        .trim();
                      s.versusBanner += " vs " + s.teamTwo.name;

                      s.teamTwo.members = [];

                      if (node.slots[1].entrant.participants != null) {
                        node.slots[1].entrant.participants.forEach(
                          (party: any) => {
                            const p = {};
                            p.id = party.id;
                            p.name = party.gamerTag;

                            if (party.user != null) {
                              p.genderPronoun = party.user.genderPronoun;
                              p.socials = [];
                              if (party.user.authorizations != null) {
                                party.user.authorizations.forEach(
                                  (auth: any) => {
                                    const s = {};
                                    s.username = auth.externalUsername;
                                    s.type = auth.type;
                                    p.socials.push(s);
                                  }
                                );
                              }
                            }
                            s.teamTwo.members.push(p);
                          }
                        );
                      }
                    }
                  }
                }
                setQueryData.push(s);
              });
            }
          }
        }
      }
    }

  } catch(e) {
      console.log(e)
  }

  return setQueryData;
}

export {queryTournamentsSmashGG, queryPlayersSmashGG, querySetsSmashGG}
