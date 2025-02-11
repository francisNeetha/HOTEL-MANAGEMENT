import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import CustomerDashboard from './components/customer/CustomerDashboard';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import RoomSlider from './components/roomSlider/RoomSlider';
import ServicesSection from './components/servicesSection/ServicesSection';
import NewsletterSection from './components/subscribeSection/SubscribeSection';
import Homepage from './pages/home-page/Home-page';
import RoomDetails from './components/roomDetails/RoomDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/hero-section' element={<Home/>}></Route>
        <Route path='/navbar' element={<Navbar />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path='/ServiceSection' element={<ServicesSection />}></Route>
        <Route path='/RoomSlider' element={<RoomSlider />}></Route>
        <Route path='/NewsletterSection' element={<NewsletterSection/>}></Route>
        <Route path="/footer" element={<Footer />}></Route>
        <Route path='/RoomDetails' element={<RoomDetails/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
