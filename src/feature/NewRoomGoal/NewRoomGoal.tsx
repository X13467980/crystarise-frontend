'use client';

type Props = {
    goal: string;
    number: string;
    unit: string;
    onChangeGoal: (v: string) => void;
    onChangeNumber: (v: string) => void;
    onChangeUnit: (v: string) => void;
};

export default function NewRoomGoal({ goal, number, unit, onChangeGoal, onChangeNumber, onChangeUnit }: Props) {
    return (
        <>
            <div className="flex w-full items-center justify-center space-x-2">
                <textarea
                    value={goal}
                    onChange={(e) => onChangeGoal(e.target.value)}
                    placeholder="例：毎日ランニングする"
                    className="placeholder:whitespace-pre-line text-center font-mkpop flex-1 rounded-md py-4 w-10 h-20 bg-[var(--secondary)] text-[var(--text-color)] border-1 border-[var(--light-button)] resize-none"
                    rows={2}
                    style={{ minHeight: '80px', maxHeight: '160px', overflow: 'auto' }}
                    maxLength={12}
                />

                <input
                    type="number"
                    value={number}
                    onChange={(e) => onChangeNumber(e.target.value)}
                    placeholder="100"
                    className="font-mkpop flex-1 text-center text-3xl rounded-md w-10 h-20 bg-[#FFFFFF] text-[#FAAEAE] border-1 border-[#F55D5D]"
                />

                <input
                    type="text"
                    value={unit}
                    onChange={(e) => onChangeUnit(e.target.value)}
                    placeholder="km"
                    className="font-mkpop flex-1 text-center text-3xl rounded-md py-10 w-10 h-20 bg-[var(--secondary)] text-[var(--text-color)] border-1 border-[var(--light-button)]"
                />
            </div>
            {goal.length >= 12 && (
                    <div className="w-full text-center text-xs text-red-500 mt-1 font-bold">目標は12文字以内で入力してください</div>
            )}
        </>
    );

}