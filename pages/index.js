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
  console.log(videos, "videos");
  return (
    <div >
      Bonjour
    </div>
  )
}
