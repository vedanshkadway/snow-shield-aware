
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { SOSButton } from "@/components/SOSButton";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [pinCode, setPinCode] = useState(user?.pinCode || "");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };
  
  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };
  
  const handleSaveLanguage = () => {
    toast.success("Language preference saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile & Preferences</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 w-[500px] mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleUpdateProfile}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+1234567890"
                  />
                  <p className="text-xs text-gray-500">Used for emergency alerts and notifications</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input 
                    id="pincode" 
                    value={pinCode} 
                    onChange={(e) => setPinCode(e.target.value)} 
                    placeholder="12345"
                  />
                  <p className="text-xs text-gray-500">Used to provide location-based alerts</p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your password and account security options
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive alerts and notifications
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Alert Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <Label htmlFor="push-notifications" className="mb-1">Push Notifications</Label>
                      <span className="text-xs text-gray-500">Receive alerts through the app</span>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <Label htmlFor="sms-alerts" className="mb-1">SMS Alerts</Label>
                      <span className="text-xs text-gray-500">Receive text messages for high priority alerts</span>
                    </div>
                    <Switch id="sms-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <Label htmlFor="email-notifications" className="mb-1">Email Notifications</Label>
                      <span className="text-xs text-gray-500">Receive alerts and summaries via email</span>
                    </div>
                    <Switch id="email-notifications" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Alert Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="high-risk-alerts" defaultChecked />
                    <Label htmlFor="high-risk-alerts">High-Risk Avalanche Warnings</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="moderate-risk-alerts" defaultChecked />
                    <Label htmlFor="moderate-risk-alerts">Moderate-Risk Warnings</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="weather-updates" defaultChecked />
                    <Label htmlFor="weather-updates">Significant Weather Updates</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="community-reports" />
                    <Label htmlFor="community-reports">New Community Reports in My Area</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="educational-content" />
                    <Label htmlFor="educational-content">Educational Content Updates</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Quiet Hours</h3>
                <p className="text-sm text-gray-500 mb-3">
                  During quiet hours, you'll only receive critical emergency alerts.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-start">Start Time</Label>
                    <Input id="quiet-start" type="time" defaultValue="22:00" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quiet-end">End Time</Label>
                    <Input id="quiet-end" type="time" defaultValue="07:00" />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Language & Accessibility</CardTitle>
              <CardDescription>
                Customize your experience with language and accessibility options
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>App Language</Label>
                <RadioGroup defaultValue="english">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="english" id="english" />
                    <Label htmlFor="english">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spanish" id="spanish" />
                    <Label htmlFor="spanish">Spanish</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="french" id="french" />
                    <Label htmlFor="french">French</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="german" id="german" />
                    <Label htmlFor="german">German</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Alert Language</Label>
                <RadioGroup defaultValue="same">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="same" id="same-language" />
                    <Label htmlFor="same-language">Same as app language</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="english-alerts" id="english-alerts" />
                    <Label htmlFor="english-alerts">Always send alerts in English</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium mb-2">Accessibility Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="text-size">Larger Text Size</Label>
                    <Switch id="text-size" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    <Switch id="high-contrast" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound-alerts">Audio Alerts for Warnings</Label>
                    <Switch id="sound-alerts" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button onClick={handleSaveLanguage}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts & Information</CardTitle>
              <CardDescription>
                Set up your emergency contacts and important medical information
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-red-700">Emergency SOS</h3>
                  <SOSButton />
                </div>
                <p className="text-sm text-red-600">
                  In case of emergency, use the SOS button to alert rescue services with your location and pre-set medical information.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Primary Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency-name">Name</Label>
                    <Input id="emergency-name" placeholder="Jane Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergency-relationship">Relationship</Label>
                    <Input id="emergency-relationship" placeholder="Spouse, Parent, etc." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Phone Number</Label>
                    <Input id="emergency-phone" placeholder="+1234567890" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergency-email">Email</Label>
                    <Input id="emergency-email" type="email" placeholder="jane@example.com" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Medical Information (Optional)</h3>
                  <p className="text-xs text-gray-500">Shared with emergency responders</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="blood-type">Blood Type</Label>
                  <select 
                    id="blood-type" 
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Input id="allergies" placeholder="List any allergies" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Input id="medications" placeholder="List any medications" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="medical-conditions">Medical Conditions</Label>
                  <Input id="medical-conditions" placeholder="List any relevant conditions" />
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button>Save Emergency Information</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
