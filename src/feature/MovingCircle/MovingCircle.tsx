"use client"

import { CircularProgressbar ,buildStyles} from 'react-circular-progressbar';
import { CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from "next/image";


type Props = { percentage: number };

export default function MovingCircle ({percentage} : Props){
    return(
        <div className="absolute w-[244px] h-[244px] top-[258px] left-1/2 -translate-x-1/2 transform rounded-[122px]">
            <CircularProgressbarWithChildren value={percentage} strokeWidth={3}   styles={buildStyles({
    pathColor: `#ICE8FF`,
    trailColor: '#EAFDFFF',
  })}>
                <div className="w-full h-full grid place-items-center">
                    <div
                        className="relative"
                        style={{
                                    width: `${Math.max(0, Math.min(percentage, 100))}%`,
                                    height: `${Math.max(0, Math.min(percentage, 100))}%`,
                                }}
        >
                        <Image
                            src="/snowflakeincircle.svg"
                            alt="snowflake"
                            fill
                            className="object-contain"
        />
                    </div>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    )
}