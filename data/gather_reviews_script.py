# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from lxml.html import fromstring
import urllib.request
import requests
from bs4 import BeautifulSoup, SoupStrainer
import time
# Import pandas
import pandas as pd

#Import numpy
import numpy as np

# Import stopwords
import nltk
#nltk.download('stopwords')
from nltk.corpus import stopwords

import json
import sys


# Import textblob
from textblob import Word
from textblob import TextBlob
#nltk.download('wordnet')

url1 = 'https://www.yelp.com/biz/sharetea-san-diego-13'

url = 'https://www.yelp.com/biz/sharetea-san-diego-13?start=0'

isSdFlag = False



def getHTMLdocument(url):
      
    # request for HTML document of given url
    response = requests.get(url)
      
    # response will be provided in JSON format
    return response.text
  

    
# assign required credentials
# assign URL
def get_proxies():

    url_to_scrape = "https://free-proxy-list.net/"

    # create document
    html_document = response = requests.get(url_to_scrape).text
    soup = BeautifulSoup(html_document, 'html.parser')

    divs = soup.findAll("table", {"class": "table table-striped table-bordered"})
    proxies = set()
    for div in divs:
        tbodies = ''
        tbodies = div.findAll('tbody')
        for tbody in tbodies:
            rows = ''
            rows = div.findAll('tr')
            count = 0
            for row in rows:
                count += 1
                if count == 1:
                    continue
                
                td = ''
                td = row.findAll('td')[0]
                proxies.add(td.text)
    return proxies

proxies = (get_proxies())

# get boba urls

sd_urls = [
    'https://www.yelp.com/biz/sharetea-san-diego-13',
    'https://www.yelp.com/biz/gotcha-tea-san-diego',
    'https://www.yelp.com/biz/dayungs-tea-convoy-san-diego',
    'https://www.yelp.com/biz/chakaa-tea-house-san-diego',
    'https://www.yelp.com/biz/r-and-b-tea-san-diego-2',
    'https://www.yelp.com/biz/kung-fu-tea-san-diego',
    'https://www.yelp.com/biz/luxe-boba-and-teaco-san-diego-2',
    'https://www.yelp.com/biz/camellia-rd-tea-bar-san-diego-3',
    'https://www.yelp.com/biz/boba-bar-and-desserts-san-diego-2',
    'https://www.yelp.com/biz/tan-cha-san-diego',
    'https://www.yelp.com/biz/go-heart-tea-bar-san-diego',
    'https://www.yelp.com/biz/happy-lemon-san-diego-2',
    'https://www.yelp.com/biz/gong-cha-san-diego',
    'https://www.yelp.com/biz/the-korean-rose-san-diego',
    'https://www.yelp.com/biz/mngo-cafe-san-diego',
    'https://www.yelp.com/biz/vivi-bubble-tea-san-diego-2',
    'https://www.yelp.com/biz/matcha-cafe-maiko-san-diego',
    'https://www.yelp.com/biz/sharetea-san-diego-2',
    'https://www.yelp.com/biz/its-boba-time-san-diego-san-diego',
    'https://www.yelp.com/biz/boba-bar-and-desserts-san-diego'
]

irv_urls = [
    'https://www.yelp.com/biz/presotea-irvine-irvine-3',
    'https://www.yelp.com/biz/ola-cha-costa-mesa',
    'https://www.yelp.com/biz/sunright-tea-studio-diamond-jamboree-center-irvine',
    'https://www.yelp.com/biz/hntea-organic-tea-house-harvard-ave-irvine-10',
    'https://www.yelp.com/biz/feng-cha-teahouse-costa-mesa-4',
    'https://www.yelp.com/biz/ding-tea-irvine-irvine-4',
    'https://www.yelp.com/biz/leaf-n-cream-tustin-4',
    'https://www.yelp.com/biz/boba-guys-costa-mesa',
    'https://www.yelp.com/biz/pink-pig-irvine',
    'https://www.yelp.com/biz/boba-junkie-santa-ana-santa-ana',
    #'https://www.yelp.com/biz/cha-for-tea-irvine-9',
    #'https://www.yelp.com/biz/sharetea-santa-ana-2',
    #'https://www.yelp.com/biz/tastea-irvine-10',
    #'https://www.yelp.com/biz/boba-square-tustin-18',
    #'https://www.yelp.com/biz/sharetea-irvine-3'
    #'https://www.yelp.com/biz/orobae-irvine',
    #'https://www.yelp.com/biz/omomo-tea-shoppe-irvine',
    #'https://www.yelp.com/biz/eightfold-tea-shoppe-costa-mesa-2',
    #'https://www.yelp.com/biz/milk-and-honey-costa-mesa?',
    #'https://www.yelp.com/biz/cherubic-tea-irvine-7'
]

# get reviews function

def get_raw_review_data(url):


    proxy = urllib.request.ProxyHandler({'https': proxies})
    opener = urllib.request.build_opener()
    website = opener.open(url)
    
    html = website.read()
    soup = BeautifulSoup(html, "html.parser")
    
    review=[]
    divs = soup.findAll("div", {"class": "review__373c0__3MsBX border-color--default__373c0__1WKlL"})
    for div in divs:
        spans = div.findAll("span", {"class": "raw__373c0__tQAx6"})
        for span in spans:
            review.append(span)
    
    new_review = list(filter(None, review))
    
    
    
    reviews_clean = []
    for i in new_review:
        new_i = str(i).replace('<span class="raw__373c0__tQAx6" lang="en">','')
        new_i = new_i.replace('</span>','')
        new_i = new_i.replace('<br/>','')
        new_i = new_i.replace('<br>','')
        new_i = new_i.replace('[','')
        new_i = new_i.replace(']','')
        new_i = new_i.replace('\xa0','')
        new_i = new_i.replace('\'','')
        
        reviews_clean.append(new_i)
        
    return reviews_clean
    

list_of_restaurants = []

def convert_star_rating_to_val(star_rating):
    rating_parts = star_rating.split(" ")
    return float(rating_parts[0])

restaurant_num = 1
print("Generating Boba Shops...")

def generateBobaShopsList():
    return sd_urls if isSdFlag else irv_urls

for url in generateBobaShopsList():
    
    new_dict = {}
    hasProcessed = False
    
    print("Getting name of Boba Shop...")
    
    while hasProcessed == False:
    
        proxy = urllib.request.ProxyHandler({'https': proxies})
        opener = urllib.request.build_opener()
        website = opener.open(url)
        
        html = website.read()
        soup = BeautifulSoup(html, "html.parser")
        
        #yelp rating
        
        
        # get name
        headers =soup.findAll("h1", {"class": "css-m7s7xv"})
        if len(headers) == 0:
            continue
    
        
        new_dict["shop_name"] = headers[0].text
        
        # yelp url
        new_dict["yelp_url"] = url
        break
    
    # reviews
    
    url_reviews = []
    url_ratings = []
    count = 0
    cycles = 0
    print("Getting Actual Reviews...")
    while cycles < 2:
        new_url = url + '?start=' + str(count)
        temp = get_raw_review_data(new_url)
        review_num = len(temp)
        
        #if request fails do it again
        if len(temp) == 0:
            continue
    
        
        sub_count = 0
        
        proxy = urllib.request.ProxyHandler({'https': proxies})
        opener = urllib.request.build_opener()
        website = opener.open(new_url)
        
        html = website.read()
        soup = BeautifulSoup(html, "html.parser")
        
        yelp_ratings = soup.select('div[class*="i-stars"]')
        
        if len(yelp_ratings) <= 0:
            continue
        
        for EachPart in yelp_ratings:
            rating = EachPart['aria-label']
            
            if sub_count == 0:
                new_dict["yelp_rating"] = convert_star_rating_to_val(rating)
            else:
                url_ratings.append(convert_star_rating_to_val(rating))
            sub_count+=1
            if sub_count == (review_num + 1):
                break
        
        
        if(len(temp) > 0):
            url_reviews.extend(temp)
        
        else:
            break
        
        count+=10
        cycles+=1
    
    new_dict["reviews"] = url_reviews
    new_dict["yelp_ratings"] = url_ratings
    
    list_of_restaurants.append(new_dict)
    print("Finished Restaurant " + str(restaurant_num))
    restaurant_num+=1

def avg_word(review):
    words = review.split()
    return (sum(len(word) for word in words) / len(words))


# prepare data
id = 0

data = {
        "data": []
}
for shop in list_of_restaurants:
    
    new_object = {}
    
    if (len(shop["yelp_ratings"])) != len(shop["reviews"]):
        continue
    
    new_object["id"] = id
    new_object["name"] = shop["shop_name"]
    new_object["yelp_url"] = shop["yelp_url"]
    new_object["yelp_rating"] = shop["yelp_rating"]
    new_object["reviews"] = []
    
    df = pd.DataFrame(np.array(shop["reviews"]), columns=['review'])
    df['word_count'] = df['review'].apply(lambda x: len(str(x).split(" ")))
    df['char_count'] = df['review'].str.len()
    df['avg_word'] = df['review'].apply(lambda x: avg_word(x))
    stop_words = stopwords.words('english')
    df['stopword_coun'] = df['review'].apply(lambda x: len([x for x in x.split() if x in stop_words]))
    
    df['review_lower'] = df['review'].apply(lambda x: " ".join(x.lower() for x in x.split()))
    df['review_nopunc'] = df['review_lower'].str.replace('[^\w\s]', '')
    df['review_nopunc_nostop'] = df['review_nopunc'].apply(lambda x: " ".join(x for x in x.split() if x not in stop_words))
    freq= pd.Series(" ".join(df['review_nopunc_nostop']).split()).value_counts()[:30]
    other_stopwords = [   'get', 'us', 'see', 'use', 'said', 'asked', 'day', 'go' \
                          'even', 'ive', 'right', 'left', 'always', 'would', 'told', \
                          'get', 'us', 'would', 'get', 'one', 'ive', 'go', 'even', \
                          'also', 'ever', 'x', 'take', 'let' ]
    df['review_nopunc_nostop_nocommon'] = df['review_nopunc_nostop'].apply(lambda x: "".join(" ".join(x for x in x.split() if x not in other_stopwords)))
    
    # Lemmatize final review format
    df['cleaned_review'] = df['review_nopunc_nostop_nocommon']\
    .apply(lambda x: " ".join([Word(word).lemmatize() for word in x.split()]))
    
    df['polarity'] = df['cleaned_review'].apply(lambda x: TextBlob(x).sentiment[0])
    df['subjectivity'] = df['cleaned_review'].apply(lambda x: TextBlob(x).sentiment[1])
    df['mycase_score'] = df['polarity'].apply(lambda x: (float(x) + 1 ) * 2.5 )
    df['yelp_rating'] = shop["yelp_ratings"]
    
    average = df['mycase_score'].sum() / len( df['mycase_score'])
    new_object["shop_restaurant_mc_score"] = average
    
    
   

    result = df.to_json(orient="records")
    parsed = json.loads(result)
    
    for df_object in parsed:
        review_object = {}
        review_object["text"] = df_object["review"]
        review_object["mycase_score"] = df_object["mycase_score"]
        review_object["yelp_rating"] = df_object["yelp_rating"]
        new_object["reviews"].append(review_object)
        
    data["data"].append(new_object)
    id+=1
    
json_object = json.dumps(data, indent = 4)
file_name = "data.json" if isSdFlag else "irvine.json"
with open(file_name, "w") as outfile:
        outfile.write(json_object)
