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
import { Camera, Search, MapPin, Upload } from "lucide-react";
import ReportCard from "@/components/ReportCard";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

// Define the type for our reports
type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  imageUrl?: string;
  riskLevel: "safe" | "moderate" | "high" | "extreme";
};

// Define the type for our new report form
type NewReport = Omit<Report, "id" | "timestamp"> & {
  imageFile?: File | null;
};

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>(mockReports);
  
  // State for the new report form
  const [newReport, setNewReport] = useState<NewReport>({
    title: "",
    description: "",
    location: "",
    riskLevel: "moderate",
    imageFile: null,
    imageUrl: ""
  });
  
  // Preview image URL for the create form
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchQuery}`);
    // Would filter reports in a real implementation
  };
  
  const handleViewReport = (id: string) => {
    const report = reports.find(r => r.id === id);
    if (report) {
      setSelectedReport(report);
      setIsViewDialogOpen(true);
    }
  };
  
  const handleCreateReport = () => {
    setIsCreateDialogOpen(true);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Update the form state with the file
      setNewReport(prev => ({ ...prev, imageFile: file }));
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setNewReport(prev => ({ ...prev, imageFile: null }));
      setPreviewImage(null);
    }
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReport(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewReport(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would upload the image and get a URL
    // For this demo, we'll use the preview image or a placeholder
    const imageUrl = previewImage || "https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b";
    
    // Create a new report with an ID and timestamp
    const newReportWithId: Report = {
      id: `${reports.length + 1}`,
      ...newReport,
      imageUrl,
      timestamp: new Date()
    };
    
    // Add the new report to our list
    setReports(prev => [newReportWithId, ...prev]);
    
    // Close the dialog and reset form
    setIsCreateDialogOpen(false);
    toast.success("Report created successfully!");
    
    // Reset the form
    setNewReport({
      title: "",
      description: "",
      location: "",
      riskLevel: "moderate",
      imageFile: null,
      imageUrl: ""
    });
    setPreviewImage(null);
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
            {reports.map(report => (
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
              <Button variant="outline" onClick={handleCreateReport}>Create Report</Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="safe">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports
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
            {reports
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
            {reports
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
      
      {/* Report View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
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
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </CardFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Create Report Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmitReport} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter a descriptive title"
                  value={newReport.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter location or pin code"
                  value={newReport.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="riskLevel">Risk Level</Label>
                <Select
                  value={newReport.riskLevel}
                  onValueChange={(value) => handleSelectChange("riskLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safe">Safe</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="extreme">Extreme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the conditions, observations, and any relevant details"
                  value={newReport.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Photo (Optional)</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="border rounded-lg p-2">
                    <label 
                      htmlFor="image" 
                      className="flex flex-col items-center justify-center cursor-pointer p-4 border-2 border-dashed rounded-md"
                    >
                      {previewImage ? (
                        <div className="w-full">
                          <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="max-h-[200px] mx-auto object-cover rounded" 
                          />
                          <p className="text-sm text-center mt-2 text-gray-500">
                            Click to change image
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">
                            Click to upload a photo
                          </span>
                        </>
                      )}
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="pt-2 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Report</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;