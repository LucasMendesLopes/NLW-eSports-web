interface GameBannerProps {
    bannerUrl: string,
    title: string,
    ads: number
}

export function GameBanner(props: GameBannerProps) {
    return (
        <a href="" className="overflow-hidden opacity-80 pointer-events-none">
            <img className="rounded-lg w-full" src={props.bannerUrl} alt="" />

            <div className="absolute flex flex-col gap-1 rounded-lg bottom-0 left-0 w-full pt-16 pb-4 px-4 bg-game-gradient text-xs lg:text-sm">
                <strong className="font-bold text-white block">{props.title}</strong>
                <span className="text-zinc-300 block">{props.ads}</span>
            </div>
        </a>
    )
}