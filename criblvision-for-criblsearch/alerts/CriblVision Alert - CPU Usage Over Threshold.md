CriblVision Alert - CPU Usage Over Threshold

Query

dataset="default_logs" | summarize cpu_pct = max(cpuPerc) by bin(TimeGenerated, 1m), host, group
| summarize 
    unhealthy_cpu_usage = countif(cpu_pct > 80),
    total = count() 
    by host, group
| extend unhealthy_cpu_usage_pct = round((unhealthy_cpu_usage * 100.0) / total, 2)
| where unhealthy_cpu_usage_pct > 80
| project host, group, unhealthy_cpu_usage_pct


Alerting instructions
By default, this query is configured to alert if cpu usage for a node goes over 80%. You can adjust this yourself by editing the part of the query unhealthy_cpu_usage = countif(cpu_pct > 80)

Scheduling
Click on schedule and configure it to run every hour

Notifications
Enable send notifications and configure the when clause to be as follows

Count of results - Greater than - 0

Configure Target for notification

Under Send notification to
Select your desired target or create a new target out of our supported Targets. (webhook, Pagerduty, Slack, AWS SNS, Email)