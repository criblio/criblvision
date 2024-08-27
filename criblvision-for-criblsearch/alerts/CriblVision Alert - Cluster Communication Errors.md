CriblVision Alert - Cluster Communication Errors

dataset="default_logs" 
| where channel == "clustercomm" and (level == "warn" or level == "error") and not(message startswith "metric")
| summarize cluster_communication_errors = count() by host, group
| where cluster_communication_errors > 10
| project host, group, cluster_communication_errors

Alerting instructions
By default, this query is configured to alert if a worker node is having communication issues with its leader.

You can adjust how often for this check to occur by adjusting the timerange of the search and the scheduling frequency.

Scheduling
Click on schedule and configure it to run every 1 hour (or to your liking)

Notifications
Enable send notifications and configure the when clause to be as follows

Count of results - Greater than - 0

Configure Target for notification

Under Send notification to:
Select your desired target or create a new target out of our supported Targets. (webhook, Pagerduty, Slack, AWS SNS, Email)