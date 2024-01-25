import React, { useEffect } from "react"
import MenuUser from "../../components/MenuUser"
import BannerHome from "./BannerHome"
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import TopFive from "./TopFive";
import NewProducts from "./NewProducts";
import Footer from "./Footer";

export default function HomePage() {
  useEffect(()=>{
    AOS.init();
  });
  return (
    <section className="flex flex-col  h-screen">
      <MenuUser />
      <BannerHome />
      <TopFive />
      <NewProducts />
      <Footer />
    </section>
  )
}
