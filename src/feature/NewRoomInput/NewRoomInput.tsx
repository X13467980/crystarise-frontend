'use client';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function NewRoomInput({ value, onChange }: Props) {


    return (
    // <div className="w-full flex flex-col items-center space-y-2 pt-5 pb-10">
      <input
        type="text"
        className="login-input px-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ルーム名"
      /> 
    // </div>
    );
}