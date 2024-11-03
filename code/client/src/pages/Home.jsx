import { useState, useEffect } from 'react'
import MyTable from '../Component/table.jsx'
import ModalNewGuide from '../Component/modalNewGuide.jsx';
import { useTranslation } from 'react-i18next';

const data = [
  { title:'Guide 1',author:'Ben Dover',likes:5,tags:['tag1','tag2','tag3'],liked:true,key:'1', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv sdicsdocinscd zeoincc qsdcoiqncd qdscoinqsdc qsodicnqsd cqsodicnez czoencze cozincsdcoisndc qcoinsdocinsd csd c cze ze c zec z cs dcqsdicqdocinqsoicdnqosdc ze cze zecuz ecoaizecoianezfoiaf afez ac sdcqsdc eozincaezoicnz ceaz eca zec aze cazecqscsddd" },
  { title:'Guide 2',author:'Ben Dover',likes:4,tags:['tag1','tag2','tag3'],liked:true,key:'2', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
  { title:'Guide 3',author:'Ben Dover',likes:3,tags:['tag1','tag2','tag3'],liked:false,key:'3', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
  { title:'Guide 4',author:'Ben Dover',likes:2,tags:['tag1','tag2','tag3'],liked:true,key:'4', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
  { title:'Guide 5',author:'Ben Dover',likes:1,tags:['tag1','tag2','tag3'],liked:false,key:'5', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
  { title:'Guide 6',author:'Ben Dover',likes:5,tags:['tag1','tag2','tag3'],liked:true,key:'6', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
  { title:'Guide 7',author:'Ben Dover',likes:4,tags:['tag2','tag3'],liked:false,key:'7', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
  { title:'Guide 8',author:'Ben Dover',likes:3,tags:['tag1','tag2','tag3'],liked:false,key:'8', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
  { title:'Guide 9',author:'Ben Dover',likes:2,tags:['tag2','tag3'],liked:true,key:'9', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
  { title:'Guide 10',author:'Ben Dover',likes:1,tags:['tag1','tag2','tag3'],liked:false,key:'10', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
  { title:'Guide 11',author:'Ben Dover',likes:5,tags:['tag2','tag3'],liked:true,key:'11', images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], description: "This is a simple description on multiple line, soicdnsodinc sdocin zapeoxpo,xaz azpxqdc ervocrev cdsdpoc,z eaporve rv" },
];

function Home() {
  const [newGuideModalOpen, setNewGuideModalOpen] = useState(false);
  const {t} = useTranslation();

  return (
    <>
      <div className='h-full w-full lg:space-y-3 pt-10' style={{color: "#001529"}}>
        <h1 className='text-center text-5xl lg:text-9xl font-bold'>GuideMe.</h1>
        <h1 className='text-center text-l lg:text-3xl'>{t("pages.home.description")}</h1>
        <div className='pt-10 lg:pt-40 h-full w-full flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0 space-y-3 items-center justify-center'>
          <MyTable
            data={data}
            addGuideButtonCallBack={() => setNewGuideModalOpen(true)}
            />
        </div>
      </div>
      <ModalNewGuide isOpen={newGuideModalOpen} onClose={() => setNewGuideModalOpen(false)} />
    </>
  )
}

export default Home;
