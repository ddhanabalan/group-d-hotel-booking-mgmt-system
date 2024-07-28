import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-100">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center w-20 md:w-30">
                <img src={logo} alt="ATLIQ Logo" className="h-10" />
                <span className="ml-4 text-lg font-bold">ATLIQ </span>
              </div>
              <div>
                <p className="text-sm">
                  &copy; 2024 ATLIQ All Rights Reserved.
                </p>
                <p className="text-sm mt-2">
                  Providing exceptional stays and seamless booking experiences across our chain of luxury hotels.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-700">
                Explore
              </h3>
              <ul>
                <li className="mb-4">
                  <a href="/about-us" className="hover:text-[#0B8185]">About Us</a>
                </li>
                <li className="mb-4">
                  <a href="/destinations" className="hover:text-[#0B8185]">Destinations</a>
                </li>
                <li className="mb-4">
                  <a href="/offers" className="hover:text-[#0B8185]">Special Offers</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-700">
                Guest Services
              </h3>
              <ul>
                <li className="mb-4">
                  <a href="/booking" className="hover:text-[#0B8185]">Book a Room</a>
                </li>
                <li className="mb-4">
                  <a href="/faq" className="hover:text-[#0B8185]">FAQ</a>
                </li>
                <li className="mb-4">
                  <a href="/contact" className="hover:text-[#0B8185]">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-700">
                Legal
              </h3>
              <ul>
                <li className="mb-4">
                  <a href="/terms" className="hover:text-[#0B8185]">Terms & Conditions</a>
                </li>
                <li className="mb-4">
                  <a href="/privacy" className="hover:text-[#0B8185]">Privacy Policy</a>
                </li>
                <li>
                  <a href="/sitemap" className="hover:text-[#0B8185]">Sitemap</a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Footer;
