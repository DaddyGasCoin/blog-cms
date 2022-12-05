import '../styles/globals.css'
// import { createContext, useContext, useState } from 'react';

// const UserContext = createContext(null);

function MyApp({ Component, pageProps }) {
  // const [user,setUser] = useState(null);
  // const value = { user, setUser };
  return <>
    {/* <UserContext.Provider value={value}> */}
      <Component {...pageProps} />
    {/* </UserContext.Provider> */}
  </>
}

export default MyApp
