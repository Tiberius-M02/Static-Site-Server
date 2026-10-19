# Static-Site-Server
The project idea comes from [roadmap.sh](https://roadmap.sh/projects/static-site-server), and its primary objective is to host a simple website using **Nginx** on a Linux server. Completing this project can help you better understand the server hosting process and gain experience using tools like rsync and scp, as well as managing SSH connections.
# The steps I followed making this project
- I had rehabilitate an old laptop by switching its operating system from Windows 7 to **Debian** without a window manager or a root account for better security.
- I modified the network settings to set a static IP address for the laptop form **/etc/network/interfaces**
```Bash
auto wlp3s0
iface wlp3s0 inet static
	address #The static ip of my server
	netmask #The ip mask
	gateway #The gatway ip
	dns-domain #The domain name
	dns-nameservers  8.8.8.8 1.1.1.1

wpa-ssid #The network name 
wpa-psk  #The network password
```
- I installed the openssh-server in order to connect to it via SSH.
```Bash
sudo apt update
sudo apt install openssh-server
sudo systemctl start ssh
```
- For my working computer I generate a key for secured ssh connection.
```Bash
ssh-keygen
ssh-copy-id username@serverip
```
- I installed ufw (Uncomplicated Firewall) and opened port 22 for SSH connections, as well as port 80 for hosting the website.
```Bash
sudo apt update
sudo apt install ufw
sudo systemctl enable --now ufw
sudo ufw allow 22
sudo ufw allow 80
```
- I transferred the [HTML](siteCode/CV.html), [CSS](siteCode/CV.css), and [JS](siteCode/CV.js) files from my main laptop to the server using rsync.
`rsync CV.html CV.js CV.css img.jpg username@serverip:~/site`
- After all that, I installed Nginx and configured it to host the site containing all the previously transferred files.
```Bash
sudo apt install nginx
sudo systemctl start nginx
```
All my code file that I transfer from my computer was moved in the folder `/var/www/CV`
After all that I create a new file in the `/etc/nginx/sites-available` named CV and there I put my nginx configuration
```Bash
server {
	listen 80 default_server; #ipv4
	listen [::]:80 ; #ipV6

	root /var/www/CV; #The folder where html, css, js and jpg are

	index CV.html CV.css CV.js img.jpg; # all the file use for my site

	server_name cv.local; #The server name

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

}
```
The last thing that the site need is to create a linked file in the`/etc/nginx/sites-enable`
```Bash
sudo ln -s /etc/nginx/sites-available/CV /etc/nginx/sites-enabled/ 
sudo systemctl restart nginx
```
