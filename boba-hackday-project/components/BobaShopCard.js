import styles from '../styles/Home.module.css'
import { Rating } from '@mui/material';
import Link from 'next/link'

export default function BobaShopCard({ bobaShop }) {
 return (
     <>
        <div className={styles.card}>
            <Link href={`/details/${bobaShop.id}`}>
                <a>
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
                </a>
            </Link>
            <a 
                href={ bobaShop.yelp_url } 
                className={styles.yelpURL} 
                target="_blank" 
                rel="noreferrer"
            >
                Visit on Yelp
            </a>
        </div>
     </>
 )
}
