import React from 'react'
import './Header.css'
import { Button } from '../Button/Button'

const Header = ({toggle,handleSave,name,handleDownload}) => {

    const hheight=toggle?"10vh":"0vh";

    return (
        <div className='header_main' style={{height:hheight}}>
            <div className="left">
                <h1>Welcome, {name}</h1>
            </div>
            <div className="right">
                <Button icon="save" title="Save" onClick={handleSave} />
                <Button icon="gear" title="Settings"/>
                <Button icon="download" title="download file" onClick={handleDownload}/>
            </div>
        </div>
    )
}

export default Header