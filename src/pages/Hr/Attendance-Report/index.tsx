import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

const AttendanceReport = () => {
  return (
    <div className='w-11/12 mx-auto flex  items-center gap-5'>
      <Label htmlFor="noticeDate">
        From Date <span className="text-red-500">*</span>
      </Label>
      <Input
        id="noticeDate"
        value={""}
        type="date"
        className='w-1/5'
        // onChange={(e) => setNoticeDate(e.target.value)}
        required
      />
      <Label htmlFor="noticeDate">
        To Date <span className="text-red-500">*</span>
      </Label>
      <Input
        id="noticeDate"
        value={""}
        type="date"
        className='w-1/5'
        // onChange={(e) => setNoticeDate(e.target.value)}
        required
      />
      <Button className='bg-supperagent text-white'>
        Generate Report
      </Button>
      <Button className='bg-supperagent text-white '>
        Download Report PDF
      </Button>
    </div>
  );
};

export default AttendanceReport;
