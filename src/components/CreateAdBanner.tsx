import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog"

export function CreateAdBanner() {
    return (
        <div className="bg-nlw-gradient pt-1 mt-8 rounded-lg self-stretch overflow-hidden">
            <div className="flex justify-between items-center px-8 py-6 bg-[#2A2634]">
                <div className="flex flex-col gap-2">
                    <strong className="text-2xl text-white font-black">Não encontrou seu duo?</strong>
                    <span className="text-zinc-400">Publique um anúncio para encontrar novos players!</span>
                </div>

                <Dialog.Trigger className="text-white flex justify-between items-center gap-3 font-medium hover:bg-violet-600 transition-colors py-3 px-4 bg-violet-500 rounded-md">
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}