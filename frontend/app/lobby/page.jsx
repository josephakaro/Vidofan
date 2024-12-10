import { JoinMeeting } from '@/components/Custom/Dialogs/JoinMeeting'
import { ShareScreen } from '@/components/Custom/Dialogs/ShareScreen'


import React from 'react'

const Lobby = () => {
  return (
    <div className='grid sm:grid-flow-col grid-cols-2 grid-rows-2 w-[250px] h-[250px] items-center justify-center align-middle'>
      <div className='col-span-1 sm:p-1 flex flex-col items-center justify-center'>
        <JoinMeeting />
        <span>New Meeting</span>
      </div>
      <div className='col-span-1 sm:p-1 flex flex-col items-center justify-center'>
        <JoinMeeting />
        <span>Schedule</span>
      </div>
      <div className='col-span-1 sm:p-1 flex flex-col items-center justify-center'>
         <JoinMeeting />
         <span>Join</span>
      </div>
      <div className='col-span-1 sm:p-1 flex flex-col items-center justify-center'>
        <ShareScreen />
        <span>Share Screen</span>
      </div>
    </div>
  )
}

export default Lobby