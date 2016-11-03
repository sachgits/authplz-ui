# Helper to build AuthPlz frontend files

WEBPACK_ARGS= --progress --profile --colors

build: clean
	@echo "Building frontend packages"
	@./node_modules/webpack/bin/webpack.js  --config webpack.config.js ${WEBPACK_ARGS}
	@tar -cf authplz-ui.tgz static/*

minified: clean
	@echo "Building minified frontend packages"
	@./node_modules/webpack/bin/webpack.js  --config webpack.production.config.js -p ${WEBPACK_ARGS}
	@tar -cf authplz-ui.min.tgz static/*

install:
	@echo "Installing webpack dependencies"
	@npm install

clean:
	rm -rf static/*

.PHONY: clean