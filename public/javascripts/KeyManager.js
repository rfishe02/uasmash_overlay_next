
export default {

  async importRoomKey(path,user_id,module_name) {
    var key = ""
    try {
      const data = { "user_id": user_id, "module_name": module_name }

      const response = await fetch(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data)
      })

      if(response.ok) {
        const results = await response.json()
        if(results.length > 0) {
          key = results[0].key_value
        }
      }

    } catch(e) {
      console.log(e)
    }
    return key
  },

  async generateRoomKey(path,user_id,module_name) {
    var key = ""
    try {
      const data = { "user_id": user_id, "module_name": module_name }

      const response = await fetch(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data)
      })

      if(response.ok) {
        const results = await response.json()
        key = results.key_value
      }

    } catch(e) {
      console.log(e)
    }
    return key
  },

}
