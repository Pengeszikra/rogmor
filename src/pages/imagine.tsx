import { useState } from 'react';

const ImaginePage = () => {
  // get image from api
  const [image, setImage] = useState(null); // image url
  const [seek, setSeek] = useState(''); // image url
  const [n, setN] = useState(1); // image url 
  const [size, setSize] = useState('256x256'); // image url
  const [debug, trace] = useState({});

  const getImage = async () => {
    const res = await fetch(`/api/ai-image?seek=${encodeURIComponent(seek)}&n=${n}&size=${size}`);
    const json = await res.json();
    trace(json);
    // Note: Dream API integration removed - hardcoded credentials security issue
    // If needed, implement proper authentication flow with environment variables
  };


  return (

      <div className='grid'>
        <input className="bg-black text-white m-2 text-center p-1 rounded-md border-sky-800 border" type="text" placeholder='prompt' value={seek} onChange={e => setSeek(e.target.value)} />
  
        <button className='bg-sky-800 hover:bg-sky-600 m-2 p-2 rounded-md' onClick={getImage} >Get Image</button>
        <pre>{JSON.stringify(debug,null,2)}</pre>
      </div>
  );
};

export default ImaginePage;