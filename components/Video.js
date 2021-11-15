import Image from "next/image"

export default function Video({ thumbnial }) {
    console.log(thumbnial.url, 'Component');
    // const urlImg = randomVideo(videos).thumbnial.url;
    return (
        <picture className="video-component m-2">

            <Image src={thumbnial.url} alt={thumbnial.title}
                width={300}
                height={230}
                loading="lazy"
                layout="intrinsic"
                quality={95}
            />
        </picture>
    )

}