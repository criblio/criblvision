# CriblVision for Splunk

## Getting Started

This CriblVision for Splunk app was designed as a troubleshooting tool and monitoring aid for Cribl administrators. It was created by Cribl Support Engineers to help customers troubleshoot their own Cribl deployments. There are several troubleshooting dashboards tailored to certain product areas in which support has seen the highest number of recurring issues. And while our intent is to help you troubleshoot your own Cribl deployment, this app will always be a continual "work in progress" and should always be used in conjunction with the Cribl Monitoring Console and associated views.

Several Dashboards are provided to aid a Cribl admin in troubleshooting and assessing the health of a Cribl deployment. Every view is equipped with a "How to Use" toggle that reveals a description and instructions for that view. We recommend starting with the Health Check view and selecting a single Worker Group or Worker Node from the provided filters.

### Context is Crucial

In the ancient art of troubleshooting, context is key - whether the problem is of a technical nature, or merely one related to existence itself.

Without a clear understanding of the circumstances surrounding an issue, it becomes challenging to identify the root cause and provide an effective solution. Context provides valuable information about a specific environment, and every environment is unique; when using this app, it is wise to ask yourself the following questions:

* *What is the current issue you are attempting to troubleshoot?*
* *Are there any recent configuration changes that were made before the issue started?*
* *Were there any specific user interactions that may have contributed to the start of the issue? **Example:** Increase in data throughput, new Sources or Destinations, change in architecture, etc.*

Answers to the above questions, and many others, will help narrow down the scope of the investigation, enabling you and your team to focus their efforts on the relevant areas. Additionally, contexts aids in replicating the problem, as it enables Support Engineers to understand the exact conditions under which the issue occurs. Knowledge of the environment, along with the context of use-cases and integrations, and ensure that the troubleshooting process is efficient and accurate.

### Configuration

 * [Configuring CriblVision for Splunk App](https://github.com/criblio/criblvision/blob/main/criblvision-for-splunk/criblvision/readme/configuring_criblvision.md)
 * [Cribl Stream Assets Lookup](https://github.com/criblio/criblvision/blob/main/criblvision-for-splunk/criblvision/readme/cribl_stream_assets_lookup.md)
 * [CriblVision for Splunk Alerts](https://github.com/criblio/criblvision/blob/main/criblvision-for-splunk/criblvision/readme/criblvision_alerts.md)
 * [CriblVision for Splunk Pack](https://github.com/criblio/criblvision/blob/main/criblvision-for-splunk/criblvision/readme/criblvision_for_splunk_pack.md)
 * [Getting Data In](https://github.com/criblio/criblvision/blob/main/criblvision-for-splunk/criblvision/readme/getting_data_in.md)
 * [Troubleshooting](https://github.com/criblio/criblvision/blob/main/criblvision-for-splunk/criblvision/readme/troubleshooting.md)
 * [Upgrading CriblVision for Splunk App](https://github.com/criblio/criblvision/blob/main/criblvision-for-splunk/criblvision/readme/upgrading_criblvision.md)

## About

* **Author:** Johan Woger
* **Co-Authors:** Jeremy Prescott, Martin Prado, David Sheridan, Christopher Owen
* **Honorable Mentions:**
  * George (Trey) Haraksin - For his initial ideas on thruput introspection (check out his other projects at [https://github.com/arcsector](https://github.com/arcsector))
  * Ben Marcus - General Testing.
  * Brendan Dalpe - Guru of many things.
  * Brandon McCombs - General Testing.
  * Chris Owens - General testing and contributor.
