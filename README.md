<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 0.543 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Thu Jun 22 2023 10:04:22 GMT-0700 (PDT)
* Source doc: Untitled document
* Tables are currently converted to HTML tables.
----->



## Getting started

This Splunk app was designed as a troubleshooting tool and monitoring aid for Cribl administrators. It was created by Cribl support engineers to help customers troubleshoot their own cribl deployments. There are several troubleshooting dashboards tailored to certain product areas in which support has seen the highest number of recurring issues. And while our intent is to help you troubleshoot your own cribl deployment, this app will always be a continuous ”work in progress” and should always be used in conjunction with the cribl monitoring console and associated views. 

 


### **Context is crucial**

In the ancient art of troubleshooting, context is key - whether the problem is of a technical nature, or merely one related to existence itself.

Without a clear understanding of the circumstances surrounding an issue, it becomes challenging to identify the root cause and provide an effective solution. Context provides valuable information about a specific environment, and every environment is unique; when using this app, it is wise to ask yourself the following questions:



* What is the current issue you are attempting to troubleshoot?
* Are there any recent configuration changes that were made before the issue started?
* Were there any specific user interactions that may have contributed to the start of the issue? Example: Increase in data throughput, new sources or destinations, change in architecture, etc.. 

Answers to the above questions, and many others, will help narrow down the scope of the investigation, enabling you and your team to focus their efforts on the relevant areas. Additionally, context aids in replicating the problem, as it enables Support Engineers to understand the exact conditions under which the issue occurs. Knowledge of the environment, along with all of the context on use-cases and integrations, and ensure that the troubleshooting process is efficient and accurate.

 


### **Configuration**

This app and its associated dashboards rely on a few components which you must configure. Note: v.1.1.0 is intended only for Cribl Stream worker nodes and leaders. Future releases will add dashboards and functionality for Cribl Edge deployment troubleshooting and monitoring. 

 


#### **Logs and Metrics**

 

Cribl internal logs and metrics must be enabled and forwarded to splunk in order for all of the panels to populate with events. Refer the documentation [here](https://docs.cribl.io/stream/sources-cribl-internal/#configuring-cribl-internal-logsmetrics-as-a-datasource) for instructions on configuring this source. Be sure to configure a corresponding index and sourcetype field for logs and a corresponding index field for metrics. 

 


#### **Macros**

 

This app ships with 4 macros which must be edited in accordance with your splunk index naming schema. For more info on configuring macros, reference Splunk’s Documentation [here](https://docs.splunk.com/Documentation/SplunkCloud/9.0.2303/Knowledge/Definesearchmacros).


<table>
  <tr>
   <td>Set_cribl_internal_log_index
   </td>
   <td>Set this macro definition to the index you configured cribl logs.
   </td>
  </tr>
  <tr>
   <td>Set_cribl_log_sourcetype
   </td>
   <td>Set this macro definition to the sourcetype you configured for cribl logs.
   </td>
  </tr>
  <tr>
   <td>Set_cribl_metrics_index
   </td>
   <td>Macro definition for the index you configured for cribl metrics
   </td>
  </tr>
  <tr>
   <td>Set_cribl_metrics_prefix(1)
   </td>
   <td>change the "cribl.logstream" value before .$metric_name$ if you have changed the default namespace used for metrics on your cribl metrics internal source. 
   </td>
  </tr>
</table>


 


#### **Leader logs**

Some of the views in this app will require leader logs to be forwarded on to splunk. In distributed Cribl Stream environments, leader logs are currently NOT sent via our internal source. You will have to install an edge node on your leader node and configure local log collection via a file monitor input. Configure the file monitor input to collect logs by configuring the filename allow list modal to /opt/cribl/log/*.log For more information on how to deploy an edge node, please refer to our documentation [here](https://docs.cribl.io/edge/deploy-planning). Note: When deploying the edge node to your leader node, we recommend having a separate fleet just for this node. Be sure to disable all other inputs on that edge node except for file monitor inputs. 

 
## Using this app

In addition to this overview page, this app provides several views intended to aid a Cribl admin in troubleshooting and assessing the health of a cribl deployment. Every view is equipped with a "how to use" button that reveals a description and instructions for that view when clicked. We recommend starting with the health check view and selecting a single worker node from the host dropdown.

#### **About**

 \
Author: Johan Woger 

Co-Authors: Jeremy Prescott, Martin Prado 

Honorable Mentions: George (Trey) Haraksin - For his initial ideas on thruput introspection (check out his other projects at [https://github.com/arcsector](https://github.com/arcsector)) 

Ben Marcus - General Testing. 

Brendan Dalpe - Guru of many things.

Brandon McCombs - General Testing.

Chris Owens - General testing and contributor. 
