import JWT from 'expo-jwt'
import { SecureStore } from 'expo';
import { handshake, host_url, api_version } from '../../config'

class ApiService{

  static encodeJwt(payload){
    // return JWT.encode(payload, handshake, {algorithm: 'HS384' })
    return payload
  }

  static async decodeJwt(payload){
    // return JWT.decode(payload, handshake, {algorithm: 'HS384' })
    return payload
  }

  // static getFromKeychain(key){ 
  //   SecureStore.getItemAsync(key)
  //     .then((response) => {return response})
  //     .catch((error)=>console.log(error))
  // }

  static createAdventure(){
    return this.goGet('adventures', 'post')
  }
  static acceptEstimate(adventureInfo){
    return this.goGet('rides', 'post', adventureInfo)
  }

  static async getInfo(){
    const token = await SecureStore.getItemAsync('lyft_token') 
    const refresh_token = await SecureStore.getItemAsync('lyft_refresh_token')
    return { token: token, refresh_token: refresh_token}
  }

  static async createUser(user_info = null){
    return await this.goGet('users', 'post', user_info)
  }

  // 

  static async goGet(url_extension, method, options_obj={}){

    return await fetch(`${host_url}/${api_version}/${url_extension}`, {
      method: method,
      body: options_obj.body,
      headers: {
        payload: options_obj.headers,
      }
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
