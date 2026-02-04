import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react"; // Make sure you installed lucide-react earlier

export default function Journey({ currentStage, data, onNext }) {
    const content = data[currentStage];

    return (
        <div className="journey-container" style={{ borderColor: content.themeColor }}>

            <AnimatePresence mode="wait">
                <motion.div
                    key={content.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="content-wrapper"
                    style={{ width: "100%" }}
                >
                    <div className="tag" style={{ color: content.themeColor, borderColor: content.themeColor }}>
                        {content.location}
                    </div>

                    <div className="frame" style={{ borderColor: content.themeColor }}>
                        <img src={content.img} alt="memory" />

                        <div className="floating-icon">{content.icon}</div>

                        {/* --- DOWNLOAD BUTTON (Only shows if canDownload is true) --- */}
                        {content.canDownload && (
                            <a
                                href={content.img}
                                download={content.downloadName || "memory.jpg"}
                                className="download-btn"
                                title="Save to Gallery"
                            >
                                <Download size={20} color="white" />
                            </a>
                        )}
                    </div>

                    <h1>{content.text}</h1>
                    <p>{content.subtext}</p>

                </motion.div>
            </AnimatePresence>

            <button
                onClick={onNext}
                className="next-btn"
                style={{ color: content.themeColor }}
            >
                NEXT ➜
            </button>
        </div>
    );
}