
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface SOSButtonProps {
  className?: string;
}

export const SOSButton = ({ className }: SOSButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSOS = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDialogOpen(false);
      
      toast.success("SOS alert sent", {
        description: "Emergency services have been notified of your location.",
      });
    }, 2000);
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className={`animate-pulse-alert gap-2 ${className}`}
        onClick={() => setIsDialogOpen(true)}
      >
        <AlertTriangle className="h-4 w-4" />
        <span>SOS</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">Send Emergency SOS</DialogTitle>
            <DialogDescription>
              This will alert emergency services to your current location. Only use this in case of a genuine emergency.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-700">
              By confirming, your location and contact information will be shared with local rescue teams.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSOS}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Confirm Emergency"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
