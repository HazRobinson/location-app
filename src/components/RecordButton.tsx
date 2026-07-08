import { useState } from "react";
import "../pages/RecordButton.css";

type Coords = {
    lat: number;
    lng: number;
    accuracy: number;
};

export default function RecordButton() {
    const [coords, setCoords] = useState<Coords | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [recording, setRecording] = useState(false);

    const captureLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported in this browser.");
            return;
        }

        setRecording(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                });

                setError(null);
                setRecording(false);
            },
            (err) => {
                setError(err.message);
                setRecording(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    return (
        <>
            <button
                type="button"
                className="record-button"
                aria-label="Capture GPS Location"
                aria-pressed={recording}
                onClick={captureLocation}
            >
                <span
                    className={`record-button_inner ${
                        recording ? "is-recording" : ""
                    }`}
                />
            </button>

            {coords && (
                <p>
                    {coords.lat}, {coords.lng} (±{coords.accuracy}m)
                </p>
            )}

            {error && <p>{error}</p>}
        </>
    );
}