
export default {

  overlayBaseURL: '/data/overlay/',
  overlayList: [
    {path: "players", name: "Player Overlay"},
    {path: "stage_strikes", name: "Stage Strikes Overlay"},
    {path: "waiting", name: "Waiting Screen"},
    {path: "upcoming", name: "Upcoming Matches"},
  ],

  async importOverlayDataOrGenerate(path,user_id) {
    const url = `${path}${this.overlayBaseURL}make_data`
    const overlayURLs = []

    const data = await this.importUserData(path,user_id)

    if(data.length > 0) {
      for(const overlay of data) {
        const urlItem = {type: 0, path:overlay.overlay_path, name:overlay.overlay_name, room:overlay.key_value}
        overlayURLs.push(urlItem)
      }
    } else {
      for(const item of this.overlayList) {
        const overlay = await this.generateOverlayData(url,user_id,item.path,item.name)
        
        const urlItem = {type: 0, path:overlay.overlay_path, name:overlay.overlay_name, room:overlay.key_value}  // TODO: Support for multiple types.
        overlayURLs.push(urlItem)
      }
    }

    return overlayURLs;
  },

  async importUserData(path,user_id) {
    var data = []
    try {
      const url = `${path}${this.overlayBaseURL}get_user_data?${new URLSearchParams({ "user_id": user_id })}`

      const response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })

      if(response.ok) {
        const results = await response.json()
        if(results.length > 0) {
          for(const result of results) {
            const urlItem = { 
              user_id: result.user_id, 
              overlay_path: result.overlay_path, 
              overlay_name: result.overlay_name, 
              key_value: result.key_value, 
              settings: result.settings 
            }
            
            data.push(urlItem)
          }
        }
      }

    } catch(e) {
      console.log(e)
    }
    return data
  },

  async importOverlayData(path,user_id,overlay_path) {
    var data = { user_id: '', overlay_path: '', overlay_name: '', key_value: '', settings: null }
    try {
      const url =  `${path}${this.overlayBaseURL}get_overlay_data?${new URLSearchParams({ "user_id": user_id, "overlay_path": overlay_path })}` 

      const response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })

      if(response.ok) {
        const results = await response.json()
        if(results.length > 0) {
          data.user_id = results[0].user_id 
          data.overlay_path = results[0].overlay_path 
          data.overlay_name = results[0].overlay_name 
          data.key_value = results[0].key_value
          data.settings = results[0].settings
        }
      }

    } catch(e) {
      console.log(e)
    }
    return data
  },

  async generateOverlayData(path,user_id,overlay_path,overlay_name) {
    var data = {user_id: '', overlay_path: '', overlay_name: '', key_value: '', settings: null }
    
    try {
      const form = { "user_id": user_id, "overlay_path": overlay_path, "overlay_name": overlay_name, "settings": { poll: false, winnerBestOfStart: "Quarter-Final", loserBestOfStart: "Quarter-Final", slug: null, logoChoice: "" } }

      const response = await fetch(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(form)
      })

      if(response.ok) {
        const results = await response.json()
        if(results.length > 0) {
          data.user_id = results[0].user_id 
          data.overlay_path = results[0].overlay_path 
          data.overlay_name = results[0].overlay_name 
          data.key_value = results[0].key_value
          data.settings = results[0].settings
        }
      }

    } catch(e) {
      console.log(e)
    }
    return data
  },

  async regenerateOverlayKey(path,user_id,overlay_path,overlay_name) {
    const url = `${path}${this.overlayBaseURL}update_key`
    var data = await this.generateOverlayData(url,user_id,overlay_path,overlay_name)
    return data
  },

  async saveOverlaySettings(path,user_id,settings) {
    var data = {user_id: '', overlay_path: '', overlay_name: '', key_value: ''}
  
    try {
      const url =  `${path}${this.overlayBaseURL}update_settings`
      const form = { "user_id": user_id, settings: settings }

      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(form)
      })

      if(response.ok) {
        return true;
      } else {
        return false;
      }

    } catch(e) {
      console.log(e)
    }
    return data
  },

  async importOverlaySettings(path,key_value) {
    var data = { user_id: '', overlay_path: '', overlay_name: '', key_value: '', settings: null }
    try {
      const url = `${path}${this.overlayBaseURL}get_settings?${new URLSearchParams({ "key_value": key_value })}`

      const response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })

      if(response.ok) {
        const results = await response.json()
        if(results.length > 0) {
          data.user_id = results[0].user_id 
          data.overlay_path = results[0].overlay_path 
          data.overlay_name = results[0].overlay_name 
          data.key_value = results[0].key_value
          data.settings = results[0].settings
        }
      }

    } catch(e) {
      console.log(e)
    }
    return data
  },

}
