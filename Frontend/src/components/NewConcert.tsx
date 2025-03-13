import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Concert {
    fellepo: string;
    kezdesi_ido: string;
    idotartam: string;
    elmarad_e: boolean;
}

function NewConcert({ onConcertAdded }: { onConcertAdded: () => void }) {
    const [concert, setConcert] = useState<Concert>({
        fellepo: "",
        kezdesi_ido: "",
        idotartam: "",
        elmarad_e: false,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConcert({
            ...concert,
            [name]: name === "idotartam" ? Number(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Ensure 'kezdesi_ido' is in the correct format
            const formattedConcert = {
                ...concert,
                kezdesi_ido: concert.kezdesi_ido ? new Date(concert.kezdesi_ido).toISOString() : "",
            };
            await axios.post("http://localhost:3000/koncert", formattedConcert);
            setSuccess(true);
            setConcert({ fellepo: "", kezdesi_ido: "", idotartam: "", elmarad_e: false });
            onConcertAdded();
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Hiba történt");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">Új koncert hozzáadása</h1>

                    {success && <div className="alert alert-success">Koncert sikeresen hozzáadva!</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fellepo" className="form-label">Előadó</label>
                            <input
                                type="text"
                                id="fellepo"
                                name="fellepo"
                                className="form-control"
                                placeholder="Előadó neve"
                                value={concert.fellepo}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="kezdesi_ido" className="form-label">Kezdési idő</label>
                            <input
                                type="datetime-local"
                                id="kezdesi_ido"
                                name="kezdesi_ido"
                                className="form-control"
                                value={concert.kezdesi_ido ? concert.kezdesi_ido.slice(0, 16) : ""}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="idotartam" className="form-label">Időtartam (perc)</label>
                            <input
                                type="number"
                                id="idotartam"
                                name="idotartam"
                                className="form-control"
                                placeholder="Időtartam"
                                value={concert.idotartam}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Hozzáadás..." : "Hozzáadás"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewConcert;