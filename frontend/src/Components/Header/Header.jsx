import React from 'react'
import './Header.css'
import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'

const Header = ({toggle,handleSave,name,handleDownload}) => {

    const hheight=toggle?"10vh":"0vh";
    const nav=useNavigate();

    return (
        <div className='header_main' style={{height:hheight}}>
            <div className="left">
                <h1 title='home' onClick={()=>nav('/')} >Welcome, {name}</h1>
            </div>
            <div className="right">
                <Button icon="save" title="Save" onClick={handleSave} />
                <Button icon="gear" title="not developed yet"/>
                <Button icon="download" title="download file" onClick={handleDownload}/>
            </div>
        </div>
    )
}

export default Header