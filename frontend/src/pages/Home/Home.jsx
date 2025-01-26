import React, { useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading'
import axios from 'axios'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import MyIframe from '../../Components/myIframe'

const Home = ({ user }) => {


  useEffect(() => {

    const handleMove = (e) => {
      const mousepos = { x: e.clientX+window.scrollX, y: e.clientY+window.scrollY };
      curSpan.style.top = `${mousepos.y}px`;
      curSpan.style.left = `${mousepos.x}px`;
    }

    const curSpan = document.createElement('span');
    curSpan.className = "cursor-blur";
    document.body.appendChild(curSpan);
    window.onmousemove = (e) => handleMove(e);

    return () => {
      window.onmousemove = null;
      document.body.removeChild(curSpan);
    };
  }, []);

  let back=''
  const nav = useNavigate();
  const id = user._id;
  console.log(id);
  const [pens, setPens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPens() {
      await axios.get(`http://localhost:3000/pen/all/${id}`)
        .then((res) => {
          setPens(res.data)
        })
        .then(() => setLoading(false))
    }
    getPens();
  }, [])

  if (loading) return <Loading />
  if (pens.length>0) back='back'

  return (
    <div className='main_home'>
      <h1>{`Welcome ${back}! ${user.name}`}</h1>
      <div className="pens_container">
        {pens.map((pen, i) => (
          <div className="iframecontainer" onClick={()=>nav(`/pen/${pen._id}`)}>
            <MyIframe key={i} html={pen.html} css={pen.css} js={pen.js} />
            <h2>{pen.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home