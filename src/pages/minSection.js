import React from "react";
import IndexMain from "./indexMain";
import Footer from "./footer";
import ImageCarousel from './ImageCarousel';
import EmergencyContactButton from "./emergencyButton";
import AddSale from "../sale/AddSale";
import "./stylesMinSection.css"

const MinSection = () => {
    return (
        <section>
            <section>
                <IndexMain />
                <ImageCarousel />
                <AddSale />
                <h2>Bienvenido a Macho Baterías</h2>
                <p>Somos una empresa dedicada a proporcionar baterías de alta calidad y servicios de soporte y mantenimiento para satisfacer todas tus necesidades de energía.</p>
                <p>Con Macho Baterías, obtienes:</p>
                <ul>
                    <li>Baterías de calidad para automóviles, motocicletas, equipos industriales y más.</li>
                    <li>Servicios de mantenimiento preventivo y correctivo.</li>
                    <li>Asesoramiento técnico experto para ayudarte a elegir la mejor solución para tus necesidades energéticas.</li>
                    <li>Compromiso con la satisfacción del cliente y la confiabilidad.</li>
                </ul>
                <EmergencyContactButton />

            </section>
            <div>
                <Footer />
            </div >
        </section>
    );


};
export default MinSection;