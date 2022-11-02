import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Title from "../Dashboard/Title";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import blogPlaceholder from "../../images/blog-placeholder.png";
import CircleIcon from "@mui/icons-material/Circle";
import Typography from "@mui/material/Typography";
import RSSParser from "rss-parser";

function convertNewsDate(pubDate){
    var date = new Date(pubDate);
    var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    return months[date.getMonth()] + ", " + date.getDate() + " " + date.getFullYear();
}

function preventDefault(event) {
    event.preventDefault();
}

function getFeaturedImage(content){
    let doc = new DOMParser().parseFromString(content, 'text/html');
    let image = doc.querySelector('div') !== null;
    if(image){
        return doc.querySelector('div').textContent;
    }else{
        return blogPlaceholder;
    }
}

const NewsList = () => {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        let parser = new RSSParser();
        parser.parseURL(`https://puredesire.ziplinestaging.com/feed/`, function (err, feed) {
            if (err) throw err;
            feed = feed.items.filter((i, index) => (index < 3));
            console.log(feed);
            setFeed(feed)
        })
    }, []);

    return (
        <Paper
            sx={{
                pt: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                textAlign: 'left',
            }}

            className="blogPreview"
        >
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Title>News, Blog & Podcasts</Title>
                </Grid>
                {feed.map((item, i) => (
                <Grid item xs={12} sm={4}>
                    <img src={getFeaturedImage(item.content)} alt="" style={{marginBottom:'10px'}}/>

                    <span className="small gray inlineBlock">
                                    <strong>{item.creator} {item.thumbnail}</strong>
                                </span>
                    <span className="separator">
                                    <CircleIcon />
                                </span>
                    <span className="small gray inlineBlock">
                                    <strong>{convertNewsDate(item.pubDate)}</strong>
                                </span>

                    <div className="flexWrap alignCenter spaceBetween">
                        <Typography variant="h3">{item.title}</Typography>
                        <Link href={item.link} className="button-link outline" sx={{ml:2}}>
                            Read More
                        </Link>
                    </div>
                </Grid>
                ))}
                {/*<Grid item xs={12} sm={4}>*/}
                {/*    <img src={blogPlaceholder} alt="" style={{marginBottom:'10px'}}/>*/}

                {/*    <span className="small gray inlineBlock">*/}
                {/*                    <strong>Trevor Winsor</strong>*/}
                {/*                </span>*/}
                {/*    <span className="separator">*/}
                {/*                    <CircleIcon />*/}
                {/*                </span>*/}
                {/*    <span className="small gray inlineBlock">*/}
                {/*                    <strong>June 16, 2022</strong>*/}
                {/*                </span>*/}

                {/*    <div className="flexWrap alignCenter spaceBetween">*/}
                {/*        <Typography variant="h3">5 Healthy Practices for Dads</Typography>*/}
                {/*        <Link className="button-link outline" sx={{ml:2}}>*/}
                {/*            Read More*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*</Grid>*/}

                {/*<Grid item xs={12} sm={4}>*/}
                {/*    <img src={blogPlaceholder} alt="" style={{marginBottom:'10px'}}/>*/}

                {/*    <span className="small gray inlineBlock">*/}
                {/*                    <strong>Trevor Winsor</strong>*/}
                {/*                </span>*/}
                {/*    <span className="separator">*/}
                {/*                    <CircleIcon />*/}
                {/*                </span>*/}
                {/*    <span className="small gray inlineBlock">*/}
                {/*                    <strong>June 16, 2022</strong>*/}
                {/*                </span>*/}

                {/*    <div className="flexWrap alignCenter spaceBetween">*/}
                {/*        <Typography variant="h3">5 Healthy Practices for Dads</Typography>*/}
                {/*        <Link className="button-link outline" sx={{ml:2}}>*/}
                {/*            Read More*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*</Grid>*/}
            </Grid>
        </Paper>
    );
};

export default NewsList;
