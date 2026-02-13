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
import { ArrowRight } from "lucide-react"
import { useState } from "react"


function AddNewSessionDialog() {
    const [note, setNote] =useState <string>();
    return (
    <Dialog>
  <DialogTrigger>
    <Button className="mt-4">✚ Consult With a Doctor</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription asChild>
        <div>
            <h2>Add Symtoms or Any Other Details</h2>
        <Textarea placeholder='Add Detail here...' 
        className="h-[180px] mt-1" 
        onChange={(e) => setNote(e.target.value)}

        />
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
       <Button variant={'outline'}>Cancel</Button> 

        </DialogClose>
    
    <Button disabled={!note}>Next<ArrowRight/></Button>       
    
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default AddNewSessionDialog
