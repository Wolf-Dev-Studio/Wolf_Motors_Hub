import { autos } from "./Data.js";

function MostrarAutos(country, brand, category) {
    const listaBase = autos[country];

    const autosFiltrados = listaBase.filter(auto => {
        const matchBrand = brand === "*" || auto.marca === brand;

        const matchCategory = category === "*" || auto.categoria === category;

        return matchBrand && matchCategory;
    });

    return autosFiltrados;
}

export default MostrarAutos;