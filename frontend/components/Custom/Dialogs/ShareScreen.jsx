"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogClose } from "@radix-ui/react-dialog";

import { SquarePlus } from 'lucide-react'

export function ShareScreen() {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <div className='flex flex-col justify-center items-center mb-1'>
      <Button className={`bg-primary w-20 h-20 p-2`} onClick={(e) => console.log("cliecked")}>
          <span className='flex justify-center items-center align-middle text-6xl'>
            <SquarePlus color="white" size={62}/>
          </span>
      </Button>

    </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Screen</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Input id="shareID" className="col-span-3 max-h-[50px] sm:h-[40px]" placeholder="enter your sharing key or Meeting ID"/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="disabled">Share Screen</Button>
          <DialogClose>
            <Button type="submit" variant="outline" className="">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}