import { gql, GraphQLClient } from 'graphql-request';

export const getServerSideProps = async (pageContext) => {
    console.log(pageContext, '--> pageContext');

    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            authorization: process.env.GRAPH_CMS_TOKEN,
        }
    });
    const pageSlug = pageContext.query.slug.toLowerCase();
    console.log(pageSlug, '--> pageSlug');

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
    console.log(data, '--> data');
    const video = data.video;
    console.log(video, '--> video');
    return {
        props: {
            video
        }
    }

}


export default function Video({ video }) {
    console.log(video, '--> video');
    return (
        <div>

        </div>
    )

}