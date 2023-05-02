//all routes
import { MongoClient, ObjectId } from "mongodb";

import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetails";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <div>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
      <h3>Your product </h3>
    </div>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://welcome:ggooggle.com@nodeexpressprojects.q24wpej.mongodb.net/next?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const results = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: false,
    paths: results.map((result) => ({
      params: { meetupId: result._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetUpId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://welcome:ggooggle.com@nodeexpressprojects.q24wpej.mongodb.net/next?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const resulted = await meetupsCollection.findOne({
    _id: new ObjectId(meetUpId),
  });

  console.log(meetUpId);

  return {
    props: {
      meetupData: {
        id: resulted._id.toString(),
        title: resulted.title,
        address: resulted.address,
        image: resulted.image,
        description: resulted.description,
      },
    },
  };
}

export default MeetupDetails;
