import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import moment from "moment";
// import { Switch } from "@/components/ui/switch";

export function AttendanceDialog({ open, onOpenChange, onSubmit, initialData }) {
  const [userid, setUserid] = useState("");
  const [clockin, setClockinTime] = useState("");
  
  
  useEffect(() => {    
    setUserid(initialData?.userId || "");
    setClockinTime(moment(initialData?.checkIn).format('MMMM Do YYYY, h:mm:ss a') || "");
    
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ userid, clockin});
    onOpenChange(false);
    setUserid("");
    setClockinTime(""); 
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Add"} Attendance </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="noticeType">
            User Id <span className="text-red-500">*</span>
            </Label>
            <Input
              id="userid"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              required
            />            
            <Label htmlFor="noticeType">
            Clock In Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="userid"
              value={clockin}
              onChange={(e) => setClockinTime(e.target.value)}
              required
            />            
            
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-supperagent text-white hover:bg-supperagent/90 border-none"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
