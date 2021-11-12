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
          <Section genre={'Family'} />
          <Section genre={'Classic'} />
          <Section genre={'Thriller'} />
          <Section genre={'Pixar'} />
          <Section genre={'Marvel'} />
          <Section genre={'National Geographic'} />
          <Section genre={'Disney'} />
          <Section genre={'Star Wars'} />
        </div>

      </div>

    </>
  )
}
