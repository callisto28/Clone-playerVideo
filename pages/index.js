import Image from 'next/image'
import { gql, GraphQLClient } from 'graphql-request';


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
  console.log(videos, 'video');

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  }
  const urlImg = randomVideo(videos).thumbnial.url;



  return (
    <>
      <div className="app">
        <div className="main-video">
          <Image src={urlImg} alt={randomVideo(videos).title} width={1000} height={900} />
        </div>
        <div className="video-feed">

        </div>

      </div>

    </>
  )
}
