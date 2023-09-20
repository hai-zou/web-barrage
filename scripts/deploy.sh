#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npm run build

# 进入待发布的目录
cd dist

git init
git add -A
git commit -m 'ci: deploy'

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:hai-zou/hai-zou.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:hai-zou/barrage.git main:gh-pages

cd -