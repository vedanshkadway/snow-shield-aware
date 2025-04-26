
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-[#7E69AB] text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <Logo className="h-10 w-10" />
                <h1 className="text-3xl font-bold">Snow Shield</h1>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Avalanche Safety & Prediction System
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Real-time avalanche warnings, safety information, and community reports to keep you safe in snow-prone areas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  <Link to="/signup">Create Account</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
                  alt="Snow mountain landscape" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Alerts</h3>
              <p className="text-gray-600">
                Get instant notifications about avalanche risks in your area through SMS and push alerts.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Maps</h3>
              <p className="text-gray-600">
                View color-coded risk zones and find safe routes through hazardous areas.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Reports</h3>
              <p className="text-gray-600">
                Share and view real-time reports of conditions directly from other users in your area.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ML Predictions</h3>
              <p className="text-gray-600">
                Advanced machine learning models predict avalanche risks based on weather and terrain data.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <SOS className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Emergency SOS</h3>
              <p className="text-gray-600">
                One-tap emergency button that shares your location with rescue teams during emergencies.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Location-based Risk</h3>
              <p className="text-gray-600">
                Personalized risk assessments based on your pincode and current location.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Safe in Avalanche-Prone Areas</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who rely on Snow Shield for real-time avalanche safety information.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-primary hover:bg-primary/90"
          >
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Logo className="h-8 w-8" />
              <span className="font-semibold text-white">Snow Shield</span>
            </div>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-white">Privacy Policy</Link>
              <Link to="#" className="hover:text-white">Terms of Use</Link>
              <Link to="#" className="hover:text-white">Contact Us</Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm">
            &copy; {new Date().getFullYear()} Snow Shield. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
