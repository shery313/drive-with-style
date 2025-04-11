import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componenets/Navbar'
import Home from './componenets/Home'
import Fleet from './componenets/Fleet'
import Footer from './componenets/Footer'
import Pricing from './componenets/Pricing'
import About from './componenets/About'
import Contact from './componenets/Conctact'
import ScrollToTop from './componenets/ScrollToTop'
import WhatsAppButton from './componenets/WhatsappButton.'
import BookingPage from './componenets/BookingPage'



function App() {
 

  return (
    <BrowserRouter>
      
        <Navbar />
        <ScrollToTop/>
        <WhatsAppButton/>
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/fleet" element={<Fleet  />} />
          <Route path="/pricing" element={<Pricing  />} />
          <Route path="/about" element={<About  />} />
          <Route path="/contact" element={<Contact  />} />
          <Route path="/book" element={<BookingPage  />} />
        </Routes>
        <Footer />
      
    </BrowserRouter>
  )
}

export default App
