# CriblVision

## Upgrading to Version 3.x

Version 3.x of the CriblVision app introduces a new Cribl Stream asset lookup to replace the previous Worker Group lookup. This will cause dashboards to behave unexpectedly until the cutover to the new lookup is made. If you are upgrading from version 2.x of CriblVision then the following steps will be required to make this cutover:

1. Install version 3.x of CriblVision
2. Run the CriblVision setup age again:
    1. From the **Apps** dropdown, select **Manage Apps**
    2. Selected the **Set up** action for CriblVision
    3. Follow the instructions on the setup page
3. Run the **Populate Cribl Stream Assets Lookup** report by either:
    * Clicking the button on the landing page 
    * Clicking the link in the navigation bar
4. Double check that any alerts that were enabled are still enabled

If there are issues after completing these steps, you may need to clear your browser cache to clear cached scripts in Splunk. Clear the browser cache and follow from instructions from step 2 onwards.

If installing the app through other methods, refer to the documentation below on how to configure the app and update your configuration accordingly.

## Getting Started

This Splunk app was designed as a troubleshooting tool and monitoring aid for Cribl administrators. It was created by Cribl Support Engineers to help customers troubleshoot their own Cribl deployments. There are several troubleshooting dashboards tailored to certain product areas in which support has seen the highest number of recurring issues. And while our intent is to help you troubleshoot your own Cribl deployment, this app will always be a continual "work in progress" and should always be used in conjunction with the Cribl Monitoring Console and associated views.

### Context is Crucial

In the ancient art of troubleshooting, context is key - whether the problem is of a technical nature, or merely one related to existence itself.

Without a clear understanding of the circumstances surrounding an issue, it becomes challenging to identify the root cause and provide an effective solution. Context provides valuable information about a specific environment, and every environment is unique; when using this app, it is wise to ask yourself the following questions:
 * *What is the current issue you are attempting to troubleshoot?*
 * *Are there any recent configuration changes that were made before the issue started?*
 * *Were there any specific user interactions that may have contributed to the start of the issue? **Example:** Increase in data throughput, new Sources or Destinations, change in architecture, etc.*

Answers to the above questions, and many others, will help narrow down the scope of the investigation, enabling you and your team to focus their efforts on the relevant areas. Additionally, contexts aids in replicating the problem, as it enables Support Engineers to understand the exact conditions under which the issue occurs. Knowledge of the environment, along with the context of use-cases and integrations, and ensure that the troubleshooting process is efficient and accurate.

### Configuration

This app and its associated dashboards rely on a few components which you must configure.

*Note:* On your initial entry into the application after it has been installed, you should be prompted to navigate to the setup page which will guide you through configuring the required macros. Once the `Save Configuration` button is pressed, the macro definitions will be saved, and automatic lookups will be created off the back of the provided sourcetype(s) to automatically enrich events with the Worker Group of the Worker Node from which that event came. If you are wanting to manually configure these (or you run into errors executing the setup page), the following instructions can be followed. You may experience errors when deploying this app within a Search Head Cluster or when changing the name of the app from `criblvision` to something else. For information on deploying to a Search Head Cluster, refer to Splunk's documentation [here](https://docs.splunk.com/Documentation/Splunk/9.2.0/DistSearch/PropagateSHCconfigurationchanges#Deploy_a_configuration_bundle).

#### Logs and Metrics

Cribl internal logs and metrics must be enabled and forwarded to Splunk in order for all of the panels to populate with events. Refer to the documentation [here](https://docs.cribl.io/stream/sources-cribl-internal/#configuring-cribl-internal-logsmetrics-as-a-datasource) for instructions on configuring this Source. Be sure to configure a corresponding index and sourcetype field for logs and a corresponding index for metrics.

#### Macros

This app ships with 4 macros which must be edited in accordance with your Splunk index naming schema. For more info on configuring macros, reference Splunk's documentation [here](https://docs.splunk.com/Documentation/SplunkCloud/9.0.2303/Knowledge/Definesearchmacros).

|Macro Name|Macro Description|
|----------|-----------------|
|`set_cribl_internal_log_index`|Set this macro definition to the index you configured for your Cribl logs.|
|`set_cribl_log_sourcetype`|Set this macro definition to the sourcetype you configured for Cribl logs.|
|`set_cribl_metrics_index`|Set this macro definition to the index your configured for Cribl metrics.|
|`set_cribl_metrics_prefix(1)`|Change the `cribl.logstream` value before `.$metric_name$` if you have changed the default namespace used for your Cribl metrics internal Source.|

For manual configuration of the macro definitions through the CLI, append and update the following to `$SPLUNK_HOME/etc/apps/criblvision/local/macros.conf` on standalone Search Heads or `$SPLUNK_HOME/etc/shcluster/apps/criblvision/local/macros.conf` on Search Head Deployers for a Search Head Cluster:

```
[set_cribl_internal_log_index]
definition = index=cribl_logs

[set_cribl_log_sourcetype]
definition = sourcetype IN (cribl)

[set_cribl_metrics_index]
definition = index=cribl_metrics

[set_cribl_metrics_prefix(1)]
definition = cribl.logstream.$metric_name$
```

#### Leader Logs

Some of the view in this app will require Leader logs to be forwarded to Splunk. In distributed Cribl Stream environments, Leader logs are currently *NOT* sent via our internal Source. You will have to install a Cribl Edge Node on your Leader Node and configure local log collection via a file monitor input. Configure the file monitor input to collect logs by configuring the filename modal to `/opt/cribl/log/*`. For more information on how to deploy a Cribl Edge Node, please refer to our documentation [here](href="https://docs.cribl.io/edge/deploy-planning">).

#### Populate Cribl Stream Worker Lookup Report

After installing or upgrading the CriblVision application, run the `Populate Cribl Stream Worker Lookup` Report to repopulate the `cribl_stream_workers` lookup. This can be done by selecting "Populate Cribl Stream Worker Lookup" from the navigation menu. This report is scheduled to run every hour, but can be updated to meet your requirements.

**Note:** When the report is initially run, you may see an error stating that the `cribl_stream_workers.csv` lookup file does not exist. This will not impact the search. Once the search is completed for the first time, the lookup file will be initiated and the results of the search will be written to it.
            
#### Automatic Lookups

This app uses an automatic lookup to enrich events with the Worker Group (the `worker_group` field) on events from a Worker Node in a distributed environment. For more on automatic lookups, see Splunk's documentation [here](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/DefineanautomaticlookupinSplunkWeb).

When configuring an automatic lookup from the Splunk UI, ensure that the following values are set before clicking the `Save` button:

 * **Lookup table**: `cribl_stream_workers`
 * **Apply to:** `sourcetype`
 * **named:** Your Cribl log sourcetype *Note:* You cannot use wildcards in this definition
 * **Lookup input fields:** `worker` = `host`
 * **Lookup output fields:** `worker_group` = `worker_group`

 For manual configuration of the automatic lookup definiton(s) through the CLI, append and update the following stanza to `$SPLUNK_HOME/etc/apps/criblvision/local/props.conf` on standalone Search Heads or `$SPLUNK_HOME/etc/shcluster/apps/criblvision/local/props.conf` on Search Head Deployers for a Search Head Cluster:

```
[your_sourcetype]
LOOKUP-cribl_stream_workers = cribl_stream_workers worker AS host OUTPUTNEW worker_group AS worker_group`</pre>
```

If you are using multiple sourcetypes for your internal Cribl logs and would like to use a wildcarded props definition over configuring multiple automated lookups, you can use the following stanza template:

```
[(?::){0}your_wildcarded_sourcetype]
```

### Alerts

This app ships with a number of disabled alerts that can be used to alert when issues in your Cribl Stream environment arise. These alerts take advantage of macros that can be utilized to tweak the alert triggers to better reflect your Cribl Stream environment. The alerts all come with default Splunk's default scheduling configured and no alert actions. The scheduling should be configured for each alert you plan to enable. For more on scheduling alerts, please reference Splunk's documentation [here](https://docs.splunk.com/Documentation/Splunk/latest/Alert/Definescheduledalerts). Fore more on configuring alert actions, please reference Splunk's documentation [here](https://docs.splunk.com/Documentation/Splunk/9.2.0/Alert/Setupalertactions).

|Macro Name|Related Alert(s)|Description|
|----------|----------------|-----------|
|set_alert_ignored_destinations|No Output From Destinations, Unhealthy Destinations|A list of Destinations that should not trigger alerts|
|set_alert_ignored_sources|No Input From Sources, Unhealthy Sources|A list of Sources that should not trigger alerts|
|set_alert_lower_limit_unhealthy_memory_usage_mb|RSS Memory Usage Within Threshold|The lower limit of the threshold when alerts for memory usage (in MB) should trigger|
|set_alert_threshold_backpressure|Destinations Experiencing Backpressure|The threshold of backpressure messages received (for a Worker Group + Worker) before the alert should trigger|
|set_alert_threshold_blocked_destinations|Blocked Destinations|The threshold of blocked Destination messages received (for a Worker Group + Destination) before the alert should trigger|
|set_alert_threshold_cluster_communication_errors|Blocked Destinations|The threshold of cluster communcation error messages received (for a Worker Group + Worker) before the alert should trigger|
|set_alert_threshold_no_destination_thruput_pct|No Output From Destinations|The threshold of times a Destination has not sent any events (for a Worker Group + Destination) before the alert should trigger|
|set_alert_threshold_no_source_thruput_pct|No Input From Sources|The threshold of times a Source has not received any events (for a Worker Group + Source) before the alert should trigger|
|set_alert_threshold_unhealthy_cpu_usage_pct|CPU Usage Over Threshold|The threshold of times a host has reported above the unhealthy CPU percentage threshold (for a Worker Group + Worker) before the alert should trigger|
|set_alert_threshold_unhealthy_destinations_pct|Unhealthy Destinations|The threshold of times a Destination has reported as being unhealthy (for a Worker Group + Destination) before the alert should trigger|
|set_alert_threshold_unhealthy_memory_usage_mb_pct|RSS Memory Usage Within Threshold|The threshold of times a host has reported memory usage within the unhealthy threshold (for a Worker Group + host) before the alert should trigger|
|set_alert_threshold_unhealthy_sources_pct|Unhealthy Sources|The threshold of times a Source has reported as being unhealthy (for a Worker Group + Source) before the alert should trigger|
|set_alert_threshold_worker_process_restarts|Worker Proces Restarted|The threshold of times a host has reported Worker Process restarts (for a Worker Group + host) before the alert should trigger|
|set_alert_unhealthy_cpu_usage_pct|CPU Usage Over Threshold|The threshold at which a host's CPU usage is deemed to be unhealthy|
|set_alert_upper_limit_unhealthy_memory_usage_mb|RSS Memory Usage Within Threshold|The upper limit of the threshold when alerts for memory usage (in MB) should trigger|

</table>

### Using This App

In addition to this overview page, this app provides several views intended to aid a Cribl admin in troubleshooting and assessing the health of a Cribl deployment. Every view is equipped with a "How to Use" toggle that reveals a description and instructions for that view. We recommend starting with the Health Check view and selecting a single Worker Group or Worker Node from the provided filters.
            
## About

* **Author:** Johan Woger 
* **Co-Authors:** Jeremy Prescott, Martin Prado, David Sheridan, Christopher Owen 
* **Honorable Mentions:** George (Trey) Haraksin - For his initial ideas on thruput introspection (check out his other projects at [https://github.com/arcsector](https://github.com/arcsector)) 
* Ben Marcus - General Testing. 
* Brendan Dalpe - Guru of many things.
* Brandon McCombs - General Testing.
* Chris Owens - General testing and contributor. 
