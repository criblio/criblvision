CriblVision Alert - Unhealthy Sources

Query

${set_cribl_metrics_dataset} group="*" host="*"  _metric in ("cribl.logstream.health.inputs") | project _time, _metric, _value, host, group
| where _value > 0 | summarize inputs=values(inputs) by host | mv-expand inputs | render table


Alerting instructions
By default, this query is configured to alert if a source is in an unhealthy state. 

You can adjust how often for this check to occur by adjusting the timerange of the search and the scheduling frequency.

Scheduling
Click on schedule and configure it to run every 5 minutes (or to your liking)

Notifications
Enable send notifications and configure the when clause to be as follows

Count of results - Greater than - 0

Configure Target for notification

Under Send notification to:
Select your desired target or create a new target out of our supported Targets. (webhook, Pagerduty, Slack, AWS SNS, Email)