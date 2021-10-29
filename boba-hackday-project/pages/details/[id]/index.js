import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Grid from '@mui/material/Grid'

import yelpIcon from '../../../images/yelp.png'
import mycaseIcon from '../../../images/mycase.png'

import styles from '../../../styles/Home.module.css'
import DataManager from '../../../public/dataManager'
import ReviewCard from '../../../components/reviewCard.js'


const Details = () => {
  const router = useRouter()
  const { id } = router.query

  const data = DataManager.getRestaurant(id);

  return (
    <Container>
      <Head>
        <title>MyCase Boba Review - {data.name}</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href={data.yelp_url}>{data.name}</a>
        </h1>
        <Box className={styles.reviewbox}>
          <span className={styles.logo}>
            <Image src={yelpIcon} alt="yelp icon" width={30} height={30} />
          </span>
          <Rating value={data.yelp_rating} readOnly />

          <span className={styles.logo}>
            <Image src={mycaseIcon} alt="mycase icon" width={25} height={25} />
          </span>
          <Rating value={data.mycase_score} readOnly />
        </Box>
        <Grid container justifyContent='center'>
          {data.reviews.map((review, index) => (
              <ReviewCard
                key={index}
                review={review}
              />
            ))}
        </Grid>
      </main>
    </Container>
  )
}

export default Details
