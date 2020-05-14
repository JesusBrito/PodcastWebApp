import React from 'react'
import Link from "next/link";
import Layout from "./Layout";


const ChannelGrid = ({channels}) => {
    return (
        <div className="channels">
            {channels.map(channel => (
                <Link href={`/channel?id=${channel.id}`} key={channel.id}>
                    <a className="channel" >
                        <img src={channel.urls.logo_image.original} alt=""/>
                        <h2>{channel.title}</h2>
                    </a>
                </Link>
            ))}

            <style jsx>{`

          .channels {
            display: grid;
            grid-gap: 30px;
            padding: 20px;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }

          .channel {
            display: block;
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
            margin-bottom: 0.5;
            text-decoration:none;
            color: black;
            background-color: white;
          }

          .channel img {
            width: 100%;
          }

          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}</style>
        </div>
    );
};


export default ChannelGrid