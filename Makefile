
init: clean
	npm run build
	cp -r ./public ./.next/standalone
	cp -r ./.next/static ./.next/standalone/.next

start:
	cd ./.next/standalone && node server.js

docker:
	docker build --no-cache -t next-dashboard:latest .

docker-start:
	docker run --rm --name nextjs-dashboard -e HOSTNAME=0.0.0.0 -p 3000:3000 next-dashboard:latest

clean:
	rm -rf ./.next