import Video from "./Video";

export default function Section({ genre, video }) {
    console.log(video, 'videos Section');
    return (

        <div className={"section"}>
            <h3 className="font-bold uppercase">{genre}</h3>
            <div className="video-feed">
                {video.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Video thumbnial={video.thumbnial} />
                    </a>
                ))}


            </div>
        </div>
    )

}