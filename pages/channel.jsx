import React, {Fragment} from 'react'
import HeaderApp from "../components/header";
import Link from "next/link";
import Layout from "../components/Layout";

const API = 'https://api.audioboom.com/channels/';

const Channel = ({channel, audioClips, series}) => {
    return (
        <Layout title={channel.title}>
            <div className="banner" style={{backgroundImage: `url(${channel.urls.banner_image.original})`}}>
                <p>{channel.title}</p></div>
            <div className="grid-container">
                <div className='podcast_column'>
                    <h2>Ultimos Podcasts</h2>
                    {audioClips.map((clip) => (
                        <Link href={`/podcast?id=${clip.id}`} key={clip.id}>
                            <a className='podcast'>
                                <h3>{clip.title}</h3>
                                <div className='meta'>
                                    {Math.ceil(clip.duration / 60)} minutes
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>

                {series.length > 0 &&
                <div className='series_column'>
                    <h2>Subseries</h2>
                    <div className="channels">
                        {series.map((serie) => (
                            <Link href={`/channel?id=${serie.id}`} key={serie.id}>
                                <a className="channel">
                                    <img src={serie.urls.logo_image.original} alt=""/>
                                    <h2>{serie.title}</h2>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
                }
            </div>

            <style jsx>{`
            
                .podcast_column { grid-area: podcast; }
                .series_column { grid-area: series; }
               
                .grid-container {
                  padding: 30px;
                  display: grid;
                  grid-template-areas:
                  'series series series podcast podcast'
                }
    
                .channels {
                  display: grid;
                  grid-gap: 15px;
                  padding: 15px;
                  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                }
                a.channel {
                  display: block;
                  margin-bottom: 0.5em;
                  color: #333;
                  text-decoration: none;
                }
                .channel img {
                  border-radius: 3px;
                  box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                  width: 100%;
                }
              
                h1{
                  font-weight: 600;
                  padding: 15px;
                 }
                h2 {
                  padding: 5px;
                  font-size: 0.9em;
                  font-weight: 600;
                  margin: 0;
                  text-align: center;
                }
              
                .podcast {
                  display: block;
                  text-decoration: none;
                  color: #333;
                  padding: 15px;
                  border-bottom: 1px solid rgba(0,0,0,0.2);
                  cursor: pointer;
                }
                .podcast:hover {
                  color: #000;
                }
                .podcast h3 {
                  margin: 0;
                }
                .podcast .meta {
                  color: #666;
                  margin-top: 0.5em;
                  font-size: 0.8em;
                }
             
              
                .text_link{
                  text-decoration:none;
                  color: black;
                }
              
                .banner {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 200px;
                    background-position: 50% 50%;
                    background-size: cover;
                    background-color: #aaa;
                }
                
                .banner p {
                    font-size: 50px;
                    color: white;
                    font-weight: bold;
                }
        `}</style>


        </Layout>
    );
};

export async function getServerSideProps({query}) {
    let idChannel = query.id;

    try {
        const [reqChannel, reqAudios, reqChilds] = await Promise.all([
            fetch(`${API}${idChannel}`),
            fetch(`${API}${idChannel}/audio_clips`),
            fetch(`${API}${idChannel}/child_channels`),
        ]);
        const {body: {channel}} = await reqChannel.json();
        const {body: {audio_clips}} = await reqAudios.json();
        const {body: {channels}} = await reqChilds.json();
        return {props: {channel: channel, audioClips: audio_clips, series: channels}};
    } catch ({message}) {
        return (message);
    }

}

export default Channel