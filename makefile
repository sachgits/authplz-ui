# Helper to build AuthPlz frontend files

build:
	@echo "Building frontend packages"
	@./node_modules/webpack/bin/webpack.js --config webpack.config.js --progress --profile --colors


install:
	@echo "Installing webpack dependencies"
	@npm install

