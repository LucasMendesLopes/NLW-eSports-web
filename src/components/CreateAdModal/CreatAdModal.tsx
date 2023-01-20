import {
    useState,
    FormEvent,
    Dispatch,
    SetStateAction
} from "react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox';

import { Input } from "./components/Input";
import { WeekDaysGroup } from "./components/WeekDaysGroup";
import { InputSelect } from "./components/InputSelect";

import {
    GameController,
    Check
} from "phosphor-react";

import axios from "axios";

import toast, { Toaster } from 'react-hot-toast';

interface Game {
    id: string,
    bannerUrl: string,
    title: string,
    _count: {
        ads: number
    }
}

interface CreateAdModalProps {
    setGames: Dispatch<SetStateAction<Game[]>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>
};

export function CreateAdModal({ setGames, setIsLoading }: CreateAdModalProps) {
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays,
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            });

            toast.success('Anúncio criado com sucesso!')
        } catch (error) {
            console.log('error :>> ', error);
            toast.error('Erro ao criar o anúncio')
        }
        finally {
            setTimeout(() => {
                setIsLoading(true);

                axios("http://localhost:3333/games").then(
                    response => setGames(response.data)
                );

                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            }, 1500);
        }
    };

    return (
        <>
            <Dialog.Portal className="transition-all">
                <Toaster position="top-center" />
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

                <Dialog.Content className="bg-[#2A2634] rounded-lg shadow-black/25 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[488px] h-[651px] max-h-[95%] py-7 px-7 text-white">
                    <Dialog.Title className="text-3xl font-black">
                        Publique um anúncio
                    </Dialog.Title>

                    <form onSubmit={handleCreateAd} className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="game"
                                className="font-semibold"
                            >
                                Qual o game?
                            </label>

                            <InputSelect />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="name"
                                className="font-semibold"
                            >
                                Seu nome (ou nickname)
                            </label>


                            <Input
                                id="name"
                                name="name"
                                placeholder="Como te chamam dentro do game?"
                            />
                        </div>

                        <div className="flex justify-between">
                            <div className="flex flex-col gap-2 w-48">
                                <label
                                    htmlFor="yearsPlaying"
                                    className="font-semibold"
                                >
                                    Joga há quantos anos?
                                </label>

                                <Input
                                    id="yearsPlaying"
                                    name="yearsPlaying"
                                    type="number"
                                    placeholder="Tudo bem ser ZERO"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-48">
                                <label
                                    htmlFor="discord"
                                    className="font-semibold"
                                >
                                    Qual seu Discord?
                                </label>

                                <Input
                                    id="discord"
                                    name="discord"
                                    placeholder="Usuario#0000"
                                />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="weekDays"
                                    className="font-semibold"
                                >
                                    Quando costuma jogar?
                                </label>

                                <WeekDaysGroup
                                    weekDays={weekDays}
                                    setWeekDays={setWeekDays}
                                />
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label
                                    htmlFor="hourStart"
                                    className="font-semibold"
                                >
                                    Qual horário do dia?
                                </label>

                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        id="hourStart"
                                        name="hourStart"
                                        type="time"
                                        placeholder="De"
                                        className="w-full h-10 rounded px-3 py-2 bg-zinc-900 placeholder:text-zinc-500"
                                    />

                                    <input
                                        id="hourEnd"
                                        name="hourEnd"
                                        type="time"
                                        placeholder="Até"
                                        className="w-full h-10 rounded px-3 py-2 bg-zinc-900 placeholder:text-zinc-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-1 flex gap-2 text-sm items-center">
                            <Checkbox.Root
                                checked={useVoiceChannel}
                                onCheckedChange={(checked) => {
                                    if (checked === true) setUseVoiceChannel(true)
                                    else setUseVoiceChannel(false)
                                }}
                                className="w-6 h-6 rounded bg-zinc-900 flex items-center justify-center"
                            >
                                <Checkbox.Indicator>
                                    <Check className="w-4 h-4 text-emerald-700" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>

                            <span> Costumo me conectar ao chat de voz?</span>
                        </div>

                        <footer className="flex gap-4 justify-end">
                            <Dialog.Close className="w-[108px] h-12 py-3 px-5 bg-zinc-500 rounded-md hover:bg-zinc-600">
                                Cancelar
                            </Dialog.Close>

                            <button
                                type="submit"
                                className="flex gap-3 w-[184px] h-12 py-3 px-5 bg-violet-500 hover:bg-violet-600 rounded-md"
                            >
                                <GameController width={24} height={24} />
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </>
    );
};