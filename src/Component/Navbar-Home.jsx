import React from 'react';

const NavbarHome = () => {
    return (
        <aside className="fixed left-0 top-0 h-screen w-20 bg-[#0a0a0a] p-3 z-50">
            <div className="w-full h-full bg-[#d4d4d4] rounded-xl flex flex-col justify-between items-center py-6 shadow-xl">

                {/* Logo Vertical */}
                <div className="flex-1 flex items-start justify-center">
                    <h1 className="text-black font-black text-xl uppercase tracking-tighter"
                        style={{ writingMode: 'vertical-rl' }}>
                        Wolf Motor
                    </h1>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-10 items-center justify-center flex-[2]">
                    <button className="text-black font-bold text-xs uppercase tracking-widest hover:text-blue-600 transition-colors"
                        style={{ writingMode: 'vertical-rl' }}>
                        Nosotros
                    </button>
                    <button className="text-black font-bold text-xs uppercase tracking-widest hover:text-blue-600 transition-colors"
                        style={{ writingMode: 'vertical-rl' }}>
                        Contacto
                    </button>
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