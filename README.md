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
- I installed the openssh-server in order to connect to it via SSH.<br>
`sudo apt update` <br>
`sudo apt install openssh-server`<br>
`sudo systemctl start ssh`
- For my working computer I generate a key for secured ssh connection.<br>
`ssh-keygen`<br>
`ssh-copy-id username@serverip`
- I installed ufw (Uncomplicated Firewall) and opened port 22 for SSH connections, as well as port 80 for hosting the website.<br>
`sudo apt update`<br>
`sudo apt install ufw`<br>
`sudo systemctl start ssh`<br>
`sudo ufw allow 22`<br>
`sudo ufw allow 80`
- I transferred the HTML, CSS, and JS files from my main laptop to the server using rsync.
- After all that, I installed Nginx and configured it to host the site containing all the previously transferred files. (The configuration of the file can be view in here
