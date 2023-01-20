import {
    useEffect,
    useState,
    InputHTMLAttributes
} from 'react';

import * as Select from '@radix-ui/react-select';

import { CaretDown } from "phosphor-react"

interface Game {
    id: string,
    title: string,
}

interface InputProps extends InputHTMLAttributes<HTMLElement> { };

export function InputSelect(props: InputProps) {
    const [game, setGame] = useState("Selecione o game que deseja jogar");
    const [games, setGames] = useState<Game[]>([]);

    const verifyGame = game !== "Selecione o game que deseja jogar";

    useEffect(() => {
        fetch("http://localhost:3333/games")
            .then(response => (response.json()))
            .then(data => setGames(data))
    }, []);

    return (
        <Select.Root name="game" onValueChange={setGame}>
            <Select.Trigger className={`w-full flex items-center justify-between text-sm ${verifyGame ? "text-white" : "text-zinc-500"} rounded py-3 px-4 bg-zinc-900`}>
                <Select.Value placeholder="Selecione o game que deseja jogar" />

                <Select.Icon>
                    <CaretDown />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal className="rounded py-3 px-4 bg-zinc-700">
                <Select.Content className="text-sm text-white">
                    <Select.Viewport>
                        {games.map((game) => (
                            <Select.Item
                                key={game.id}
                                value={game.id}
                                className="[&:not(:first-child)]:mt-3 cursor-pointer hover:bg-zinc-600"
                            >
                                <Select.ItemText>
                                    {game.title}
                                </Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};