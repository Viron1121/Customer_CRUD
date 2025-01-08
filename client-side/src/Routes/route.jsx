import { Routes, Route } from 'react-router-dom'
import Table from '../customer/Table'
import App from '../App'


function route() {
  return (
   <>
    <Routes>
        <Route path="/" element={<><Table /> </>} />
        {/* <Route path="/index" element={<><Table /> </>} /> */}
    </Routes>
   </>
  )
}

export default route;
