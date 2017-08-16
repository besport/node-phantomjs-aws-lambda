.PHONY: deploy test start setup install

# install dependencies (into sub-directory node_modules)
install:
	npm run install 

# generates a skeleton .env file
setup:
	npm run setup

# upload function to AWS; uses values defined in the file .env
deploy: .env
	npm run deploy

# run the user simulation bot locally
start:
	npm run start

# launches the lambda function on AWS; requires authentication data in ~/.aws/credentials
invoke:
	aws lambda invoke --region eu-west-1 --function-name usersim-development --payload "`cat event.json`" --log-type Tail /dev/stdout

invoke-silent:
	aws lambda invoke --region eu-west-1 --function-name usersim-development --payload "`cat event.json`" /dev/null

# keeps alive a pool of "make invoke" instances
pool:
	./pool.sh

test:
	npm run test
