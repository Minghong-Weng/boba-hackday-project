import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import styles from "../styles/Home.module.css";
import yelpIcon from "../images/yelp.png";
import mycaseIcon from "../images/mycase.png";

export default function reviewCard({ review }) {
  return (
    <Grid item container xs={5}>
      <Grid container className={styles.reviewcard} direction="column">
        <Grid item container xs={2} direction="column">
          <Grid item xs={6} align="center">
            <span className={styles.icon}>
              <Image src={yelpIcon} alt="yelp" width={25} height={25} />
            </span>
            <Rating value={review.yelp_rating} readOnly />
          </Grid>
          <Grid item xs={6}>
            <span className={styles.icon}>
              <Image src={mycaseIcon} alt="mycase" width={20} height={20} />
            </span>
            <Rating value={review.mycase_score} readOnly />
          </Grid>
        </Grid>
        <Grid item container xs={9} className={styles.reviewtext}>
          <Typography>{review.text}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
