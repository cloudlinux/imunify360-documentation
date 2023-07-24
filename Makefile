.PHONY: dev static init clean build

# run development server (SPA)
dev:
	yarn docs:dev

# build static assets
build:
	yarn docs:build

# run static server
static:
	python3 -m http.server -d docs/.vuepress/dist

# delete static assets
clean:
	rm -rf docs/.vuepress/dist

# install dependencies
init:
	yarn
