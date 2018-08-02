// import JWT from 'expo-jwt'
import { SecureStore } from 'expo';
import { handshake, host_url, beta, default_origin_latitude, default_origin_longitude } from '../../config'
import { Permissions, Location } from 'expo'

class ApiService {

  static encodeJwt(payload){
    // return JWT.encode(payload, handshake, {algorithm: 'HS384' })
    return payload
  }

  static async decodeJwt(payload){
    // return JWT.decode(payload, handshake, {algorithm: 'HS384' })
    return payload
  }

  static rideSettings(location, currentState) {
    return JSON.stringify({
      search_settings: {
        "open_now": true,
        "radius": currentState.radius[1],
        "latitude": location.latitude,
        "longitude":location.longitude,
        "max_price": currentState.price[1],
        "min_price": currentState.price[0],
        "price": `${currentState.price[0]},${currentState.price[1]}`,
        "term": "restaurants"
        },
      restrictions: {
        max_rating: currentState.rating[1],
        min_rating: currentState.rating[0],
        categories:[],
        min_radius: currentState.radius[0]
      }
    })
  }

  static async createAdventure(currentState) {
    // Get the location
    if (Expo.Constants.isDevice) {
      console.log('Is a real device.')
      let { status } = await Permissions.askAsync(Permissions.LOCATION)
      console.log('This is the status')
      console.log(status)
      if (status !== 'granted') {
        this.setState({ error: 'Permission to access location was denied' })
        console.log(this.state.error)
      }
      
      var coordinates = await Location.getCurrentPositionAsync({})
      console.log(coordinates.coords.latitude)
      console.log(coordinates.coords.longitude)
      
      var location = ({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      })
    } else {
      var location = ({
        latitude: default_origin_latitude,
        longitude: default_origin_longitude
      })
    }

    console.log(location)

    // Get user info from SecureStore
    let headers = await ApiService.getInfo()
    console.log(headers)
    // Post to API to createAdventure
    let response = await ApiService.goGet('adventures', 'post', headers, ApiService.rideSettings(location, currentState))
    // Parse response
    let responseBody = await response.json()
    console.log(responseBody)
    return {adventure: responseBody, origin: location}
  }

  static async createRide(rideInfo) {
    let userInfo = await ApiService.getInfo()
    let thing =  await ApiService.goGet('rides', 'post', userInfo , JSON.stringify(rideInfo))
    let otherThing= await thing.json()
    return otherThing
  }

  static async getInfo(){
    const token = await SecureStore.getItemAsync('access_token')
    const refresh_token = await SecureStore.getItemAsync('refresh_token')
    if (SecureStore.getItemAsync('id')) {
      const id = await SecureStore.getItemAsync('id')
      return { token: token, refresh_token: refresh_token, id: id}
    } else {
      return { token: token, refresh_token: refresh_token}
    }
  }

  static async createUser() {
    let user_info = await ApiService.getInfo()
    let server_response = await this.goGet('users', 'post', user_info)
    let settings = await ApiService.decodeJwt(server_response.headers.map.authorization)
    let parsedSettings = JSON.parse(settings)
    let stored_id = await SecureStore.setItemAsync('id', String(parsedSettings.id))
    let the_id = await SecureStore.getItemAsync('id')
    return JSON.parse(settings)
  }

  static async cancelRide(rideInfo){
    let user_info = await ApiService.getInfo()
    let response = await ApiService.goGet('cancel', 'post', user_info, rideInfo)
    return await response.json()
  }

  static async confirmCancelRide(rideId, costToken){
    let user_info = await ApiService.getInfo()
    let payload = JSON.stringify({rideId: rideId, costToken: costToken})
    let response = await ApiService.goGet('confirm', 'post', user_info, payload)
  }


  static async goGet(url_extension, method, headers=null, body=null){
    
    return await fetch(`${host_url}/${beta}/${url_extension}`, {
      method: method,
      headers: {
        payload: ApiService.encodeJwt(JSON.stringify(headers)),
      },
      body: body
    })

  }
}
export default ApiService

// static setPayloadHeaders(extra=null){
  //   let lyft_refresh_token;
  //   let lyft_token;
  //   let id;
  //   let headers;
  //   SecureStore.getItemAsync("lyftToken")
  //   .then(
  //     (response)=> {
  //       lyft_token = response
  //       return SecureStore.getItemAsync("lyftRefreshToken")
  //       .then((response)=>{
  //         lyft_refresh_token = response
  //         return SecureStore.getItemAsync("id")
  //         .then((response)=>{
  //           id = response
  //         })
  //       })
  //     })
  //   .then(()=>{
  //     console.log("get headers (6.1)")
  //       console.log(lyft_token)
  //       console.log(lyft_refresh_token)
  //       console.log(id)
  //       console.log(" ")
  //     headers = {
  //       lyft_token: lyft_token,
  //       lyft_refresh_token: lyft_refresh_token,
  //       payload: extra
  //     }
  //     return headers
  //   })
  //   .catch((error)=>console.log(error))
  // }



  // ApiService.setPayloadHeaders(headers)
  // .then((payload) => {
  //   console.log('getting from keychain (6.5)')
  //   console.log(payload)

  //   .then((data)=>{
  //     return data._bodyText
  //   })
  //   .then((response)=> {
  //     return ApiService.decodeJwt(response.json()["payload"])
  //   })
  //   .catch((error)=>console.log(error))
  // })
  // .catch((error)=>console.log(error));
