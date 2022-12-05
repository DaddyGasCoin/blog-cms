

export default function checkUserStatus() {

  let token = localStorage.getItem('token_info')
  if (!token) {
    token = sessionStorage.getItem('token_info')
  }
  if (token) {
    //If token exists;check if expired
    //JWT expires after 24 hours
    //If expired clear from storage;user must login again so return false
    token = JSON.parse(token)
    if (parseInt(token.expiration) > Math.floor(new Date().getTime() / 1000.0))
      return token
    else {
      //Token expired
      localStorage.clear()
      return false
    }
  }
  // return token
}