import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import useAudio from './useAudio';
import BookText from './BookText';
import BookArt from './BookArt';
import BookData from './Book.json'

function Book(props) {

    const book = React.useRef();
    const pageFlipAudio = useAudio('/sound/page_flip.mp3', { volume: 0.02 })
    const [step, setStep] = React.useState(-1);

    const onFlipPage = (event) => {
        if (event.data == "flipping")
            pageFlipAudio.play();
    }

    const nextStep = () => {
        setStep(step + 1);
    }

    React.useEffect(() => {
        switch (step) {
            case 9:
                book.current.pageFlip().flipNext();
                break;
        }
    }, [step])

    return (
        <div className="absolute w-full h-full z-40 top-0 left-0" onClick={nextStep}>
            <HTMLFlipBook ref={book} width={window.innerWidth / 2} height={window.innerHeight} onChangeState={onFlipPage} flippingTime={500} useMouseEvents={false}
                className={`absolute w-full h-full z-40 top-0 bg-cover ${props.className}`} style={{ backgroundImage: 'url("/texture/background-book.jpg")', fontFamily: "Friz Quadrata Std Medium" }}>
                {
                    BookData.pages.map((page, index) => {
                        return <div key={"page-" + index}>
                            <img src={index % 2 == 0 ? "/texture/texture_book_left-transformed.png" : "/texture/texture_book_right-transformed.png"} className="w-full h-full absolute top-0 left-0" />
                            <div className="relative w-full h-full xl:text-base 2xl:text-2xl 1080p:text-3xl text-black drop-shadow-lg ">
                                <div className="absolute w-full h-full grid grid-cols-8 grid-rows-12">
                                    {
                                        page.arts?.map((art, index) => {
                                            return <div style={art.style} key={"art-" + index}>
                                                <BookArt reveal={step >= art.order} sound={art.sound} path={art.path} />
                                            </div>
                                        })

                                    }
                                </div>

                                <div className="absolute w-full h-full grid grid-cols-8 grid-rows-12 p-[5%]">
                                    {
                                        page.texts?.map((text, index) => {
                                            return <div className="flex items-center justify-center" style={{ position: "relative", ...text.style }} key={"topleft-" + index}>
                                                <BookText reveal={step >= text.order} stop={step > text.order} sound={text.sound} text={text.text} from={text.from} coloredLetters={text.coloredLetters} />
                                            </div>
                                        })

                                    }
                                </div>

                            </div>
                        </div>
                    })
                }
            </HTMLFlipBook>
        </div>


    );
}

export default Book