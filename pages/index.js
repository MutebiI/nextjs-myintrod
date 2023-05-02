import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";
function HomePage(props) {
  return (
    <div>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="browse a huge list of staff on my page"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://welcome:ggooggle.com@nodeexpressprojects.q24wpej.mongodb.net/next?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const results = await meetupsCollection.find().toArray();
  return {
    props: {
      meetups: results.map((result) => ({
        title: result.title,
        address: result.address,
        image: result.image,
        description: result.description,
        id: result._id.toString(),
      })),
    },
  };
}
export default HomePage;
