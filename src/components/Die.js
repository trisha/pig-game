import React from 'react';

const Die = (props) => {
    
    return (
        <div style={{display: 'inline-block', width: '50px', height: '50px', borderStyle: 'solid', borderRadius: '5px', margin: '5px'}}>
            <p style={{fontSize: '28px'}}>{props.value}</p>
        </div>
    );
}

export default Die;