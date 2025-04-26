
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskBadge } from "@/components/RiskBadge";
import { MapPin, Info, Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Map = () => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsReportDialogOpen(false);
      toast.success("Report submitted successfully");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Avalanche Risk Map</h1>
          <p className="text-gray-500">View and report avalanche risks in your area</p>
        </div>
        
        <Button onClick={() => setIsReportDialogOpen(true)}>
          <MapPin className="h-4 w-4 mr-2" />
          Report Avalanche
        </Button>
      </div>
      
      <Tabs defaultValue="risk" className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px] mb-6">
          <TabsTrigger value="risk">Risk Map</TabsTrigger>
          <TabsTrigger value="routes">Safe Routes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="risk">
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              <div className="aspect-[21/9] w-full relative bg-gray-100 flex items-center justify-center">
                {/* Placeholder for the actual map - would be replaced with a proper map component */}
                <div className="text-center p-8">
                  <p className="text-gray-500 mb-4">Map would render here</p>
                  <p className="text-sm text-gray-400">Using Mapbox or Google Maps integration</p>
                </div>
                
                {/* Map legend - overlaid on the map */}
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md border border-gray-200">
                  <h4 className="text-sm font-medium mb-2">Risk Level</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <RiskBadge level="safe" iconOnly />
                      <span className="text-xs">Safe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiskBadge level="moderate" iconOnly />
                      <span className="text-xs">Moderate Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiskBadge level="high" iconOnly />
                      <span className="text-xs">High Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiskBadge level="extreme" iconOnly />
                      <span className="text-xs">Extreme Danger</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Current Area</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">North Ridge, 12345</span>
                  </div>
                  <RiskBadge level="moderate" size="sm" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Highest Risk Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">East Valley</span>
                    <RiskBadge level="extreme" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">South Ridge</span>
                    <RiskBadge level="high" size="sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Safe Zones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Base Camp</span>
                    <RiskBadge level="safe" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">West Trail</span>
                    <RiskBadge level="safe" size="sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="routes">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Info className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium">Safe Route Planner</h3>
            <p className="text-gray-500 mt-2 mb-4">
              Enter your start and end points to find the safest route through avalanche-prone areas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <Label htmlFor="start">Starting Point</Label>
                <Input id="start" placeholder="Enter location or coordinates" />
              </div>
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="Enter location or coordinates" />
              </div>
            </div>
            <Button className="mt-4">Find Safe Route</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium">Community Reports</h3>
            <p className="text-gray-500 mt-2 mb-4">
              View reports from other users or submit your own observation.
            </p>
            <Button onClick={() => setIsReportDialogOpen(true)}>
              Submit New Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Report Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report Avalanche Risk</DialogTitle>
            <DialogDescription>
              Share your observations to help keep others safe.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitReport}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="report-title">Title</Label>
                <Input 
                  id="report-title" 
                  placeholder="Brief description of what you observed"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-location">Location</Label>
                <Input 
                  id="report-location" 
                  placeholder="Enter location or coordinates"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-description">Description</Label>
                <Textarea 
                  id="report-description" 
                  placeholder="Provide details about what you observed"
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-risk">Risk Level</Label>
                <select 
                  id="report-risk" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required
                >
                  <option value="safe">Safe - No risk observed</option>
                  <option value="moderate">Moderate Risk - Caution advised</option>
                  <option value="high">High Risk - Dangerous conditions</option>
                  <option value="extreme">Extreme Danger - Avoid area</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-image">Upload Image (optional)</Label>
                <Input 
                  id="report-image" 
                  type="file" 
                  accept="image/*"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsReportDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;
