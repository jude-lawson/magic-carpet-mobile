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
}

export default LyftService;
