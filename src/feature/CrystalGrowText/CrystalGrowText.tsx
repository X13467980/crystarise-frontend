type Props = {
    className?: string;
};

export default function CrystalText({ className = "" }: Props) {
    return (
        <p className={`font-inter text-base text-[#EAFDFF] ${className}`}>努力で結晶を育てよう</p>
    )
};

