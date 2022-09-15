import {ApolloClient, InMemoryCache, gql} from "@apollo/client";

interface Props {
  launches: any[];
}

export default function Launches({launches}: Props) {
  console.log(launches.length);
  return (
    <>
      <h1 style={{marginTop: "5rem"}}>Launches</h1>
      <ul>
        {launches.map(
          ({
            id,
            mission_name,
            launch_date_local,
            launch_site: {site_name_long},
            rocket: {rocket_name},
          }) => {
            const locale =
              typeof window !== "undefined" ? navigator.language : "en-CA";

            const date = new Date(launch_date_local).toLocaleDateString(
              locale,
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            return (
              <li key={id}>
                <ul>
                  <li>Mission: {mission_name}</li>
                  <li>Date: {date}</li>
                  <li>Launch site: {site_name_long}</li>
                  <li>Rocket: {rocket_name}</li>
                </ul>
                <hr />
              </li>
            );
          }
        )}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const randomNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);

  const {data} = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: ${randomNumber}) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  return {
    props: {
      launches: data.launchesPast,
    },
  };
}
