FROM navidonskis/nginx-php5.6
RUN cat /etc/os-release
#RUN sed -i 's@archive.ubuntu.com@kr.archive.ubuntu.com@g' /etc/apt/sources.list

#RUN apt update
#RUN apt upgrade -y

#RUN apt-cache show php
#RUN apt install php7.3-fpm -y
#RUN apt install php7.3-cli php7.3-curl php7.3-gd php7.3-mysql php7.3-mbstring zip unzip -y
#RUN service php7.3-fpm start
#RUN service php7.3-fpm status
#RUN apt install snapd -y
#RUN apt-get install software-properties-common -y

#RUN add-apt-repository ppa:certbot/certbot
#RUN apt install certbot -y

#RUN certbot certonly --noninteractive --webroot --agree-tos --register-unsafely-without-email -d stories282.shop -w /var/www/html/
#COPY /etc/letsencrypt/options-ssl-nginx.conf /letsencrypt/options-ssl-nginx.conf
#COPY /etc/letsencrypt/ssl-dhparams.pem /letsencrypt/ssl-dhparams.pem
#COPY /etc/letsencrypt/archive/stories282.shop/fullchain1.pem /letsencrypt/fullchain.pem
#COPY /etc/letsencrypt/archive/stories282.shop/privkey1.pem /letsencrypt/privkey.pem
COPY default.conf /etc/nginx/sites-available/default.conf
#COPY info.php /usr/share/nginx/html/info.php
#certbot certonly --noninteractive --webroot --agree-tos --register-unsafely-without-email -d stories282.shop -w /usr/share/nginx/html/
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["/bin/bash", "/cmd.sh"]