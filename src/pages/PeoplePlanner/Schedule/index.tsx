import { Calendar, Clock, Users, FileText, MessageSquare, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScheduleView } from "./components/schedule-view"
import { ClockInOut } from "./components/clock-in-out"
import { TaskLogging } from "./components/task-logging"
import { TeamCommunication } from "./components/team-communication"
import { ShiftRequests } from "./components/shift-request"

export default function SchedulePage() {
  return (
    <div className="min-h-screen">
      

      <main className=" px-4 py-6">
        {/* <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 bg-white shadow-md ">
            <TabsTrigger value="schedule" className="flex items-center space-x-2 ">
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="clock" className="flex items-center space-x-2 ">
              <Clock className="h-4 w-4" />
              <span>Clock In/Out</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2 ">
              <FileText className="h-4 w-4" />
              <span>Tasks & Logs</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2 ">
              <Users className="h-4 w-4" />
              <span>Shift Requests</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center space-x-2 ">
              <MessageSquare className="h-4 w-4" />
              <span>Communication</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <ScheduleView />
            </TabsContent>
            
            <TabsContent value="clock">
            <ClockInOut />
            </TabsContent>
            
            <TabsContent value="tasks">
            <TaskLogging />
            </TabsContent>
            
            <TabsContent value="requests">
            <ShiftRequests />
            </TabsContent>
            
            <TabsContent value="communication">
            <TeamCommunication />
            </TabsContent>
            </Tabs> */}
      <ScheduleView />
      </main>
    </div>
  )
}
