import Image from 'next/image'
import { gql, GraphQLClient } from 'graphql-request';
import Section from '../components/Section';



export const getStaticProps = async () => {

  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: process.env.GRAPH_CMS_TOKEN,
    }
  });



  const query = gql`
query {
  videos {
    createdAt
    id
    title
    description
    seen
    slug
    tags
    thumbnial {
      url
    }
    mp4 {
      url
    }
  }
}`

  const data = await graphQLClient.request(query);
  const videos = data.videos;

  return {
    props: {
      videos,
    }
  };
}




export default function Home({ videos }) {
  // console.log(videos, 'video');

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  }
  const urlImg = randomVideo(videos).thumbnial.url;
  const filteVideo = (video, genre) => {
    return video.filter((videos) => videos.tags.includes(genre))
  }

  const useVdeo = (videos) => {
    return videos.filter(video => video.seen === false || video.seen === null)
  }

  return (
    <>
      <div className="app m-5">
        <div className="main-video mb-12">
          <Image src={urlImg} alt={randomVideo(videos).title} width={18}
            height={9}
            layout="responsive"
            priority={true}
            quality={85} />
        </div>
        <div className="video-feed">
          <Section genre={'Video for you'} video={useVdeo(videos)} />
          <Section genre={'Family'} video={filteVideo(videos, 'Family')} />
          <Section genre={'Classic'} video={filteVideo(videos, 'Classic')} />
          <Section genre={'Thriller'} video={filteVideo(videos, 'Thriller')} />
          <Section genre={'Pixar'} video={filteVideo(videos, 'Pixar')} />
          <Section genre={'Marvel'} video={filteVideo(videos, 'Marvel')} />
          <Section genre={'National Geographic'} video={filteVideo(videos, 'National Geographic ')} />
          <Section genre={'Disney'} video={filteVideo(videos, 'Disney')} />
          <Section genre={'Star Wars'} video={filteVideo(videos, 'Star Wars')} />
        </div>

      </div>

    </>
  )
}
