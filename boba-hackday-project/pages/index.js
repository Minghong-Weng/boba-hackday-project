import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import DataManager from "../public/dataManager.js";
import styles from "../styles/Home.module.css";
import BobaShopCard from "../components/BobaShopCard";
import bobaTea from "../public/bubble-tea.jpg";
import mycaseIcon from "../images/mycase.png";

export async function getStaticProps(context) {
  const dataManager = DataManager.getInstance();

  const SD_JSON_DATA = [];
  const IRVINE_JSON_DATA = [];

  for (var i = 0; i < 20; i++) {
    SD_JSON_DATA.push(dataManager.getSDRestaurant(i));
  }

  for (var i = 0; i < 8; i++) {
    IRVINE_JSON_DATA.push(dataManager.getIrvineRestaurant(i));
  }

  const sort_by_key = (data, key) => {
    return data.sort((a, b) => {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  };

  const sortedSDData = sort_by_key(SD_JSON_DATA, "shop_restaurant_mc_score");
  const sortedIrvineData = sort_by_key(
    IRVINE_JSON_DATA,
    "shop_restaurant_mc_score"
  );

  return {
    props: {
      sortedSDData: sortedSDData,
      sortedIrvineData: sortedIrvineData,
    }, // will be passed to the page component as props
  };
}

const dataManager = new DataManager();

export default function Home({ sortedSDData, sortedIrvineData }) {
  const [location, setLocation] = React.useState("San Diego");

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  var currentData;

  if (location == "San Diego") {
    currentData = sortedSDData;
  } else if (location == "Irvine") {
    currentData = sortedIrvineData;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Boba Hack Day</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src={bobaTea} alt="boba tea" width={300} height={300} />
        <h1 className={styles.title}>Boba Hack Day</h1>

        <p className={styles.description}>
          Using natural language processing to give boba shops a more accurate
          rating based on customer reviews.
        </p>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Office Location
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={location}
            onChange={handleChange}
            label="Location"
          >
            <MenuItem value={"San Diego"}>San Diego</MenuItem>
            <MenuItem value={"Irvine"}>Irvine</MenuItem>
          </Select>
        </FormControl>

        <div className={styles.grid}>
          {currentData &&
            currentData.map((shopData, index) => (
              <BobaShopCard
                key={`boba-shop-${index}`}
                bobaShop={shopData}
                location
              />
            ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by MyCase Hackday 2021
          <span className={styles.logo}>
            <Image src={mycaseIcon} alt="MyCase Logo" width={20} height={20} />
          </span>
        </a>
      </footer>
    </div>
  );
}
