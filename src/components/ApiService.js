import JWT from 'expo-jwt'
import { SecureStore } from 'expo';
import { handshake, host_url, api_version } from '../../config'

class ApiService{

  static encodeJwt(payload){
    let encoded = JWT.encode(payload, handshake, {algorithm: 'HS256' })
    return encoded
  }

  static decodeJwt(payload){
    let decoded = JWT.decode(payload, handshake, {algorithm: 'HS256' })
    return decoded
  }

  static getFromKeychain(key){
    SecureStore.getItemAsync(key)
      .then((response) => {return response})
      .catch((error)=>console.log(error))
  }

  static createAdventure(){
    return this.goGet('adventures', 'post')
  }
  static acceptEstimate(adventureInfo){
    return this.goGet('rides', 'post', adventureInfo)
  }

  static async createUser(user_info = null){
    return this.goGet('users', 'post', user_info)
  }

  static async setPayloadHeaders(extra=null){
    let lyft_token = await ApiService.getFromKeychain("lyftToken")
    let lyft_refresh_token = await ApiService.getFromKeychain("lyftRefreshToken")
    let id = await ApiService.getFromKeychain("id")

    console.log("tokens from storage")
    console.log(lyft_token)
    console.log(lyft_refresh_token)
    console.log(id)

    return {
      lyft_token: lyft_token,
      lyft_refresh_token: lyft_refresh_token,
      id: id,
      payload: extra
    }
  }
  static goGet(url_extension, method, headers=null){
    ApiService.setPayloadHeaders().then((payload) => {
      fetch(`${host_url}/${api_version}/${url_extension}`, {
        method: method,
        headers: {
          payload: ApiService.encodeJwt(payload),
        }
      })
      .then((data)=>{
        console.log(data._bodyText)
        return data._bodyText
      })
      .then((response)=> {
        console.log(response)
        ApiService.decodeJwt(response.json()["payload"])
      })
      .catch((error)=>console.log(error))
    })
    .catch((error)=>console.log(error));
  }
}
export default ApiService