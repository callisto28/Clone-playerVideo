import { gql, GraphQLClient } from 'graphql-request';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export const getServerSideProps = async (pageContext) => {
  // console.log(pageContext, '--> pageContext');

  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: process.env.GRAPH_CMS_TOKEN,
    }
  });
  const pageSlug = pageContext.query.slug.toLowerCase();
  // console.log(pageSlug, '--> pageSlug');

  const query = gql`
    query($pageSlug: String!){ 
        video(where: {
            slug: $pageSlug
        }) {
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
      }
    `
  const variables = {
    pageSlug,
  }


  const data = await graphQLClient.request(query, variables)
  // console.log(data, '--> data');
  const video = data.video;
  // console.log(video, '--> video');
  return {
    props: {
      video
    }
  }



}

const changeToSeen = async (slug) => {
  await fetch('/changeToSeen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ slug })
  })

  const Video = ({ video }) => {

    const [watching, setWatching] = useState(false);

    return (
      <>
        {!watching && <Image className="absolute top-0" src={video.thumbnial.url} alt={video.title} layout="fill" />}
        {!watching && <div className="mt-96 ml-32 relative max-w-1 /2">
          <p>{video.tags.join(', ')}</p>
          <p className="text-gray-500">{video.description}</p>
          <p><Link href="/">
            go back
          </Link></p>
          <button className="absolute" onClick={() => {
            changeToSeen(video.slug);
            watching ? setWatching(false) : setWatching(true)
          }}>
            PLAY
          </button>
        </div>}
        {watching && (<video controls width="85%" className="relative left-32">
          <source src={video.mp4.url} type="video/mp4" />
        </video>
        )}
        <div className="info-footer" onClick={() => watching ? setWatching(false) : null}>


        </div>

      </>
    )
  }
}
export default Video;
