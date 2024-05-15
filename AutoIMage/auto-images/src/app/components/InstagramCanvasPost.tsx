"use client"
import { useRef, useEffect } from 'react';

type InstagramPostProps = { 
    width: number;
    height: number;
    values: any;
    configuration: any;
}

export function InstagramCanvasPost(props : InstagramPostProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function wrapText(context : any, text : string, x: number, y: number, maxWidth: number, lineHeight: number) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
    }

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                // BG
                const bgImage = new Image();
                bgImage.src = props.values[0];
                bgImage.onload = () => {
                    context.drawImage(bgImage, props.configuration[0].x, props.configuration[0].y, props.configuration[0].w, props.configuration[0].h);
                    // Image
                    const image = new Image();
                    image.src = props.values[1];
                    image.onload = () => {
                        context.drawImage(image, props.configuration[1].x, props.configuration[1].y, props.configuration[1].w, props.configuration[1].h);
                        
                        // Text
                        context.fillStyle = "white";
                        context.font = "bold 78px Arial";
                        context.fillText(props.values[2], props.configuration[2].x, props.configuration[2].y)
                        context.restore()
                        
                        // Text
                        context.fillStyle = "white";
                        context.font = "lighter 78px Arial";
                        wrapText(context, props.values[3], props.configuration[3].x, props.configuration[3].y, props.configuration[3].w, props.configuration[3].lh)
                        context.restore()

                        // Text
                        context.fillStyle = "white";
                        context.font = "lighter 78px Arial";
                        wrapText(context, props.values[3], props.configuration[3].x, props.configuration[3].y, props.configuration[3].w, props.configuration[3].lh)
                        context.restore()
                        
                    };

                };


            }
          }
        
    }, []);


    return <canvas style={{}} ref={canvasRef} width={props.width} height={props.height} />;
}

export default InstagramCanvasPost