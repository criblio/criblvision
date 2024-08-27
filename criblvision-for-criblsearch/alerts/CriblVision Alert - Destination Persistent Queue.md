CriblVision Alert - Destination Persistent Queue Initialized

Query

dataset="default_logs" 
| where channel startswith "DestPQ:" and message == "initializing persistent queue"
| extend output = extract("DestPQ:(.*)", 1, channel)
| summarize pq_initialized_count = count() by group, output
| where pq_initialized_count > 1
| project group, output


Alerting instructions
By default, this query is configured to alert if destination PQ has been initiated during the selected timerange. 

You can adjust how often for this check to occur by adjusting the timerange of the search and the scheduling frequency.

Scheduling
Click on schedule and configure it to run every 5 minutes

Notifications
Enable send notifications and configure the when clause to be as follows

Count of results - Greater than - 0

Configure Target for notification

Under Send notification to:
Select your desired target or create a new target out of our supported Targets. (webhook, Pagerduty, Slack, AWS SNS, Email)