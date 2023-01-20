import { SetStateAction, Dispatch } from 'react';

import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface WeekDaysGroupProps {
    weekDays: string[],
    setWeekDays: Dispatch<SetStateAction<string[]>>
}

export function WeekDaysGroup({ weekDays, setWeekDays }: WeekDaysGroupProps) {
    const weekDaysArray = [
        { value: "0", title: "Domingo", text: "D" },
        { value: "1", title: "Segunda", text: "S" },
        { value: "2", title: "Terça", text: "T" },
        { value: "3", title: "Quarta", text: "Q" },
        { value: "4", title: "Quinta", text: "Q" },
        { value: "5", title: "Sexta", text: "S" },
        { value: "6", title: "Sábado", text: "S" }
    ]

    const handleRenderWeekDays = () => {
        return (weekDaysArray.map((weekDay) => (
            <ToggleGroup.Item
                key={weekDay.value}
                value={weekDay.value}
                title={weekDay.title}
                className={`w-8 h-8 bg-zinc-900 rounded ${weekDays.includes(weekDay.value) && "bg-violet-500"} transition-colors`}
            >
                {weekDay.text}
            </ToggleGroup.Item >
        ))
        )
    }

    return (
        <ToggleGroup.Root
            type="multiple"
            className="grid grid-cols-4 gap-1"
            value={weekDays}
            onValueChange={setWeekDays}
        >
            {handleRenderWeekDays()}
        </ToggleGroup.Root>
    )
}