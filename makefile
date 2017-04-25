# A helper makefile for split master and gh-pages deployment with Hugo
# See https://gohugo.io/tutorials/github-pages-blog/#deployment-via-gh-pages-branch
# You must run:
# git checkout --orphan gh-pages
# git reset --hard
# git commit --allow-empty -m "Initializing gh-pages branch"
# git push upstream gh-pages
# git checkout master
# prior to using this makefile

BRANCH=gh-pages
BUILD_DIR=build

VERSION=$(shell git describe --dirty)
MESSAGE="Publishing $(VERSION) to gh-pages"

build:
	@echo "------- Build -------"
	npm run-script build
	@cp CNAME $(BUILD_DIR)/
	@echo "------- /Build -------"

publish: clean setup build
	@echo "------- Publish -------"
ifneq (,$(findstring dirty,$(VERSION)))
	@echo "Working tree is dirty, please commit before publishing"
else
	@echo "Adding files"
	git -C $(BUILD_DIR) add -f ./*
	@echo "Creating commit"
	git -C $(BUILD_DIR) commit -m $(MESSAGE)
	@echo "Pushing new commit"
	git -C $(BUILD_DIR) push origin $(BRANCH)
	@echo "------- /Publish -------"
endif

setup:
	@echo "------- Setup -------"
	@git clone git@github.com:ryankurte/authplz-ui.git -b gh-pages --depth 1 build/
	@echo "------- /Setup -------"

clean:
	@rm -rf $(BUILD_DIR)

.PHONY: build clean setup publish
