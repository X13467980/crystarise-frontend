import Image from 'next/image'
import { useRouter } from 'next/router'


export default function RoomTypeChooseBtn() {
    const router = useRouter()
    const goOne = router.push("/")
    const goMany = router.push("/")
    return(
            <div className={`flex flex-col md:flex-row gap-4 w-full max-w-md ${className}`}>
              <button
                onClick={goOne}
                className="flex-1 flex flex-col justify-center items-center py-4 rounded-xl font-semibold shadow hover:opacity-90 transition"
                style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
                aria-label="初めから"
              >
              <div className="h-24">
                <Image
                  src="/gofirst.svg"
                  width={100}
                  height={100}
                  alt="GoFirstImg"
                />
              </div>
                <span className="font-mkpop font-normal text-xl">初めから</span>
              </button>
        
              <button
                onClick={goMany}
                className="flex-1 flex flex-col justify-center items-center py-4 rounded-xl shadow hover:opacity-90 transition"
                style={{ backgroundColor: '#EAFDFF', color: '#144895' }}
                aria-label="続きから"
              >
              <div className="h-24">
                <Image
                  src="/recycle.svg"
                  width={70}
                  height={70}
                  alt="recycle"
                  className="mt-4"
                />
              </div>
                <span className="font-mkpop font-normal text-xl">続きから</span>
              </button>
            </div>
    )
}