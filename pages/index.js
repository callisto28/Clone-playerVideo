import Image from 'next/image'
import { gql, GraphQLClient } from 'graphql-request';
import Section from '../components/Section';
import Nav from '../components/Nav';



export const getStaticProps = async () => {

  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: process.env.GRAPH_CMS_TOKEN,
    }
  });



  const videoQuery = gql`
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

  const accountQuery = gql`
    query {
      account
      (where:
        {id: "ckvduu7vsl4vo0b555v8foi0s"})
      {
        username
        avatar {
          url
        }
      }
    }`



  const data = await graphQLClient.request(videoQuery);
  const videos = data.videos;
  const dataAccount = await graphQLClient.request(accountQuery);
  const account = dataAccount.account;

  return {
    props: {
      videos,
      account
    }
  };
}




export default function Home({ videos, account }) {
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
      <Nav account={account} />
      <div className="app m-5">
        <div className="main-video mb-12">
          <Image src={urlImg} alt={randomVideo(videos).title} width={16}
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
