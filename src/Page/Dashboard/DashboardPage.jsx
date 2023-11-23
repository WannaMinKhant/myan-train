import React from 'react'
import { IoMdTrain } from 'react-icons/io';
import Station from '../../image/station.png'

const DashboardPage = () => {

  const stationList = [
    {
      id:1,
      order:1,
      name:'Yangon',
      status:'1'
    },
    {
      id:2,
      order:2,
      name:'PhyarLan',
      status:'0'
    },{
      id:3,
      order:3,
      name:'Alone',
      status:'0'
    },
    {
      id:4,
      order:4,
      name:'Lanmadaw',
      status:'1'
    },{
      id:5,
      order:5,
      name:'Hantharwati',
      status:'1'
    },
    {
      id:6,
      order:6,
      name:'Heldan',
      status:'1'
    },{
      id:7,
      order:7,
      name:'Hlaing',
      status:'1'
    },
    {
      id:8,
      order:8,
      name:'Yangon',
      status:'1'
    },
    {
      id:9,
      order:9,
      name:'PhyarLan',
      status:'1'
    },{
      id:10,
      order:10,
      name:'Alone',
      status:'1'
    },
    {
      id:11,
      order:11,
      name:'Lanmadaw',
      status:'1'
    },{
      id:12,
      order:12,
      name:'Hantharwati',
      status:'1'
    },
    {
      id:13,
      order:13,
      name:'Heldan',
      status:'1'
    },{
      id:14,
      order:14,
      name:'Hlaing',
      status:'1'
    },
    {
      id:1,
      order:1,
      name:'Yangon',
      status:'1'
    },
    {
      id:2,
      order:2,
      name:'PhyarLan',
      status:'0'
    },{
      id:3,
      order:3,
      name:'Alone',
      status:'0'
    },
    {
      id:4,
      order:4,
      name:'Lanmadaw',
      status:'1'
    },{
      id:5,
      order:5,
      name:'Hantharwati',
      status:'1'
    },
    {
      id:6,
      order:6,
      name:'Heldan',
      status:'1'
    },{
      id:7,
      order:7,
      name:'Hlaing',
      status:'1'
    },
    {
      id:8,
      order:8,
      name:'Yangon',
      status:'1'
    },
    {
      id:9,
      order:9,
      name:'PhyarLan',
      status:'1'
    },{
      id:10,
      order:10,
      name:'Alone',
      status:'1'
    },
    {
      id:11,
      order:11,
      name:'Lanmadaw',
      status:'1'
    },{
      id:12,
      order:12,
      name:'Hantharwati',
      status:'1'
    },
    {
      id:13,
      order:13,
      name:'Heldan',
      status:'1'
    },{
      id:14,
      order:14,
      name:'Hlaing',
      status:'1'
    },
    {
      id:1,
      order:1,
      name:'Yangon',
      status:'1'
    },
    {
      id:2,
      order:2,
      name:'PhyarLan',
      status:'0'
    },{
      id:3,
      order:3,
      name:'Alone',
      status:'0'
    },
    {
      id:4,
      order:4,
      name:'Lanmadaw',
      status:'1'
    },{
      id:5,
      order:5,
      name:'Hantharwati',
      status:'1'
    },
    {
      id:6,
      order:6,
      name:'Heldan',
      status:'1'
    },{
      id:7,
      order:7,
      name:'Hlaing',
      status:'1'
    },
    {
      id:8,
      order:8,
      name:'Yangon',
      status:'1'
    },
    {
      id:9,
      order:9,
      name:'PhyarLan',
      status:'1'
    },{
      id:10,
      order:10,
      name:'Alone',
      status:'1'
    },
    {
      id:11,
      order:11,
      name:'Lanmadaw',
      status:'1'
    },{
      id:12,
      order:12,
      name:'Hantharwati',
      status:'1'
    },
    {
      id:13,
      order:13,
      name:'Heldan',
      status:'1'
    },{
      id:14,
      order:14,
      name:'Hlaing',
      status:'1'
    },
    {
      id:1,
      order:1,
      name:'Yangon',
      status:'1'
    },
    {
      id:2,
      order:2,
      name:'PhyarLan',
      status:'0'
    },{
      id:3,
      order:3,
      name:'Alone',
      status:'0'
    },
    {
      id:4,
      order:4,
      name:'Lanmadaw',
      status:'1'
    },{
      id:5,
      order:5,
      name:'Hantharwati',
      status:'1'
    },
    {
      id:6,
      order:6,
      name:'Heldan',
      status:'1'
    },{
      id:7,
      order:7,
      name:'Hlaing',
      status:'1'
    },
    {
      id:8,
      order:8,
      name:'Yangon',
      status:'1'
    },
    {
      id:9,
      order:9,
      name:'PhyarLan',
      status:'1'
    },{
      id:10,
      order:10,
      name:'Alone',
      status:'1'
    },
    {
      id:11,
      order:11,
      name:'Lanmadaw',
      status:'1'
    },{
      id:12,
      order:12,
      name:'Hantharwati',
      status:'1'
    },
    {
      id:13,
      order:13,
      name:'Heldan',
      status:'1'
    },{
      id:14,
      order:14,
      name:'Hlaing',
      status:'1'
    }
  ];
  return (
    <div className='w-full h-screen overflow-y-auto scrollbar-hide'>
      <div className='grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 font-poppins select-none gap-4'>
      {
        stationList.map((station,i)=>{
          return (
            <div id={i} className='relative h-fit'>
              <div className='p-2 bg-blue-gray-600 m-2 rounded-xl text-left shadow-md shadow-indigo-300'>
                <div className='flex flex-row items-center justify-center pb-2'>
                  <img src={Station} alt={"station"} width={40} height={40}/>
                </div>
                <p className='text-xs text-gray-200'>{ station.name}</p>
                <div className='flex flex-row justify-between text-sm'>
                  <p className='text-gray-500'>status</p>
                  <p className={`${station.status == 1 ? "text-green-500" : "text-red-400"} font-poppins`}>{station.status == 1 ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className={`absolute w-4 h-4 top-0 right-0 rounded-full ${station.status == 1 ? ' bg-green-500' : 'bg-red-500'}`}>
                </div> 
            </div>
          )
        })
      }
      </div>
      
    </div>
  )
}

export default DashboardPage