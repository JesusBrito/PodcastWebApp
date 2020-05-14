import 'isomorphic-fetch';
import React from "react";
import Link from 'next/link'
import HeaderApp from "../components/header";
import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
const API = 'https://api.audioboom.com/channels/recommended';

const MainPodcasts = ({channels}) => {

    return (
        <Layout title="Podcasts">
            <ChannelGrid channels={channels}/>
        </Layout>
    )
};

export async function getServerSideProps() {
    let req = await fetch(API);
    let {body: channels} = await req.json();
    return {props: {channels: channels}};
}

export default MainPodcasts