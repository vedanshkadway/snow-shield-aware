wimport React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { 
  Bell, 
  AlertTriangle, 
  MapPin, 
  MessageSquare, 
  Brain, 
  Shield,
  Phone
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative text-white bg-cover bg-center" 
        style={{ backgroundImage: "url('assets/background.jpg')" }} 
      >
        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-white" />
                <h1 className="text-2xl font-bold text-white">Snow Shield</h1>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Avalanche Alerts & Warning System
              </h2>
              <div className="bg-red-700 border-l-4 border-white p-4 mb-6 rounded-r">
                <p className="text-lg text-white font-medium">
                  Stay informed. Stay prepared. Stay safe.
                </p>
              </div>
              <p className="text-white mb-8 opacity-90">
                Life-saving alerts and warnings delivered to your device when avalanche conditions become dangerous.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-gray-100 font-medium"
                >
                  <Link to="/signup">Get Alerts</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="bg-red border-red text-white"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Alert Levels Section */}
      <div className="bg-white border-b py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Alert Levels</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-600 rounded-lg p-4 text-center border border-red-400 text-white">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold">CRITICAL</h3>
              <p className="text-sm text-white opacity-90">Immediate danger</p>
            </div>
            <div className="bg-orange-500 rounded-lg p-4 text-center border border-orange-400 text-white">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold">HIGH</h3>
              <p className="text-sm text-white opacity-90">Dangerous conditions</p>
            </div>
            <div className="bg-yellow-500 rounded-lg p-4 text-center border border-yellow-400 text-gray-800">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-800" />
              <h3 className="font-semibold">MODERATE</h3>
              <p className="text-sm text-gray-800">Exercise caution</p>
            </div>
            <div className="bg-green-500 rounded-lg p-4 text-center border border-green-400 text-white">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold">LOW</h3>
              <p className="text-sm text-white opacity-90">Generally safe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">How Our Alert System Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Snow Shield delivers critical avalanche warnings through multiple channels to ensure you never miss an important alert.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-t-4 border-red-600">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-800">Instant Alerts</h3>
              <p className="text-gray-600">
                Receive critical avalanche warnings within seconds via SMS, push notifications, and email.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-t-4 border-red-600">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-800">Danger Zone Maps</h3>
              <p className="text-gray-600">
                Visual alerts with clear risk zones and safe evacuation routes to escape danger.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-t-4 border-red-600">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-800">Community Warnings</h3>
              <p className="text-gray-600">
                Verified user-submitted alerts create a network of real-time monitoring of conditions.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-t-4 border-red-600">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-800">Predictive Alerts</h3>
              <p className="text-gray-600">
                AI-powered system that predicts avalanche formation before it happens, giving you critical time to evacuate.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-t-4 border-red-600">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-800">Emergency SOS</h3>
              <p className="text-gray-600">
                One-tap emergency button that broadcasts your exact location to rescue teams during emergencies.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-t-4 border-red-600">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-800">24/7 Monitoring</h3>
              <p className="text-gray-600">
                Round-the-clock system that continually monitors conditions and sends alerts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Don't Risk Your Safety</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
          Over 150 people are killed by avalanches every year.
      <br />
      Switch to Snow Shield's alert system.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-white text-red-600 hover:bg-gray-100 font-medium"
          >
            <Link to="/signup">Sign Up For Alerts</Link>
          </Button>
          
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
  <div className="container mx-auto px-4 text-center">
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-6 w-6 text-red-500" />
        <span className="font-medium text-white">Snow Shield</span>
      </div>
    </div>
    <div className="mt-6 text-center text-sm">
      &copy; {new Date().getFullYear()} Snow Shield Alert System. All rights reserved.
    </div>
  </div>
</footer>

    </div>
  );
};

export default Index;
