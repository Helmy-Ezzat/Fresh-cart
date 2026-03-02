import payPal from '../Assets/images/paypal.png'
import amazonPay from '../Assets/images/AmazonPay.webp'
import americanExpress from '../Assets/images/American-Express.png'
import masterCard from '../Assets/images/MasterCard.png'
import ios from '../Assets/images/Available_on_the_App_Store_(black)_SVG.svg.png'
import play from '../Assets/images/get-it-on-google-play-badge.webp'

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* App Download Section */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Get The FreshCart App
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            We will send you a link, open it on your phone to download the app
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button className="px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap">
              Share App Link
            </button>
          </div>
        </div>

        <hr className="border-gray-200 mb-8 sm:mb-10" />

        {/* Payment Partners & App Stores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Payment Partners */}
          <div>
            <h5 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Payment Partners
            </h5>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <img 
                src={amazonPay} 
                alt="Amazon Pay" 
                className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300" 
              />
              <img 
                src={americanExpress} 
                alt="American Express" 
                className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300" 
              />
              <img 
                src={masterCard} 
                alt="MasterCard" 
                className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300" 
              />
              <img 
                src={payPal} 
                alt="PayPal" 
                className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </div>
          </div>

          {/* App Stores */}
          <div className="lg:text-right">
            <h5 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Get Deliveries with FreshCart
            </h5>
            <div className="flex flex-wrap lg:justify-end items-center gap-3 sm:gap-4">
              <a 
                href="https://apps.apple.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={ios} 
                  alt="Download on App Store" 
                  className="h-10 sm:h-12 object-contain" 
                />
              </a>
              <a 
                href="https://play.google.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={play} 
                  alt="Get it on Google Play" 
                  className="h-10 sm:h-12 object-contain" 
                />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mt-8 sm:mt-10" />
      </div>
    </footer>
  )
}