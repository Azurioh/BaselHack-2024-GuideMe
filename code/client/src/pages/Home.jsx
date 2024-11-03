import { useState, useEffect } from 'react'
import MyTable from '../Component/table.jsx'
import ModalNewGuide from '../Component/modalNewGuide.jsx';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Home() {
  const [newGuideModalOpen, setNewGuideModalOpen] = useState(false);
  const [guide, setGuide] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    fetchGuide();
  }, [])

  async function fetchGuide() {
    try {
      const response = await axios.get('api/guidelines',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem('token')
          },
          withCredentials: true
        }
      );
      setGuide(response.data.data.guidelines);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='h-full w-full lg:space-y-3 pt-10' style={{color: "#001529"}}>
        <h1 className='text-center text-5xl lg:text-9xl font-bold'>GuideMe.</h1>
        <h1 className='text-center text-l lg:text-3xl'>{t("pages.home.description")}</h1>
        <div className='pt-10 lg:pt-40 h-full w-full flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0 space-y-3 items-center justify-center'>
          <MyTable
            data={guide}
            addGuideButtonCallBack={() => setNewGuideModalOpen(true)}
            />
        </div>
      </div>
      <ModalNewGuide isOpen={newGuideModalOpen} onClose={() => setNewGuideModalOpen(false)} />
    </>
  )
}

export default Home;
