import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import AddAds from './component/addAds/AddAds';
import { axiosInstance } from './config';

function App() {

  const [adsList, setAdsList] = useState([]);
  const [text, setText] = useState('');
  const getAds = async (query) => {
    const adsData = await axiosInstance.get(`/getAllAds?input=${query}`);
    console.log('running')
    setAdsList(adsData.data.data);
  }

  const handleChange = async (event) => {
    setText(event.target.value);
  }

  const getIdFromUrl = (url) => {
    if (url) return url.match(/[-\w]{25,}/);
  }

  useEffect(() => {
    getAds(text);
  }, [text])

  console.log(text, adsList);
  return (
    <div className="App">
      <div className='header_container'>
        <h1>Search Ads</h1>
        <TextField onChange={handleChange} style={{ width: '50%' }} placeholder='Search here' />
        <AddAds />
      </div>
      <div className='ads_box_container'>

        {
          adsList && adsList.map(list => {
            return <div key={list._id}>
              <h4>{list.primaryText}</h4>
              <img src={`https://drive.google.com/uc?export=view&id=${getIdFromUrl(list.imageUrl)}`} alt={list.CTA} />
              <p>"{list.headline}"</p>
              <h2>{list.company.name}</h2>
              <Button variant='outlined' style={{ backgroundColor: 'green', color: 'white' }}><b>{list.CTA}</b></Button>
              <p>{list.description}</p>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default App;

/**
 * https://drive.google.com/file/d/17huYmoSHdbgcNqfoO4yYYGIFf8X1243T/view?usp=sharing
 * https://drive.google.com/file/d/17kQiqGnkLEZZmnzLlWG7ZIlN6XbwAVfb/view?usp=sharing
 * https://drive.google.com/file/d/17nXWIFT-63JLfEvBEuQiyDYmA2dckCmq/view
 * https://drive.google.com/file/d/17o3sgN_A6GKPwgZsEpneBYODhRs9tKga/view?usp=sharing
 * https://drive.google.com/file/d/17sz2UuPNcoHXz-U27EYcwmhkI1ZQUmPZ/view?usp=sharing
 * https://drive.google.com/file/d/17vrlQMchymHqlN35p4os23jYqQjFiUNq/view?usp=sharing
 * https://drive.google.com/file/d/17vzdu8jSulXgzk9rkJaHP7W1940pQaAV/view?usp=sharing
 */