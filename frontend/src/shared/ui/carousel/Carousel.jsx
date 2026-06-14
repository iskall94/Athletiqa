import { useRef,useState} from "react";
import { ArrowButton } from "../arrow-button";


// Horizontal scroll row and nav arrows that scroll the container.
// Pass cards as children. Pass `scrollAmount` to control how far each
// click scrolls (default 300px).
function Carousel({ children, className = "", scrollAmount = 300 }) {
    const scrollRef = useRef(null);
      const [activeArrowButton, setActiveArrowButton] = useState(null);
    const scroll = (direction) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
                {children}
            </div>
            <div className="flex gap-2 mt-6">

                <ArrowButton
                direction="left"
                id="previous-campaign"
                onClick={() => scroll("left")}
                aria-label="Föregående"
                activeButton={activeArrowButton}
                setActiveButton={setActiveArrowButton}
              />
              <ArrowButton
                direction="right"
                id="next-campaign"
                onClick={() => scroll("right")}
                aria-label="Nästa"
                activeButton={activeArrowButton}
                setActiveButton={setActiveArrowButton}
              />


             
        

            </div>
        </div>
    );
}

export default Carousel;