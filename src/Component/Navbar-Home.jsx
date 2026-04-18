import React from 'react';

const NavbarHome = () => {
    return (
        <aside className="fixed left-0 top-0 h-screen w-20 bg-[#030f0f] p-3 z-50 ">
            <div className="w-full h-full bg-[#03624c] rounded-xl flex flex-col justify-between items-center py-6 shadow-[0_0_15px_rgba(34,197,94,0.5)]">

                {/* Logo Vertical */}
                <div className="flex-1 flex items-start justify-center">
                    <a href="/">
                        <h1 className="text-[#f7f4eb] font-black text-xl uppercase tracking-tighter text-vertical">
                            Wolf Motors Hub
                        </h1>
                    </a>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-10 items-center justify-center flex-[2]">
                    <a href="/sobre-nosotros" className="text-[#f7f4eb] font-bold text-xs uppercase tracking-widest hover:text-[#00df82] hover:bg-[#000000] hover:rounded-full p-2 cursor-pointer transition-colors text-vertical">
                        Sobre Nosotros
                    </a>
                </div>

                {/* User Icon (SVG sencillo para que no pese) */}
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
            </div>
        </aside>
    );
};

export default NavbarHome;