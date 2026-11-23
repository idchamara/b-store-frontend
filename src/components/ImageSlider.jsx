import { useState } from "react"

export default function ImageSlider(props) {
    const images = props.images
    const [activeImage, setActiveImage] = useState(images[0])

    return(
        <div className="w-full h-full flex justify-center items-center ">
            <div className="w-[90%] aspect-square relative">
                <img src={activeImage} className="w-full h-full object-cover" />
                <div className=" w-full h-[85px] absolute bottom-0 left-0 flex justify-center items-center backdrop-blur-3xl">
                    {
                        images.map(
                            (image, index) => {
                                return(
                                    <img key={index} src={image} 
                                    className="h-full aspect-square mx-[5px] cursor-pointer"
                                    onClick= {() => {setActiveImage(image)}}
                                    />
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}