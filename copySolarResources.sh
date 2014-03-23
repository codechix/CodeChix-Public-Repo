#!/bin/sh
echo "**---- copying solarInstallsByZipMap..."
cp /home/lhurley/git/netflix/pytheas/gradle-solardata/pytheas-solardata/src/main/resources/solarInstallsByZipMap/* /home/lhurley/git/netflix/pytheas/gradle-solardata/pytheas-solardata/build/resources/main/solarInstallsByZipMap/.

echo "**--- copying solarInstallsByCountyMap..."
cp /home/lhurley/git/netflix/pytheas/gradle-solardata/pytheas-solardata/src/main/resources/solarInstallsByCountyMap/* /home/lhurley/git/netflix/pytheas/gradle-solardata/pytheas-solardata/build/resources/main/solarInstallsByCountyMap/.

echo "**--- copying csvmap..."
cp /home/lhurley/git/netflix/pytheas/gradle-solardata/pytheas-solardata/src/main/resources/csvmap/* /home/lhurley/git/netflix/pytheas/gradle-solardata/pytheas-solardata/build/resources/main/csvmap/.

echo "**-- copying mapViz.js"
cp /home/lhurley/git/netflix/pytheas/gradle-solardata/pytheas-core/src/main/resources/js/mapViz/mapViz.js /home/lhurley/git/netflix/pytheas/gradle-solardata/pytheas-core/build/resources/main/js/mapViz/mapViz.js
echo "**--- done"
