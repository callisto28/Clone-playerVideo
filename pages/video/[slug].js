import { gql, GraphQLClient } from 'graphql-request';

export const getServerSideProps = async (pageContext) => {
    console.log(pageContext, '--> pageContext');

    // const url = process.env.ENDPOINT;
    // const graphQLClient = new GraphQLClient(url, {
    //     headers: {
    //         authorization: process.env.GRAPH_CMS_TOKEN,
    //     }
    // });
    const pageSlug = pageContext.query.slug;
    console.log(pageSlug, '--> pageSlug');

    // const query = gql`
    // query  {
    //     videos(where:  {
    //       slug: 
    //       createdAt
    //       id
    //       title
    //       description
    //       seen
    //       slug
    //       tags
    //       thumbnial {
    //         url
    //       }
    //       mp4 {
    //         url
    //       }
    //     }
    //   }
    // `
    // const variables = {
    //     pageSlug,
    // }


    // const data = await graphQLClient.request(query, variables)

    // const video = data.videos;

    // return {
    //     props: {
    //         video
    //     }
    // }

}


export default function Video({ video }) {
    console.log(video, 'video final');
    return (
        <div>

        </div>
    )

}