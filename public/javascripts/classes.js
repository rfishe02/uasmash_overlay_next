import { Order, Choice } from "./enums.js";

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Module {
  constructor(path) {
    this.path = window.location.host + "/"+ path;
  }
  getURL() {
    return this.path +"?id=";
  }
}

class Score {
  constructor() {
    this.name = "";
    this.value = "";
  }
}

class Social {
  constructor() {
    this.username = "";
    this.type = "";
  }
}

class Player {
  constructor() {
    this.id = "";
    this.name = "";
    this.socials = [];
    this.genderPronoun = "";
  }
}

class Team {
  constructor() {
    this.name = "";
    this.members = [];
    this.score = "";
  }
}

class Stage {
  constructor() {
    this.stage_name = "";
    this.order = Order.None;
    this.choice = Choice.None;
    this.playerName = "";
  }
}

class Set {
  constructor() {
    this.id = "";
    this.phaseName = "";
    this.fullRoundText = "";
    this.totalGames = "";
    this.teamOne = new Team();
    this.teamTwo = new Team();
    this.versusBanner = "";
  }
}

class Event {
  constructor() {
    this.id = "";
    this.name = "";
  }
}

class Tournament {
  constructor() {
    this.id = "";
    this.name = "";
    this.slug = "";
    this.address = "";
    this.events = [];
  }
}

export { Module, Score, Social, Player, Stage, Set, Event, Tournament, Team, User };
