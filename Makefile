DC = docker-compose
DC_FRONT = $(DC) exec front

package_name:
	@$(eval PACKAGE_NAME := $(shell read -p "add packages: " NAME; echo $$NAME))

yarn:
	$(DC_FRONT) yarn

yarn_add: package_name
	$(DC_FRONT) yarn add $(PACKAGE_NAME)

yarn_remove: package_name
	$(DC_FRONT) yarn remove $(PACKAGE_NAME)

yarn_add_dev: package_name
	$(DC_FRONT) yarn add -D $(PACKAGE_NAME)

generate:
	$(DC_FRONT) yarn generate

lint:
	$(DC_FRONT) yarn fix

build:
	${DC_FRONT} yarn build

preview:
	${DC_FRONT} yarn preview --debug