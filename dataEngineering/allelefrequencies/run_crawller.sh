#!/bin/sh
 
RED='\033[0;31m'
NC='\033[0m' # No Color
META="$1" # country, region, ethnic, sample_year


if [ "$META" = "country" ] || [ "$META" = "region" ] || [ "$META" = "ethnic" ] || [ "$META" = "sample_year" ] ; then
  
  echo "[$META]"

  echo "Crawlling Meta"
  node crawllerMeta.js $META

  echo "Crawlling Allele"
  node crawllerAllele.js $META

  echo "merge Allele data"
  node mergeAllele.js $META

  echo "out data: ./out/$META.json"
  prettyjson ./out/$META.json | head
else
  echo "$RED[ Error ]"
  echo "meta input is country, region, ethnic, sample_yea only... $NC"
fi


