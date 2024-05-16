"use client"

import { useRef } from "react";
import { toPng } from 'html-to-image';

type InstagramVerticalPostProps = { 
    width: number;
    height: number;
    values: any;
    configuration: any;
    id: any;
}

export function InstagramVerticalPost(props: InstagramVerticalPostProps) {
    const elementRef = useRef(null);

    const htmlToImageConvert = async () => {
        if(elementRef.current){
            const dataUtrl = await toPng(elementRef.current, { cacheBust: false })
            const link = document.createElement("a");
            link.download = `${props.id}.png`;
            link.href = dataUtrl;
            link.click();
        }
      };

    return (
        <div id={props.id}>
        {props.id}
        <div ref={elementRef} style={{
            width: props.width,
            height: props.height, 
            backgroundImage: `url("${props.values[0]}-tall.png")`,
            padding: '5%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <div style={{fontFamily: 'vw-head', fontSize: '77px', lineHeight: '72px', marginTop: '100px' }}>
                <div style={{fontWeight: 'bold'}}>{props.values[2]}</div>
                <div style={{fontWeight: '200'}}>{props.values[3]}</div>
                <div style={{fontSize: '51px', fontWeight: '200'}}>{props.values[4]}</div>
            </div>
            
            <img style={{
                position: 'absolute',
                top: '750px',
                scale: 1.4,
                marginLeft: '-50px'
            }} src={props.values[1]} />

            <div style={{marginBottom: '200px'}}>
                <div style={{fontSize: '36px', fontWeight: '200'}}>{props.values[5]}</div>
                <div style={{display: 'flex'}}>
                    <div style={{minWidth: '350px',fontSize: '74px', marginTop:'-20px', fontWeight: 'bold'}}>{props.values[6]}</div>
                    <div style={{fontFamily: 'vw-text', marginLeft: '20px', fontSize: '20px'}}>{props.values[7]}</div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default InstagramVerticalPost