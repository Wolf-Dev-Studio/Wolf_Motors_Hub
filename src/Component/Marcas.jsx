import LogoFord from '../assets/USA/LogoFord.webp';
import LogoDodge from '../assets/USA/LogoDodge.webp';
import LogoChevrolet from '../assets/USA/LogoChevrolet.webp';
import LogoCadillac from '../assets/USA/LogoCadillac.webp';
import LogoShelby from '../assets/USA/LogoShelby.webp';

export default function Marcas(props) {

    const { variant } = props;

    const stylesConfig = {
        americanos: {
            Fondo: "bg-[#121212]",
            border: "border-2 border-[#F5F5F5] rounded-lg",
            textColor: "text-[#F5F5F5]",
            textMarca: "text-[#B22222]",
            Marca1: "Ford",
            Marca2: "Dodge",
            Marca3: "Chevrolet",
            Marca4: "Cadillac",
            Marca5: "Shelby",
        },
        europeos: {
            Fondo: "bg-[#F5F6FA]",
            textColor: "text-[#00CEC9]",
            Img1: "",
            Img2: "",
            Img3: "",
            Img4: "",
            Img5: "",
        },
        asiaticos: {
            Fondo: "bg-[#DFE6E9]",
            textColor: "text-[#2D3436]",
            Img1: "",
            Img2: "",
            Img3: "",
            Img4: "",
            Img5: "",
        }
    };

    const currentStyle = stylesConfig[variant];

    return (
        <div className={`${currentStyle.Fondo} py-5 sm:py-16`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className={`text-center text-lg/8 font-semibold ${currentStyle.textColor}`}>Algunas de las Marcas Disponibles</h2>
                <div className="mr-auto ml-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <h2 className={`text-center text-lg/8 font-semibold ${currentStyle.textMarca} ${currentStyle.border}`}>{currentStyle.Marca1}</h2>
                    <h2 className={`text-center text-lg/8 font-semibold ${currentStyle.textMarca} ${currentStyle.border}`}>{currentStyle.Marca2}</h2>
                    <h2 className={`text-center text-lg/8 font-semibold ${currentStyle.textMarca} ${currentStyle.border}`}>{currentStyle.Marca3}</h2>
                    <h2 className={`text-center text-lg/8 font-semibold ${currentStyle.textMarca} ${currentStyle.border}`}>{currentStyle.Marca4}</h2>
                    <h2 className={`text-center text-lg/8 font-semibold ${currentStyle.textMarca} ${currentStyle.border}`}>{currentStyle.Marca5}</h2>
                </div>
            </div>
        </div>
    )
}