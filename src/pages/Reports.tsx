
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskBadge } from "@/components/RiskBadge";
import { Camera, Search, MapPin } from "lucide-react";
import ReportCard from "@/components/ReportCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock data for demonstration
const mockReports = [
  {
    id: "1",
    title: "Fresh Snowfall on North Peak",
    description: "Approximately 20cm of fresh snow accumulation in the last 12 hours. Conditions are stable but caution advised on steep slopes.",
    location: "North Ridge, Pin 12345",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    riskLevel: "moderate" as const
  },
  {
    id: "2",
    title: "Avalanche Sighted",
    description: "Small avalanche observed on eastern slope around 2:30 PM. Area has been marked as dangerous. Please avoid travel in this area.",
    location: "East Valley, Pin 23456",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    riskLevel: "high" as const
  },
  {
    id: "3",
    title: "Safe Conditions Reported",
    description: "Trail conditions are good with packed snow and no signs of instability. Good visibility and moderate temperatures.",
    location: "South Trail, Pin 34567",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    riskLevel: "safe" as const
  },
  {
    id: "4",
    title: "Warning: Unstable Snow Layer",
    description: "Detected an unstable layer about 30cm below surface during snow pit analysis. High risk of slab avalanches on slopes > 30°.",
    location: "West Face, Pin 45678",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    riskLevel: "high" as const
  }
];

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<typeof mockReports[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchQuery}`);
    // Would filter reports in a real implementation
  };
  
  const handleViewReport = (id: string) => {
    const report = mockReports.find(r => r.id === id);
    if (report) {
      setSelectedReport(report);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Community Reports</h1>
        <p className="text-gray-500">View and search avalanche observations from the community</p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Search Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search by location, keyword, or pin code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-[400px] mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="safe">Safe</TabsTrigger>
          <TabsTrigger value="moderate">Moderate</TabsTrigger>
          <TabsTrigger value="high">High Risk</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReports.map(report => (
              <ReportCard 
                key={report.id}
                {...report}
                onViewDetails={handleViewReport}
              />
            ))}
            
            <Card className="flex flex-col items-center justify-center p-6 border-dashed">
              <Camera className="h-8 w-8 text-gray-400 mb-2" />
              <h3 className="font-medium mb-2">Submit New Report</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Share your observations with the community
              </p>
              <Button variant="outline">Create Report</Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="safe">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReports
              .filter(report => report.riskLevel === "safe")
              .map(report => (
                <ReportCard 
                  key={report.id}
                  {...report}
                  onViewDetails={handleViewReport}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="moderate">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReports
              .filter(report => report.riskLevel === "moderate")
              .map(report => (
                <ReportCard 
                  key={report.id}
                  {...report}
                  onViewDetails={handleViewReport}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="high">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReports
              .filter(report => report.riskLevel === "high")
              .map(report => (
                <ReportCard 
                  key={report.id}
                  {...report}
                  onViewDetails={handleViewReport}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Report Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedReport.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    {selectedReport.location}
                  </div>
                  <RiskBadge level={selectedReport.riskLevel} />
                </div>
                
                {selectedReport.imageUrl && (
                  <div className="rounded-md overflow-hidden">
                    <img 
                      src={selectedReport.imageUrl} 
                      alt={selectedReport.title} 
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <p className="text-gray-700">{selectedReport.description}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Report Details</h4>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt className="text-gray-500">Reported on:</dt>
                    <dd>{selectedReport.timestamp.toLocaleString()}</dd>
                    <dt className="text-gray-500">Risk Level:</dt>
                    <dd>{selectedReport.riskLevel.charAt(0).toUpperCase() + selectedReport.riskLevel.slice(1)}</dd>
                    <dt className="text-gray-500">Location:</dt>
                    <dd>{selectedReport.location}</dd>
                  </dl>
                </div>
              </div>
              
              <CardFooter className="flex justify-end gap-2 pt-2 border-t">
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </CardFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
