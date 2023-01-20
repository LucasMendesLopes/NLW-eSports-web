import {
  useEffect,
  useState
} from "react";

import "./styles/main.css";

import logoImg from "./assets/logo-nlw-esports.svg";

import { CreateAdModal } from "./components/CreateAdModal/CreatAdModal";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";

import * as Dialog from "@radix-ui/react-dialog";

import { CircleNotch } from "phosphor-react";

import axios from "axios";

interface Game {
  id: string,
  bannerUrl: string,
  title: string,
  _count: {
    ads: number
  }
}

// import Swiper core and required modules
import { Navigation, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then(response => setGames(response.data))
  }, []);

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-2/4 -translate-x-2/4 -translate-y-2/4" >
        <CircleNotch
          size={150}
          weight="thin"
          className="animate-spin text-violet-700"
        />
      </div >
    )
  } else {
    return (
      <div className="max-w-[90%] mx-auto flex flex-col items-center my-20">
        <img className="w-72 h-40" src={logoImg} alt="" />

        <h1 className="text-6xl text-white font-black mt-20">
          Seu <span className="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui.
        </h1>

        <div className="w-full mt-16 z-0">
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={50}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true, dragSize: 50 }}
            className="swiper-scrollbar-disabled"
          >
            {games.map((game) => (
              <SwiperSlide key={game.id}>
                <GameBanner
                  bannerUrl={game.bannerUrl}
                  title={game.title}
                  ads={game._count.ads} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Dialog.Root>
          <CreateAdBanner />

          <CreateAdModal
            setGames={setGames}
            setIsLoading={setIsLoading}
          />
        </Dialog.Root>
      </div>
    )
  }
}

export default App;
