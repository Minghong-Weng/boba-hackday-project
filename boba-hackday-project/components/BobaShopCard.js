import styles from "../styles/Home.module.css";
import { Rating } from "@mui/material";
import Link from "next/link";
import Image from 'next/image';

import yelpIcon from "../images/yelp.png";
import mycaseIcon from "../images/mycase.png";

export default function BobaShopCard({ bobaShop, location }) {
  return (
    <>
      <div className={styles.card}>
        <Link href={`/details/${bobaShop.id}?location=${location}`}>
          <a>
            <h2>{bobaShop.name}</h2>
            <p className={styles.rating}>
              <div className={styles.flex}>
                <div className={styles.translate}>
                  <Image src={mycaseIcon} alt="mycase icon" width={22} height={20} />
                </div>
                MyCase Rating
              </div>
              <Rating
                name="mycase-rating"
                defaultValue={bobaShop.shop_restaurant_mc_score}
                precision={0.1}
                readOnly
              />
            </p>
            <p className={styles.rating}>
              <div className={styles.flex}>
                <div className={styles.translate}>
                  <Image src={yelpIcon} alt="yelp icon" width={24} height={24} />
                </div>
                Yelp Rating
              </div>
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
          href={bobaShop.yelp_url}
          className={styles.yelpURL}
          target="_blank"
          rel="noreferrer"
        >
          Visit on Yelp
        </a>
      </div>
    </>
  );
}
