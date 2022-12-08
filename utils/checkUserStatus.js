
export default function checkUserStatus(token) {
  if (token) {
    // If token exists, check if expired
    // JWT expires after 24 hours
    // If expired, return false
    const tokenData = JSON.parse(token);
    if (parseInt(tokenData.expiration) > Math.floor(new Date().getTime() / 1000.0)) {
      return tokenData;
    } else {
      // Token expired
      return false;
    }
  }
  // Return false if no token provided
  return false;
}
