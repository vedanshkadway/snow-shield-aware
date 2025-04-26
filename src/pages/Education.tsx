
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const Education = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Education & Safety</h1>
        <p className="text-gray-500">Learn about avalanche safety and survival techniques</p>
      </div>
      
      <Tabs defaultValue="safety" className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px] mb-6">
          <TabsTrigger value="safety">Safety Tips</TabsTrigger>
          <TabsTrigger value="survival">Survival Guide</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="safety">
          <Card>
            <CardHeader>
              <CardTitle>Avalanche Safety Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Before Your Trip</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">1</div>
                    <span>Check the avalanche forecast for your destination</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">2</div>
                    <span>Plan routes that avoid high-risk avalanche terrain</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">3</div>
                    <span>Pack essential safety equipment: avalanche transceiver, probe, and shovel</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">4</div>
                    <span>Consider taking an avalanche safety course</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">5</div>
                    <span>Share your route and expected return time with someone</span>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">During Your Trip</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">1</div>
                    <span>Travel one person at a time in avalanche terrain</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">2</div>
                    <span>Watch for signs of instability: cracking, collapsing, or recent avalanches</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">3</div>
                    <span>Avoid steep slopes during heavy snowfall or rapid warming</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">4</div>
                    <span>Keep your safety equipment easily accessible</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xs">5</div>
                    <span>Regularly check for Snow Shield alerts and updates</span>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">Recognize Warning Signs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-3">Natural Signs</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>- Recent avalanche activity</li>
                        <li>- Cracking or collapsing of snow</li>
                        <li>- Heavy snowfall (1 cm/hour or more)</li>
                        <li>- Rapid warming or rain on snow</li>
                        <li>- Strong winds moving snow</li>
                        <li>- "Whumpfing" sounds</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-3">Red Flag Conditions</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>- Slope angles between 30-45 degrees</li>
                        <li>- Terrain traps (gullies, trees, cliffs)</li>
                        <li>- Convex rolls in slope angle</li>
                        <li>- Lack of anchors (trees, rocks)</li>
                        <li>- Areas with recent snowfall (24-48 hrs)</li>
                        <li>- Temperature rises above freezing</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>
                  Download Safety Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="survival">
          <Card>
            <CardHeader>
              <CardTitle>Avalanche Survival Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">If Caught in an Avalanche</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-3 text-primary">1. During the Slide</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Try to get off the slab by moving diagonally</li>
                        <li>• Deploy avalanche airbag if you have one</li>
                        <li>• Grab a tree or rock if possible</li>
                        <li>• "Swim" with the avalanche to stay on top</li>
                        <li>• Protect your airway by covering mouth</li>
                        <li>• Discard equipment (poles, skis) but keep backpack</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-3 text-primary">2. As the Avalanche Slows</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Fight hard to stay near the surface</li>
                        <li>• Create an air pocket in front of your face</li>
                        <li>• Extend an arm toward the surface</li>
                        <li>• Take a deep breath before the snow settles</li>
                        <li>• Try to maintain a calm breathing pattern</li>
                        <li>• Conserve oxygen - breathing slowly is vital</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-3 text-primary">3. Once Buried</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Remain calm to conserve oxygen</li>
                        <li>• Don't shout unless you hear rescuers nearby</li>
                        <li>• Try to dig out if possible</li>
                        <li>• If you can't move, conserve energy</li>
                        <li>• Use the SOS button on your Snow Shield app if accessible</li>
                        <li>• Most rescues happen within 15-30 minutes</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">If Someone in Your Group is Caught</h3>
                
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">1</div>
                      <div>
                        <h5 className="font-medium mb-1">Watch the victim</h5>
                        <p className="text-sm text-gray-700">Keep your eyes on the victim and note their last seen point. Mark this location visually with a landmark.</p>
                      </div>
                    </li>
                    
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">2</div>
                      <div>
                        <h5 className="font-medium mb-1">Assess for secondary avalanches</h5>
                        <p className="text-sm text-gray-700">Ensure the area is safe before beginning rescue. Look for signs of further instability.</p>
                      </div>
                    </li>
                    
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">3</div>
                      <div>
                        <h5 className="font-medium mb-1">Use transceivers</h5>
                        <p className="text-sm text-gray-700">Switch all transceivers to search mode. Begin search pattern from the last seen point.</p>
                      </div>
                    </li>
                    
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">4</div>
                      <div>
                        <h5 className="font-medium mb-1">Call for help</h5>
                        <p className="text-sm text-gray-700">Use the Snow Shield SOS button or call emergency services. Provide precise location details.</p>
                      </div>
                    </li>
                    
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">5</div>
                      <div>
                        <h5 className="font-medium mb-1">Probe and dig strategically</h5>
                        <p className="text-sm text-gray-700">Once you've narrowed down the search area, use probes in a spiral pattern. When you get a strike, dig efficiently, focusing on clearing snow from the victim's airway first.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Video Tutorials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["Transceiver Search Techniques", "Efficient Digging Methods", "Avalanche First Aid"].map((title, i) => (
                    <div key={i} className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                      <p className="text-gray-500 text-sm">{title} Video</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Educational Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Recommended Training</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-1">Avalanche Safety Level 1</h4>
                      <p className="text-sm text-gray-500 mb-3">2-day course for recreational users</p>
                      <p className="text-xs text-gray-500">Learn basic avalanche assessment, rescue techniques, and trip planning.</p>
                      <Button className="mt-3" variant="outline" size="sm">Find Courses</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-1">Advanced Avalanche Training</h4>
                      <p className="text-sm text-gray-500 mb-3">5-day intensive course for experienced users</p>
                      <p className="text-xs text-gray-500">Advanced terrain analysis, snow science, and complex rescue scenarios.</p>
                      <Button className="mt-3" variant="outline" size="sm">Find Courses</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Downloadable Resources</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Avalanche Field Guide</p>
                        <p className="text-xs text-gray-500">PDF, 4.2MB</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Emergency Checklist</p>
                        <p className="text-xs text-gray-500">PDF, 1.8MB</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Trip Planning Template</p>
                        <p className="text-xs text-gray-500">PDF, 2.5MB</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">External Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-1">Avalanche Research Center</h4>
                      <p className="text-sm text-gray-500 mb-3">Official forecasts and research</p>
                      <Button className="w-full" variant="outline" size="sm">Visit Website</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-1">Mountain Safety Council</h4>
                      <p className="text-sm text-gray-500 mb-3">Safety guidelines and training</p>
                      <Button className="w-full" variant="outline" size="sm">Visit Website</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-1">Outdoor Emergency Response</h4>
                      <p className="text-sm text-gray-500 mb-3">First aid for avalanche incidents</p>
                      <Button className="w-full" variant="outline" size="sm">Visit Website</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
