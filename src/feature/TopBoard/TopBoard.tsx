interface Props {
  className?: string;
}

export default function TopBoard({ className = "" }: Props): JSX.Element {
  return (
    <div className={`relative w-[383px] h-[216px] ${className}`}>
      <div className="absolute w-[360px] h-40 top-14 left-4 bg-[#e9fcff] rounded-[25px]">
        <div className="top-[19px] left-[90px] text-2xl text-center whitespace-nowrap absolute [font-family:'851MkPOP-Regular',Helvetica] font-normal text-[#144794] tracking-[0] leading-[normal]">
          マラソン大会ルーム
        </div>

        <div className="absolute w-[100px] h-20 top-[57px] left-[22px] bg-[#f7feff] rounded-[10px] border border-solid border-[#1be8ff]">
          <div className="w-20 top-2 left-[9px] text-base absolute [font-family:'851MkPOP-Regular',Helvetica] font-normal text-[#144794] tracking-[0] leading-[normal]">
            みんなでランニングを毎日する！
          </div>
        </div>

        <div className="absolute w-[217px] h-20 top-[57px] left-[130px]">
          <div className="absolute w-[100px] h-20 top-0 left-0 bg-[#fffefe] rounded-[10px] border border-solid border-[#f45c5c]" />

          <div className="absolute w-[100px] h-20 top-0 left-[108px] bg-[#f7feff] rounded-[10px] border border-solid border-[#1be8ff]" />

          <div className="absolute w-[82px] h-[60px] top-[10px] left-2 [font-family:'851MkPOP-Regular',Helvetica] font-normal text-[#f45c5c] text-4xl flex items-center justify-center tracking-[0] leading-[normal]">
            100
          </div>

          <div className="absolute w-[118px] h-[60px] top-[10px] left-[99px] [font-family:'851MkPOP-Regular',Helvetica] font-normal text-[#144794] text-4xl flex items-center justify-center tracking-[0] leading-[normal]">
            km
          </div>
        </div>
      </div>

      <div className="absolute w-[383px] h-14 top-0 left-0">
        <img
          className="absolute w-1 h-10 top-0 left-0"
          alt="Line"
          src="https://c.animaapp.com/men0codmc27QCa/img/line-3.svg"
        />

        <img
          className="absolute w-1 h-[33px] top-[23px] left-[78px]"
          alt="Line"
          src="https://c.animaapp.com/men0codmc27QCa/img/line-6.svg"
        />

        <img
          className="absolute w-1 h-[33px] top-[23px] left-[307px]"
          alt="Line"
          src="https://c.animaapp.com/men0codmc27QCa/img/line-6.svg"
        />

        <img
          className="absolute w-[383px] h-2 top-4 left-0"
          alt="Line"
          src="https://c.animaapp.com/men0codmc27QCa/img/line-4.svg"
        />
      </div>
    </div>
  );
};
