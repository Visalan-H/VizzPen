import React, { useEffect, useRef } from 'react'
import CodeBox from '../../Components/CodeBox/CodeBox'
import { useState } from 'react'
import Header from '../../Components/Header/Header'
import MyIframe from '../../Components/MyIframe/MyIframe'
import { ToastContainer, toast } from 'react-toastify'
import './Pen.css'
import { useParams, useNavigate } from 'react-router-dom'
import AbsButton from '../../Components/AbsButton/AbsButton'
import axios from 'axios'

const Pen = ({ user }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [headerVisible, setHeaderVisible] = useState(true);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [topHeight, setTopHeight] = useState("45vh");
  const [penId, setPenId] = useState(null);
  const [pen, setPen] = useState({})
  const [nameVisible, setNameVisible] = useState(false);
  const [name, setName] = useState('');
  const topRef = useRef();

  useEffect(() => {
    if (penId) {
      navigate(`/pen/${penId}`);
    }
  }, [penId, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/pen/${id}`);
          setPen(res.data)
          setHtml(res.data.html);
          setCss(res.data.css);
          setJs(res.data.js);
          setName(res.data.name);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchData();
  }, [id]);

  function handleDownload() {

    if (!name) {
      setNameVisible(true);
      return;
    };
    const fileContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name}</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;
    const blob = new Blob([fileContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.html`;
    link.click();
  }


  function handleSave() {

    if (!name) {
      setNameVisible(true);
      return;
    };
    if (penId) {
      axios.put(`${import.meta.env.VITE_BASE_URL}/pen/${penId}`, { name: name, html: html, css: css, js: js, user: user })
        .then(() => toast("💖 Pen Saved"))
        .catch(err => console.error(err));
    } else {
      axios.post(`${import.meta.env.VITE_BASE_URL}/pen/add`, { name: name, html: html, css: css, js: js, user: user })
        .then(res => {
          setPenId(res.data._id)
        })
        .then(() => toast("💖 Pen Saved"))
    }
  }
  const handleToggle = () => {
    setHeaderVisible(!headerVisible);
  }
  const handleNameToggle = () => {
    setNameVisible(!nameVisible)
  }
  const handleFullView = () => {
    if (!id) {
      toast("Please Save first");
      return;
    }
    window.open(`/full/${id}`, '_blank');
  }

  const handleMouseDown = (e) => {
    e.preventDefault();
    const ifr = document.getElementById("bottomiframe")
    ifr.style.pointerEvents = "none";
    const startY = e.clientY;
    const startHeight = topRef.current.offsetHeight;

    const handleMouseMove = (me) => {

      const newHeight = startHeight + (me.clientY - startY);
      if (newHeight <= 30) {
        setTopHeight(0);
        return;
      }
      requestAnimationFrame(() => {
        setTopHeight(`${newHeight}px`);
      })
    };

    const stopResize = () => {
      ifr.style.pointerEvents = "all";
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResize);
  };
  if (user && pen && pen.user) {
    if (user._id != pen.user) return <h1>Not yours</h1>;
  }

  return (
    <div className='pen_main'>
      <ToastContainer
        position="top-center"
        autoClose={3000}

        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
      <Header toggle={headerVisible} handleSave={handleSave} name={user.name} handleDownload={handleDownload} />
      <div className="top" ref={topRef} style={{ height: topHeight }}>
        <CodeBox Name="html" language="xml" value={html} onChange={setHtml} icon="html5" ic="#E34F26" />
        <CodeBox Name="css" language="css" value={css} onChange={setCss} icon="css3" ic="rebeccapurple" />
        <CodeBox Name="js" language="javascript" value={js} onChange={setJs} icon="js" ic="#F7DF1E" />
      </div>
      <div className="bottom">
        <div className="resize-vertical" onMouseDown={handleMouseDown}></div>
        <MyIframe className="bottomiframe" isId={true} html={html} css={css} js={js} />
      </div>
      <AbsButton top="130px" title='Toggle Header' onClick={handleToggle} state={headerVisible} icons={{ "true": "chevron-up", "false": "chevron-down" }} />
      <AbsButton top="200px" title='Name the Pen' onClick={handleNameToggle} state={nameVisible} icons={{ "true": "chevron-right", "false": "chevron-left" }} />
      <AbsButton top="270px" title='Full View' onClick={handleFullView} state={true} icons={{ "true": "up-right-from-square" }} />
      {nameVisible && <div className="nameInput">
        <i className='fa fa-x' onClick={() => setNameVisible(false)}></i>
        <label htmlFor="namein">Name this Pen <span>(Close when you're done)</span></label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of the Pen' id='namein' />
      </div>}
    </div>
  )
}

export default Pen