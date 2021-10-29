import Link from 'next/link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Grid from '@mui/material/Grid'

import styles from '../styles/Home.module.css'
import yelpIcon from '../images/yelp.png'
import mycaseIcon from '../images/mycase.png'

export default function reviewCard({ review }) {
 return (
    <Grid item xs={5} className={styles.reviewcard}>
        <div>
            <span className={styles.icon}>
                <Image src={yelpIcon} alt="yelp icon" width={25} height={25} />
            </span>
            <Rating value={review.yelp_rating} readOnly />
        </div>
        <div>
            <span className={styles.icon}>
                <Image src={mycaseIcon} alt="mycase icon" width={25} height={25} />
            </span>
            <Rating value={review.mycase_score} readOnly />
        </div>
        <div item xs={12} className={styles.reviewtext}>
            <ListItemText primary={review.text} />
        </div>
    </Grid>
 )
}
