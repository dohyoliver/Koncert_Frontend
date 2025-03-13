import { useState, useEffect } from "react";
import axios from "axios";

interface Concert {
    id: number;
    fellepo: string;
    kezdesi_ido: string;
    idotartam: number;
    elmarad_e: boolean;
}

function Koncert() {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleDelay = async (id: number) => {
        try {
            const response = await axios.patch(`http://localhost:3000/koncert/${id}`, {
                elmarad_e: true
            });
            if (response.status !== 200) {
                throw new Error("A koncert elhalasztása nem sikerült.");
            }
            setConcerts((prevConcerts) =>
                prevConcerts.map((concert) =>
                    concert.id === id ? { ...concert, elmarad_e: true } : concert
                )
            );
            setSuccessMessage("A koncert sikeresen elhalasztva.");
            setError(null);
        } catch (err) {
            setError(`${err} A koncert elhalasztása nem sikerült.`);
            setSuccessMessage(null);
        }
    };

    useEffect(() => {
        const fetchConcerts = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/koncert");
                if (response.status !== 200) {
                    throw new Error("A koncertek betöltése nem sikerült.");
                }
                setConcerts(response.data);
            } catch (err) {
                setError(`${err} A koncertek betöltése nem sikerült.`);
            } finally {
                setLoading(false);
            }
        };

        fetchConcerts();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <h2>Koncertek </h2>
                {loading && <p>Koncertek betöltése...</p>}
                
               
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                
            
                {error && <p style={{ color: "red" }}>{error}</p>}

                {concerts.length === 0 && !loading && <p>Nincsenek koncertek</p>}
                {concerts.map((concert) => (
                    <div className="col-sm-4 col-md-4 col-lg-4 mb-4 border" key={concert.id}>
                        <h2>{concert.fellepo}</h2>
                        <p>Kezdés: {concert.kezdesi_ido}</p>
                        <p>Időtartam: {concert.idotartam} perc</p>
                        <p>Státusz: {concert.elmarad_e ? "Elmarad" : "Beütemezve"}</p>
                        <br />
                        <button
                            onClick={() => handleDelay(concert.id)}
                            className={`btn mb-3 ${concert.elmarad_e ? 'btn-secondary' : 'btn-primary'}`}
                            disabled={concert.elmarad_e}  
                        >
                            {concert.elmarad_e ? "Elmarad" : "Jelöld elmaradásra"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Koncert;
