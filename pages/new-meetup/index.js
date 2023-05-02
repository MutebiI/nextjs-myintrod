//our-domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import React from "react";
import { useRouter } from "next/router";
import Head from 'next/head'

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>add meetups</title>
        <meta
          name="description"
          content="You can add your data here as a user "
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </div>
  );
}

export default NewMeetupPage;
