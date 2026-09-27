# Static-Site-Server
The project idea comes from [roadmap.sh](https://roadmap.sh/projects/static-site-server), and its primary objective is to host a simple website using **Nginx** on a Linux server. Completing this project can help you better understand the server hosting process and gain experience using tools like rsync and scp, as well as managing SSH connections.
# The steps I followed making this project
- I had rehabilitate an old laptop by switching its operating system from Windows 7 to **Debian** without a window manager or a root account for better security.
- I modified the network settings to set a static IP address for the laptop... (Aici scriu ce am editat in ce fisier si ce am scris)
- I installed the OpenSSH server (I think) in order to connect to it via SSH.
- I installed ufw (Uncomplicated Firewall) and opened port 22 for SSH connections, as well as port 80 for hosting the website.
- I transferred the HTML, CSS, and JS files from my main laptop to the server using rsync.
- After all that, I installed Nginx and configured it to host the site containing all the previously transferred files.
