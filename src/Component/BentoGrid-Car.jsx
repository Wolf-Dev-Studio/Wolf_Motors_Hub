import ImgDodge from "../assets/USA/DodgeBento.webp";
import ImgFord from "../assets/USA/FordBento.webp";
import ImgChevrolet from "../assets/USA/ChevroletBento.webp";
import ImgCorvette from "../assets/USA/CorvetteBento.webp";
import Catalogo from "./Catalogo";

export default function BentoGridCar(props) {

    const { variant } = props;

    const stylesConfig = {
        americanos: {
            Fondo: "bg-[#121212]",
            textColor: "text-[#F5F5F5]",
            textColor2: "hover:text-[#B22222] hover:bg-[#F5F5F5]",
            Catalog: "/catalogo/americanos",
            Img1: ImgDodge,
            Img2: ImgFord,
            Img3: ImgChevrolet,
            Img4: ImgCorvette,
        },
        europeos: {
            Fondo: "bg-[#F5F6FA]",
            textColor: "text-[#00CEC9]",
            textColor2: "hover:text-[#1E272E] hover:bg-[#0984E3]",
            Catalog: "/catalogo/europeo",
            Img1: "",
            Img2: "",
            Img3: "",
            Img4: "",
        },
        asiaticos: {
            Fondo: "bg-[#DFE6E9]",
            textColor: "text-[#2D3436]",
            textColor2: "hover:text-[#D3B037] hover:bg-[#2D3436]",
            Catalog: "/catalogo/asiatico",
            Img1: "",
            Img2: "",
            Img3: "",
            Img4: "",
        }
    };


    const currentStyle = stylesConfig[variant];

    return (

        <div className={`${currentStyle.Fondo} py-10 sm:py-16`}>
            <div className="mr-auto ml-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-10 grid gap-5 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-gray-800 lg:rounded-l-4xl" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            <div className="relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                                <img
                                    alt=""
                                    src={currentStyle.Img1}
                                    className="size-full object-cover object-top"
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
                    </div>
                    <div className="relative max-lg:row-start-1">
                        <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-4xl" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                            <div className="flex flex-1 items-center justify-center">
                                <img
                                    alt=""
                                    src={currentStyle.Img4}
                                    className="size-full object-cover object-top"
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
                    </div>
                    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-gray-800" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                            <div className="flex flex-1 items-center">
                                <img
                                    alt=""
                                    src={currentStyle.Img3}
                                    className="size-full object-cover object-top"
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
                    </div>
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                            <div className="flex flex-1 items-center">
                                <img
                                    alt=""
                                    src={currentStyle.Img2}
                                    className="size-full object-cover object-top"
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
                    </div>
                </div>
            </div>
            <div className='flex flex-end items-center justify-end mr-70 mt-10'>
                <a href={currentStyle.Catalog} className={`${currentStyle.textColor} flex flex-row items-center gap-1 font-bold text-base uppercase tracking-widest ${currentStyle.textColor2} hover:rounded-full p-2 cursor-pointer transition-colors duration-300`}>Ver Catalogo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z" /></svg></a>
            </div>
        </div>
    )
}