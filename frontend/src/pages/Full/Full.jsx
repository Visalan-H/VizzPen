import React, { useEffect, useState } from 'react'
import MyIframe from '../../Components/MyIframe/MyIframe'
import './Full.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
const Full = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pen, setPen] = useState({});

  useEffect(() => {
    async function meow() {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/pen/${id}`)
        .then((res) => setPen(res.data))
        .then(() => setLoading(false))
    }
    meow()
  }
    , [id])

  if (loading) return <Loading />

  return <MyIframe html={pen.html} css={pen.css} js={pen.js} />
}

export default Full