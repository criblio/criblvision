CriblVision Alert - Worker Process Restarted

Query

dataset="default_logs" 
| where message == "restarting worker process"
| summarize worker_process_restarts = count() by host, instance_type, worker_group
| where worker_process_restarts > 10
| project host, instance_type, worker_group, worker_process_restarts

Alerting instructions
By default, this query is configured to alert if restarts for a node goes over 10 for the selected timerange. You can adjust this yourself by editing the part of the query worker_process_restarts > 10

Scheduling
Click on schedule and configure it to run every hour

Notifications
Enable send notifications and configure the when clause to be as follows

Count of results - Greater than - 0

Configure Target for notification

Under Send notification to
Select your desired target or create a new target out of our supported Targets. (webhook, Pagerduty, Slack, AWS SNS, Email)