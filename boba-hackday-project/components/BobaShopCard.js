import styles from '../styles/Home.module.css'
import { Rating } from '@mui/material';

export default function BobaShopCard({ bobaShop }) {
 return (
     <>
        <div className={styles.card}>
            <h2>{ bobaShop.name }</h2>
            <p className={styles.rating}>
                <span>MyCase Review: </span>
                <Rating 
                    name="mycase-rating" 
                    defaultValue={bobaShop.shop_restaurant_mc_score} 
                    precision={0.1} 
                    readOnly 
            /></p>
            <p className={styles.rating}>
                <span>Yelp Review: </span>
                <Rating 
                    name="yelp-rating" 
                    defaultValue={bobaShop.yelp_rating} 
                    precision={0.1} 
                    readOnly 
                />
            </p>
            <a href={ bobaShop.yelp_url } className={styles.yelpURL}>Visit on Yelp</a>
        </div>
     </>
 )
}
