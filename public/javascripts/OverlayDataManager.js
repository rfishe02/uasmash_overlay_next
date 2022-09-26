
export default {

  overlayBaseURL: '/data/overlay/',

  async importOverlayDataOrGenerate(path,user_id,overlay_path,overlay_name) {
    var data = await this.importOverlayData(path,user_id,overlay_path)

    if(data.key_value.length == 0) {
      data = await this.generateOverlayData(path+this.overlayBaseURL+'make_data',user_id,overlay_path,overlay_name)
    }

    return data;
  },

  async importOverlayData(path,user_id,overlay_path) {
    var data = { user_id: '', overlay_path: '', overlay_name: '', key_value: '', settings: null }
    try {
      const url = path + this.overlayBaseURL + 'get_data?' + new URLSearchParams({ "user_id": user_id, "overlay_path": overlay_path })

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
    var data = {user_id: '', overlay_path: '', overlay_name: '', key_value: ''}
  
    try {
      const form = { "user_id": user_id, "overlay_path": overlay_path, "overlay_name": overlay_name, settings: null }

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
    var data = await this.generateOverlayData(path+this.overlayBaseURL+'update_key',user_id,overlay_path,overlay_name)
    return data
  },

  async saveOverlaySettings(path,user_id,settings) {
    var data = {user_id: '', overlay_path: '', overlay_name: '', key_value: ''}
  
    try {
      const url = path + this.overlayBaseURL + 'update_settings'
      const form = { "user_id": user_id, settings: settings }

      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(form)
      })

      if(response.ok) {
        const results = await response.json()
        // TODO: Return something useful?
      }

    } catch(e) {
      console.log(e)
    }
    return data
  },

  async importOverlaySettings(path,key_value) {
    var data = { user_id: '', overlay_path: '', overlay_name: '', key_value: '', settings: null }
    try {
      const url = path + this.overlayBaseURL + 'get_settings?' + new URLSearchParams({ "key_value": key_value })

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
