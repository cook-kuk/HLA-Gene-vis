#!/bin/sh
 
META="$1" # country, region, ethnic, sample_year

node crawllerMeta.js $META
node crawllerAllele.js $META