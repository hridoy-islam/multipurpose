import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import moment from 'moment';
// import { Switch } from "@/components/ui/switch";

export function NoticeDialog({ open, onOpenChange, onSubmit, initialData }) {
  const [noticeType, setNoticeType] = useState('');
  const [noticeDescription, setNoticeDescription] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [noticeBy, setNoticeBy] = useState('');

  useEffect(() => {
    setNoticeType(initialData?.noticeType || '');
    setNoticeDescription(initialData?.noticeDescription || '');
    setNoticeDate(moment(initialData?.noticeDate).format('MMMM Do YYYY') || '');
    setNoticeBy(initialData?.noticeBy || '');
  }, [initialData]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ noticeType, noticeDescription, noticeDate, noticeBy });
    onOpenChange(false);
    setNoticeType('');
    setNoticeDescription('');
    setNoticeDate('');
    setNoticeBy('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add'} Notice </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="noticeType">
              Notice Type <span className="text-red-500">*</span>
            </Label>
            <Input
              id="noticeType"
              value={noticeType}
              onChange={(e) => setNoticeType(e.target.value)}
              required
            />
            <Label htmlFor="noticeDescription">
              Notice Description <span className="text-red-500">*</span>
            </Label>
            <Input
              id="noticeDescription"
              value={noticeDescription}
              onChange={(e) => setNoticeDescription(e.target.value)}
              required
            />
            <Label htmlFor="noticeDate">
              Notice Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="noticeDate"
              value={noticeDate}
              type="date"
              onChange={(e) => setNoticeDate(e.target.value)}
              required
            />
            <Label htmlFor="noticeBy">
              Notice By <span className="text-red-500">*</span>
            </Label>
            <Input
              id="noticeBy"
              value={noticeBy}
              onChange={(e) => setNoticeBy(e.target.value)}
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
              className="border-none bg-supperagent text-white hover:bg-supperagent/90"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
