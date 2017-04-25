# A helper makefile for split master and gh-pages deployment 

BRANCH=gh-pages
BUILD_DIR=build
DEPLOY_DIR=deploy
API_SERVER="https://authplz.herokuapp.com"

VERSION=$(shell git describe --dirty)
MESSAGE="Publishing $(VERSION) to gh-pages"

build:
	@echo "------- Build -------"
	@REACT_APP_API_SERVER=$(API_SERVER) npm run-script build
	@cp CNAME $(BUILD_DIR)/
	@echo "------- /Build -------"

publish: build
ifneq (,$(findstring dirty,$(VERSION)))
	@echo "Working tree is dirty, please commit before publishing"
else
	@echo "------- Publish -------"
	@cp -r $(BUILD_DIR)/* $(DEPLOY_DIR)
	@echo "Adding files"
	@cd $(DEPLOY_DIR) && git add -f ./* && cd ..
	@echo "Creating commit"
	@cd $(DEPLOY_DIR) &&  git commit -m $(MESSAGE) && cd ..
	@echo "Pushing new commit"
	@cd $(DEPLOY_DIR) &&  git push origin $(BRANCH) && cd ..
	@echo "------- /Publish -------"
endif

setup:
	@echo "------- Setup -------"
	@git clone git@github.com:ryankurte/authplz-ui.git -b gh-pages --depth 1 $(DEPLOY_DIR)/
	@echo "------- /Setup -------"

clean:
	@rm -rf $(BUILD_DIR)/*

.PHONY: build clean setup publish
