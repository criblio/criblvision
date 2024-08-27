CriblVision Alert - RSS Memory Usage

Query

dataset="default_logs" | where message == "_raw stats"
| summarize mem_rss = max(mem.rss) by bin(_time, 1m), host, group
| summarize 
    unhealthy_memory_rss_usage_events = countif(mem_rss > 1700)
    by host, group



Alerting instructions
By default, this query is configured to alert if mem usage for a node goes over 1.7GB. You can adjust this yourself by editing the part of the query countif(mem_rss > 1700)

Scheduling
Click on schedule and configure it to run every hour

Notifications
Enable send notifications and configure the when clause to be as follows

Count of results - Greater than - 0

Configure Target for notification

Under Send notification to
Select your desired target or create a new target out of our supported Targets. (webhook, Pagerduty, Slack, AWS SNS, Email)