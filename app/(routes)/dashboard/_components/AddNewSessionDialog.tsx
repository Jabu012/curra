"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Loader2 } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import DoctorAgentCard, { doctorAgent } from "./DoctorsAgentCard"
import SuggestedDoctorCard from "./SuggestedDoctorCard"
import { useRouter } from "next/navigation"

function AddNewSessionDialog() {
    const [note, setNote] =useState <string>();
    const [loading, setLoading] = useState(false);
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();

    const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
    const router=useRouter();

    const OnClickNext = async() => {
  setLoading(true);
  const result = await axios.post("/api/suggest-doctors",{
    notes: note
  })
 
  console.log(result.data);
  setSuggestedDoctors(result.data);
  setLoading(false);
}


const onStartConsultation = async() => {
  setLoading(true);
  // Save All Info To Database
  const result=await axios.post('/api/session-chat',{
    notes:note,
    selectedDoctor:selectedDoctor
  });

console.log(result.data)
if (result.data?.sessionId) {
  console.log(result.data.sessionId);
  //Route to Converation screen
  router.push('/dashboard/medical-agent/'+result.data.sessionId);


}
setLoading(false);


}
  
    return (
    <Dialog>
  <DialogTrigger>
    <Button className="mt-4">✚ Consult With a Doctor</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription asChild>
        {!suggestedDoctors?<div>
    <h2>Add Symptoms or Any Other Details</h2>
    <Textarea placeholder='Add Detail here...'
        className="h-[200px] mt-1"
        onChange={(e) => setNote(e.target.value)}
    />

  </div> :
  <div>
    <h2 className="font-bold text-lg mb-5">Select the Doctor</h2>
  <div className='grid grid-cols-3 gap-5'>
  {/* // Suggested Doctors */}
  {suggestedDoctors.map((doctor, index) => (
   <SuggestedDoctorCard doctorAgent={doctor} key={index} 
   setSelectedDoctor={() => setSelectedDoctor(doctor)}
   //ts-ignore
   selectedDoctor={selectedDoctor} />

    
  ))}
</div>

</div>}
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
       <Button variant={'outline'}>Cancel</Button> 

        </DialogClose>
    
  {!suggestedDoctors?<Button disabled={!note || loading} onClick={() => OnClickNext()} >
      
      Next {loading ? <Loader2 className='animate-spin' /> : <ArrowRight />} </Button>
      : <Button disabled={loading || !selectedDoctor} onClick={() => onStartConsultation()}>Begin Consultation</Button>}
      {loading ? <Loader2 className='animate-spin' /> : <ArrowRight />} 

    </DialogFooter>
  </DialogContent>
</Dialog>
  )  
}

export default AddNewSessionDialog
