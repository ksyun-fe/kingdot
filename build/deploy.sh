#! /bin/sh
rm -rf ../temp_web
mkdir -p ../temp_web/docs
git clone git@github.com:GoldenDecade/kingdot.git ../temp_web/docs
cp -r examples/dist/* ../temp_web/docs
cd ../temp_web/docs
git add -A
commitInfo='docs: '$1;
git cm -m $commitInfo
git push origin master
rm -rf ../temp_web
