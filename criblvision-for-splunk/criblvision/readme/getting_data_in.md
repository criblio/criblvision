# Getting Data In

The majority of the CriblVision for Splunk app can operate with just the Internal Cribl Stream/Edge logs and metrics, however; this can be extended through the use of the CriblVision for Splunk Pack that can be downloaded from the Cribl Packs Dispensery.

It is recommended to use the HTTP Event Collector (HEC) protocol to forward events to Splunk from Cribl Stream. If using the Splunk 2 Splunk (S2S) protocol Destinations, you can view the Splunk S2S Troubleshooting dashboard to troubleshoot issues with potential dropped events or events experiencing subsecond timestamp issues.

## Internal Cribl Stream / Edge Logs and Metrics

Cribl internal logs and metrics must be enabled and forwarded to Splunk in order for the majority of the panels to populate with events. There are a couple of options for collecting them.

### Interal Cribl Logs/Metrics Sources

Refer to the documentation [here](https://docs.cribl.io/stream/sources-cribl-internal/#configuring-cribl-internal-logsmetrics-as-a-datasource) for instructions on configuring these Sources. Be sure to configure a corresponding index and sourcetype field for logs and a corresponding index for metrics.

### Cribl Stream API (Metrics Only)

The Cribl Stream Leader API can return Worker metrics from the Leader Node via the `/api/v1/system/metrics/query` endpoint. For instructions on configuring this, see the documentation in the CriblVision for Splunk Pack.

## Cribl Stream Leader Logs

Some of the views in this app will require Leader logs to be forwarded to Splunk. In distributed Cribl Stream environments, Leader logs are currently *NOT* sent via our internal Source. There are a couple of options for collecting them.

### Cribl Edge Node

You can install a Cribl Edge Node on your Leader Node and configure local log collection via a file monitor input. Configure the file monitor input to collect logs by configuring the search path to `<cribl-root-dir>/log/*` (where `<cribl-root-dir>` is what `$CRIBL_HOME` on your Leader Node evaluates to), depth to `0`, and setting the following filenames in the allowlist:
 * `access.log`
 * `audit.log`
 * `cribl.log`
 * `cribl_stderr.log`
 * `metrics.log`
 * `notifications.log`
 * `search_metrics.log`
 * `ui-access.log`

The following template can be used as a base configuration:

```json
{
  "id": "leader_logs",
  "disabled": false,
  "mode": "manual",
  "interval": 10,
  "filenames": [
    "access.log",
    "audit.log",
    "cribl.log",
    "cribl_stderr.log",
    "metrics.log",
    "notifications.log",
    "search_metrics.log",
    "ui-access.log"
  ],
  "type": "file",
  "path": "<cribl-root-dir>/log",
  "metadata": [
    {
      "name": "index",
      "value": "'cribl_logs'"
    },
    {
      "name": "sourcetype",
      "value": "'Cribl:InternalLogs'"
    }
  ],
  "depth": 0
}
```

For more information on how to deploy a Cribl Edge Node, please refer to our documentation [here](https://docs.cribl.io/edge/deploy-planning). If sending directly to Splunk from the Edge Node, it is recommended to use the HTTP Event Collector (HEC) protocol to forward events to Splunk.

### Cribl Stream Leader API

The Cribl Stream Leader API can return logs from the Leader Node via the `/api/v1/system/logs` endpoint. For instructions on configuring this, see the documentation in the CriblVision for Splunk Pack.

## CriblVision for Splunk Pack Sources

The following data sources are collected via REST Collectors and processed by the CriblVision for Splunk Pack:
 * `channel=CriblInstanceDetails`
 * `channel=CriblWorkerDetails`
 * `channel=git_commit_logs`

See the documentation in the CriblVision for Splunk Pack for configuring these REST Collectors.