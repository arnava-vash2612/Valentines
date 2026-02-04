import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Envelope() {
    const [isOpen, setIsOpen] = useState(false);
    const [showTicket, setShowTicket] = useState(false); // State for the Boarding Pass

    const handleOpen = () => {
        setIsOpen(true);
    };

    const celebrate = (e) => {
        e.stopPropagation();

        // 1. Confetti Explosion
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

        // 2. Haptic Heartbeat (Android only, but safe to include)
        if (navigator.vibrate) {
            navigator.vibrate([100, 100, 100, 800, 100, 100, 100, 800]);
        }

        // 3. Show the Ticket after a delay
        setShowTicket(true);
    };

    return (
        <div className={`envelope-wrapper ${isOpen ? 'open' : ''}`} onClick={handleOpen}>

            <div className="envelope">
                <div className="flap"></div>
                <div className="pocket"></div>

                {/* --- THE LETTER CONTENT --- */}
                <div className="letter">
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                        {/* Header */}
                        <p className="handwriting">My Dearest,</p>

                        {/* Body Text */}
                        <p className="handwriting body-text">
                            From the lonely circuits of UP to the psychology department of Christ, my mind always travels to you.
                            Distance is just a variable, but you are my forever constant.
                        </p>

                        {/* The Question */}
                        <h3 className="handwriting" style={{ margin: '10px 0', fontSize: '1.2rem' }}>Will you be my Valentine?</h3>

                        {/* Buttons (Hide them if ticket is shown to save space) */}
                        {!showTicket && isOpen && (
                            <div className="btn-group">
                                <button onClick={celebrate}>YES</button>
                                <button onClick={celebrate}>Definitely</button>
                            </div>
                        )}

                        {/* --- THE BOARDING PASS (Appears after YES) --- */}
                        {showTicket && (
                            <div style={{
                                marginTop: '10px',
                                borderTop: '2px dashed #ccc',
                                paddingTop: '10px',
                                animation: 'fadeIn 1s'
                            }}>
                                <div style={{ fontSize: '0.8rem', fontFamily: 'Courier New', fontWeight: 'bold', color: '#ff4d6d' }}>
                                    BOARDING PASS: BLR ✈ DEL
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#555', marginTop: '5px' }}>
                                    DATE: ASAP | SEAT: My Heart
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {!isOpen && <p className="click-hint">(Click to Open)</p>}
        </div>
    );
}