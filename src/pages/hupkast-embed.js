import { useEffect, useState } from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import Parser from 'rss-parser';
import axiosClient from "../utils/axios";
import { Spotify } from "react-spotify-embed"


export default function HuPkastPage() {

    const [hupkastRss, setHupkastRss] = useState([]);

    useEffect(() => {
        const parser = new Parser();
        axiosClient.get('https://anchor.fm/s/ebcb0aac/podcast/rss', {
            responseType: 'text'
        }).then((response) => {
            parser.parseString(response.data).then((feed) => {
                console.log(feed);
                setHupkastRss(feed)
            });
        });
    }, []);

    const extractSpotifyId = (url) => {
        console.log(url);
        const regex = /play\/([a-zA-Z0-9]+)$/;
        const match = url.match(regex);
        console.log(match);
        return match ? match[1] : null;
    };

    return (
        <>
            <HeadMeta metaTitle="HuPkast" />
            <HeaderOne />
            <Breadcrumb aPage="HuPkast" />
            <BreadcrumbBanner pageTitle="HuPkast" />
            <div className="axil-about-us section-gap-top p-b-xs-20">
                <div className="container">

                    <iframe
                        src={`https://podcasters.spotify.com/pod/show/hocupozorite/episodes/HuPkast-s01e12-Letnji-festivali--32--BELEF--11--A-N-F-I--teatar-i-11--ekspir-festival-e2m7am9`}
                        width="100%"
                        height="1232"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    ></iframe>
                    <div>
                        {hupkastRss.items?.map(item =>
                        (
                            <>
                                <h2>{item.title}</h2>

                                <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                <p>{item.enclosure && item.enclosure.url && (
                                    <audio controls>
                                        <source src={`${item.enclosure.url}`} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                                </p>
                            </>
                        ))}
                    </div>
                </div>
            </div >

            <FooterOne />
        </>
    )
}