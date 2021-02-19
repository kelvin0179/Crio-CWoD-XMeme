# XMeme

### [Public Frontend HyperLink](https://mohitjaiswalxmeme.netlify.app)

### [Public Backend HyperLink](https://xmeme.mohitjaiswal.studio/memes) 


## Local Run Backend

* To run the Backend locally on Port `8080` and `8081`

```bash
cd Backend
npm install && npm run server
cd..
```

## Backend Deployment

* Create an EC-2 instance in Aws on Ubuntu 18.
* Associate it with an Elastic IP.
* Clone your App.
* Install Dependencies on Server.

### PM2 Server

```bash
cd Backend
sudo npm i pm2 -g
pm2 start server.js
pm2 startup ubuntu
```

* You should now be able to access your app using your IP and port. Now we want to setup a firewall blocking that port and setup NGINX as a reverse proxy so we can access it directly using port 80 (http)

### Setup UFW Firewall

```bash
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

### Install NGINX and configure

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

* The Comments should be sufficient to guide you.

```bash
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo service nginx restart
```

### Add SSL with LetsEncrypt

```bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

## Local Run Frontend

* To run the Frontend locally on Port `3000`

```bash
cd Frontend
yarn install && yarn start
```

## Frontend Deployment

* To Deploy on Netlify

```bash
npm run build
npm install netlify-cli -g
netlify login
netlify deploy --dir=public --prod
```




