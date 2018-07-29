import { SecureStore } from 'expo';
import ApiService from '../components/ApiService';

class LyftService {
  static authorize(auth_code, enc_client_auth) {
    return fetch('https://api.lyft.com/oauth/token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Basic ${enc_client_auth}`
      },
      body: JSON.stringify({
        "grant_type": "authorization_code",
        "code": auth_code
      })
    })
  }

  static getStatus() {
    // let lyftApiKey = SecureStore.getItemAsync('lyft_token').catch(() => console.log('no token!'));
    // let rideId = ApiService.decodeJwt(response.headers.map.authorization)
    // return fetch(`https://api.lyft.com/v1/rides/${rideId}`, {
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     'Authorization': `Bearer ${lyftApiKey}`
    //   })
    // }
    // Stubbed response:
    `{
      "status": "accepted",
      "origin": {
        "lat": 37.77663,
        "lng": -122.39227,
        "eta_seconds": 180,
        "address": null
      },
      "ride_type": "lyft",
      "passenger": {
        "rating": "5",
        "first_name": "John",
        "last_name": "Smith",
        "image_url": "https://lyft.com/pax.jpg",
        "user_id": "123"
      },
      "requested_at": "2017-05-18T21:16:30+00:00",
      "destination": {
        "lat": 37.771,
        "lng": -122.39123,
        "eta_seconds": null,
        "address": "Mission Bay Boulevard North"
      },
      "driver": {
        "phone_number": "+123",
        "rating": "5",
        "first_name": "Ronald",
        "image_url": "https://lyft.com/driver.jpg"
      },
      "vehicle": {
        "color": "Gold",
        "make": "Hyundai",
        "license_plate": "123ABC",
        "image_url": "https://lyft.com/car.png",
        "year": 2016,
        "license_plate_state": "CA",
        "model": "Elantra"
      },
      "can_cancel": [
        "driver",
        "passenger",
        "dispatcher"
      ],
      "route_url": "https://lyft.com/route",
      "ride_id": "123",
      "generated_at": "2017-05-18T21:16:53+00:00",
      "pricing_details_url": "https://www.lyft.com/pricing/SFO",
      "ride_profile": "personal",
      "location": {
        "lat": 37.779407,
        "bearing": 240.0,
        "lng": -122.390427
      }
    }`
  }
}

export default LyftService;
