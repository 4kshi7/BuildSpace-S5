import React from 'react'

const Footer = () => {
  return (
    <footer className="py-6 text-xs text-gray-400">
        <div className="container mx-auto px-2 md:px-6 lg:px-6 ">
          <h1 className="text-[#5AD1B1] font-bold text-48 sm:text-xl mb-2">
            <span className="italic font-semibold">Lotus</span>Focus
          </h1>
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
            <div>
              <p className="font-semibold mb-1">Our Socials:</p>
              <p><a href="https://www.instagram.com/akshit.ffs/" target="_blank" rel="noopener noreferrer">akshit.ffs</a></p>
              <p><a href="https://www.instagram.com/h4rshitfr/" target="_blank" rel="noopener noreferrer">h4rshitfr</a></p>
              <p><a href="https://www.instagram.com/tarun185/" target="_blank" rel="noopener noreferrer">tarun185</a></p>
            </div>
            <div>
              <p className="font-semibold mb-1">Created By</p>
              <p>Akshit</p>
              <p>Harshit</p>
              <p>Tarun</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Contact us</p>
              <p><a href="mailto:support@lotusfocus.com" target="_blank" className="flex items-center"><i className="ri-mail-check-fill mr-2"></i>Email</a></p>
              <p><a href="https://www.instagram.com/lotusfocus" target="_blank" rel="noopener noreferrer" className="flex items-center"><i className="ri-instagram-fill mr-2"></i>Instagram</a></p>
              <p><a href="https://twitter.com/lotusfocus" target="_blank" rel="noopener noreferrer" className="flex items-center"><i className="ri-twitter-x-fill mr-2"></i>Twitter</a></p>
            </div>
          </div>
          <p className="text-center mt-12">© 2024 LotusFocus. All rights reserved.</p>
        </div>
      </footer>
   
  )
}

export default Footer
