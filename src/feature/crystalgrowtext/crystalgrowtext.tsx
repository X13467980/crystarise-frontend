type Props = {
    className?: string;
};

export default function CrystalText({className=""}: Props) {
    return (
        <span className="font-inter text-md ${className}">努力で結晶を育てよう</span>
    )
};

