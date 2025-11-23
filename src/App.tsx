import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componenets/Navbar'
import Home from './componenets/Home'
import Fleet from './componenets/Fleet'
import Footer from './componenets/Footer'
import About from './componenets/About'
import Contact from './componenets/Conctact'
import ScrollToTop from './componenets/ScrollToTop'
import WhatsAppButton from './componenets/WhatsappButton.'
import BookingPage from './componenets/BookingPage'
import FleetDetail from './componenets/FleetDetail'



function App() {
 

  return (
    <BrowserRouter>
      <ScrollToTop/>
        <Navbar />
        
        <WhatsAppButton/>
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/fleet" element={<Fleet  />} />
          <Route path="/fleet/:slug" element={<FleetDetail  />} />
          <Route path="/about" element={<About  />} />
          <Route path="/contact" element={<Contact  />} />
          <Route path="/book" element={<BookingPage  />} />
          <Route path="/book/:slug" element={<BookingPage  />} />
        </Routes>
        <Footer />
      
    </BrowserRouter>
  )
}

export default App
