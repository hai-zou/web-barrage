#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npm run build

# 进入待发布的目录
cd dist

git init -b main
git checkout --orphan gh-pages
git add .
git commit -m 'ci: deploy'
git remote add origin git@github.com:hai-zou/barrage.git
git push -f origin gh-pages

cd -