import React from 'react'

import { Header } from 'test'
// import 'test/dist/index.css'

const App = () => {
  return <><Header tools='calendar' env='development' authentication={false} />
    <div style={{ height: '100vh', padding: 50 }}>TEST</div>
    <div style={{ height: '100vh', padding: 50 }}>TEST</div>
    <div style={{ height: '100vh', padding: 50 }}>TEST</div>
  </>
}

export default App
