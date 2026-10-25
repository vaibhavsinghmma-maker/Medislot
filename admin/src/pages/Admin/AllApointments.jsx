import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from "../../context/AppContext";
import { assets } from './../../assets/assets';


const AllApointments = () => {
  
  const {aToken,appointments,getAllAppointments} = useContext(AdminContext)
  const {calculateAge, slotDateFormat} = useContext(AppContext)
  
  useEffect(()=>{
  if (aToken) {
    getAllAppointments()
  }
  },[aToken])


  return (
    <div className='w-full max-w-6xl m-5'>
  <p className='mb-3 text-lg font-medium'>All Appointments</p>

  <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
    
    {/* Header */}
    <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b'>
      <p>#</p>
      <p>Patient</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Doctor</p>
      <p>Fees</p>
      <p>Actions</p>
    </div>

    {/* Rows */}
    {appointments.map((item, index) => (
      <div
        key={index}
        className='flex flex-wrap justify-between max-sm:gap-2
                  sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]
                  items-center text-gray-600 py-3 px-6 border-b'
      >
        {/* Index */}
        <p className='max-sm:hidden'>{index + 1}</p>

        {/* Patient */}
        <div className='flex items-center gap-2'>
          <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt='' />
          <p>{item.userData.name}</p>
        </div>

        {/* Age */}
        <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

        {/* Date & Time */}
        <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

        {/* Doctor (Image + Name) */}
        <div className='flex items-center gap-2'>
          <img
            className='w-8 h-8 rounded-full object-cover'
            src={item.docData?.image || "/default-doctor.png"}
            alt='doctor'
          />
          <p>{item.docData?.name || "-"}</p>
        </div>

        {/* Fees (Dollar + Value) */}
        <p className='font-semibold'>${item.amount || "-"}</p>
      {item.Cancelled === true ? (
  <p className="text-red-400 text-xs font-medium">Cancelled</p>
) : (
  <img className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
)}

      </div>
    ))}
  </div>
</div>


  )
}

export default AllApointments