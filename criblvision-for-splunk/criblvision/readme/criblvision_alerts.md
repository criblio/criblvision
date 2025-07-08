# CriblVision for Splunk Alerts

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