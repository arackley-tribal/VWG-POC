"use client"
import { useState } from "react";
import InstagramPost from "./components/InstagramPost";
import { permutations, _cartesianProductOf } from "./utils/permutations";

export default function Home() {
  const [bgColor, setBgColor] = useState('black')

  /*
  const perms = _cartesianProductOf(
    [
      [ 'http://localhost:3000/image-sets/backgrounds/1.png',
        'http://localhost:3000/image-sets/backgrounds/2.png',
        'http://localhost:3000/image-sets/backgrounds/3.png'
      ],
      ['https://www.volkswagen.co.uk/api/image/2.3/car/hero/model/id/30205/exterior-front/1080.png',
      'https://www.volkswagen.co.uk/api/image/2.3/car/hero/model/id/30251/exterior-front/1080.png',
      'https://www.volkswagen.co.uk/api/image/2.3/car/hero/model/id/30260/exterior-front/1080.png'],
      ['GET £2,500','SPRING SALE','NEW OFFER'],
      ['TOWARDS YOUR T-ROC FINANCE DEPOSIT','TOWARDS YOUR FINANCE DEPOSIT','TOWARDS YOUR DEPOSIT'],
      ['WITH SOLUTIONS PCP'],
      ['Representative'],
      ['7.5% APR','10.5% APR'],
      ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel auctor lorem. Vivamus et tristique sem. Sed nec velit sit amet tortor euismod sollicitudin. Ut nec justo mattis, rutrum urna nec.']
    ]
  )
  */
  

  const perms = _cartesianProductOf(
    [
      [ 'http://localhost:3000/image-sets/backgrounds/1.png',
        'http://localhost:3000/image-sets/backgrounds/2.png',
        'http://localhost:3000/image-sets/backgrounds/3.png'
      ],
      ['https://www.volkswagen.co.uk/api/image/2.3/car/hero/model/id/30360/exterior-front/1080.png',],
      ['GET £2,500', 'GET £11,500'],
      ['TOWARDS YOUR T-ROC FINANCE DEPOSIT'],
      ['WITH SOLUTIONS PCP'],
      ['Representative'],
      ['7.5% APR'],
      ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel auctor lorem. Vivamus et tristique sem. Sed nec velit sit amet tortor euismod sollicitudin. Ut nec justo mattis, rutrum urna nec.']
    ]
  )
/*
  const perms = _cartesianProductOf(
    [
      [ 'http://localhost:3000/image-sets/backgrounds/1.png'
      ],
      ['https://www.volkswagen.co.uk/api/image/2.3/car/hero/model/id/30205/exterior-front/1080.png'],
      ['GET £2,500'],
      ['TOWARDS YOUR T-ROC FINANCE DEPOSIT','TOWARDS YOUR FINANCE DEPOSIT','TOWARDS YOUR DEPOSIT'],
      ['WITH SOLUTIONS PCP*'],
      ['Representative'],
      ['7.5% APR'],
      ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel auctor lorem. Vivamus et tristique sem. Sed nec velit sit amet tortor euismod sollicitudin. Ut nec justo mattis, rutrum urna nec.']
    ]
  )
  */

  const configuration = [
    {x: 0, y: 0, w: 1080, h: 1080},
    {x: 0, y: 250, w: 1080, h: 608},
    {x: 25, y: 100, w: 500, h: 0},
    {x: 25, y: 180, w: 900, h: 0, lh: 75},
    {x: 25, y: 5, w: 900, h: 0, lh: 75},
  ]

  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  return (
    <main className="flex min-h-screen flex-col justify-between" style={{backgroundColor: bgColor}}>
      <div className="p-2 absolute w-full" style={{zIndex: 1000, fontFamily: 'vw-head', fontSize: '20px', display: 'flex', backgroundColor: 'rgb(0, 30, 80)'}}>
        <div className="flex-grow">Instagram Post Generator</div>
        <div className="flex gap-2">
          <button className="bg-white p-2 rounded text-blue-900" onClick={() => setBgColor('white')}></button>
          <button className="bg-black p-2 rounded text-blue-900" onClick={() => setBgColor('black')}></button>
        </div>
      </div>
      <div className="pt-8" style={{width: '100vw', height: '100vh', overflow: 'scroll'}}>
        <div className="mt-8 grid flex-wrap gap-8 p-4" style={{zIndex: 100, overflow: 'scroll', gridTemplateColumns: 'repeat(auto-fit, minmax(1080px, auto))'}}>
          {perms.map((values : any) => {
            return (
                <InstagramPost width={1080} height={1080} values={values} configuration={configuration} id={uuidv4()} />
            )
          })}
        </div>
      </div>
      
    </main>
  );
}
