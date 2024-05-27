import React, {useContext, useEffect} from 'react';

function TextBlock({blockId}) {
    const data = {};
    const abc = () =>{
        return {
            fontWeight : data.bold && 600,
            fontStyle : data.italic || 300,
        }
    }



    return (
        <p style={{fontWeight: 600}}>&#xFEFF;</p>
    );
}

export default TextBlock;