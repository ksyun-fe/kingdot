#!/bin/bash
set -e

git checkout master
git merge dev

echo
echo "Current version:" $(grep \"version\" package.json)
if [[ -z $1 ]]; then
  echo "Place enter release version e.g. 1.0.10: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  # build
  VERSION=$VERSION npm run dist

  # commit
  npm version "$VERSION" --message "build: release $VERSION"

  git push

  if [[ -z $RELEASE_TAG ]]; then
    npm publish
  else
    npm publish --tag "$RELEASE_TAG"
  fi
  git push --tags

  npm run demo:build
  git add .
  git commit -m 'build: build docs'
  git push

  git checkout dev
  git rebase master
  git push origin dev

  git checkout master
  sleep 2
  git push https://github.com/ksyun-fe/kingdot.git master

fi
