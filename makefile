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

build: setup
	@echo "------- Build -------"
	@rm -rf $(BUILD_DIR)/*
	hugo
	@cp CNAME $(BUILD_DIR)/
	@echo "------- /Build -------"

publish: setup
	@echo "------- Publish -------"
ifneq (,$(findstring dirty,$(VERSION)))
	@echo "Working tree is dirty, please commit before publishing"
else
	@echo "Adding files"
	git -C $(BUILD_DIR) add -f --all
	@echo "Creating commit"
	git -C $(BUILD_DIR) commit -m $(MESSAGE)
	@echo "Pushing new commit"
	git -C $(BUILD_DIR) push origin $(BRANCH)
	@echo "------- /Publish -------"
endif

setup:
	@echo "------- Setup -------"
	@echo "Cleaning $(BUILD_DIR)"
	@rm -rf $(BUILD_DIR)
	@mkdir $(BUILD_DIR)
	@git worktree prune -v
	@rm -rf .git/worktrees/$(BUILD_DIR)
	@echo "Adding worktree"
	@git worktree add -B $(BRANCH) $(BUILD_DIR) origin/$(BRANCH)
	@git worktree list
	@echo "------- /Setup -------"

clean:
	@rm -rf $(BUILD_DIR)
	