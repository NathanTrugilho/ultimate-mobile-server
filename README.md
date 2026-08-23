## Development Steps

* **Phase 1: Hardware Setup & Remote Access**
  * Reset device, free up space and disable battery optimizations. ✔
  * Install Termux. ✔
  * Configure SSH access. ✔

* **Phase 2: Networking & Version Control**
  * Set up Git on the device and configure repository. ✔
  * Configure Tailscale for remote access. ✔
  * Deploy a basic web server. ✔

* **Phase 3: Infrastructure & Environment**
  * Set up a database. ✔
  * Establish project directory structure and process management. ✔
  * Configure auto-start on boot/reboot for VPN and SSH server. ✔

* **Phase 4: Security**
  * Evaluate security measures. ✔

* **Phase 5: Application Deployment**
  * Implement application modules. ✔

## Module Development

The application is built using a modular architecture, following an iterative and incremental approach. Each new module is developed using a strict two-step cycle:

1. **Feature Implementation:** Development of business logic (services), controllers, and database integration.
2. **Security Assessment:** Immediate evaluation and mitigation of potential vulnerabilities before moving to the next feature.

## Tech Stack

* **Backend / API:** Node.js (JavaScript / TypeScript)
* **Frontend:** HTML, CSS, JavaScript
* **Database:** SQLite

## Implemented Modules
