import { useState, useEffect } from 'react'
import MyTable from './Component/table.jsx'

const data = [
  { title:'Guide 1',author:'Ben Dover',rating:5,tags:['tag1','tag2','tag3'],liked:true,key:'1' },
  { title:'Guide 2',author:'Ben Dover',rating:4,tags:['tag1','tag2','tag3'],liked:true,key:'2' },
  { title:'Guide 3',author:'Ben Dover',rating:3,tags:['tag1','tag2','tag3'],liked:false,key:'3' },
  { title:'Guide 4',author:'Ben Dover',rating:2,tags:['tag1','tag2','tag3'],liked:true,key:'4' },
  { title:'Guide 5',author:'Ben Dover',rating:1,tags:['tag1','tag2','tag3'],liked:false,key:'5' },
  { title:'Guide 6',author:'Ben Dover',rating:5,tags:['tag1','tag2','tag3'],liked:true,key:'6' },
  { title:'Guide 7',author:'Ben Dover',rating:4,tags:['tag2','tag3'],liked:false,key:'7' },
  { title:'Guide 8',author:'Ben Dover',rating:3,tags:['tag1','tag2','tag3'],liked:false,key:'8' },
  { title:'Guide 9',author:'Ben Dover',rating:2,tags:['tag2','tag3'],liked:true,key:'9' },
  { title:'Guide 10',author:'Ben Dover',rating:1,tags:['tag1','tag2','tag3'],liked:false,key:'10' },
  { title:'Guide 11',author:'Ben Dover',rating:5,tags:['tag2','tag3'],liked:true,key:'11' },
];

function Home() {
  return (
    <>
      <div className='h-full w-full lg:space-y-3 content-center pt-10'>
        <h1 className='text-center text-5xl lg:text-9xl font-bold'>GuideMe.</h1>
        <h1 className='text-center text-l lg:text-3xl'>create a guide for... anything</h1>
        <div className='pt-10 lg:pt-40 h-full w-full flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0 space-y-3 items-center justify-center'>
          <MyTable
            data={data}
            addGuideButtonCallBack={() => console.log('add guide button clicked')}
            />
        </div>
      </div>
    </>
  )
}

export default Home;
