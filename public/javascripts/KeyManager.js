
export default {

  overlayBaseURL: '/data/keys/overlay/',

  async importOverlayKeyOrGenerate(path,user_id,overlay_path,overlay_name) {
    var data = await this.importOverlayKey(path+this.overlayBaseURL+'get_key',user_id,overlay_path)

    if(data.key_value.length == 0) {
      data = await this.generateOverlayKey(path+this.overlayBaseURL+'create_key',user_id,overlay_path,overlay_name)
    }

    return data;
  },
  
  async importOverlayKey(path,user_id,overlay_path) {
    var data = {user_id: '', overlay_path: '', overlay_name: '', key_value: ''}
    try {
      const form = { "user_id": user_id, "overlay_path": overlay_path }

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
        }
      }

    } catch(e) {
      console.log(e)
    }
    return data
  },

  async generateOverlayKey(path,user_id,overlay_path,overlay_name) {
    var data = {user_id: '', overlay_path: '', overlay_name: '', key_value: ''}
  
    try {
      const form = { "user_id": user_id, "overlay_path": overlay_path, "overlay_name": overlay_name }

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
        }
      }

    } catch(e) {
      console.log(e)
    }
    return data
  },

  async regenerateOverlayKey(path,user_id,overlay_path,overlay_name) {
    var data = await this.generateOverlayKey(path+this.overlayBaseURL+'update_key',user_id,overlay_path,overlay_name)
    return data
  },

}
