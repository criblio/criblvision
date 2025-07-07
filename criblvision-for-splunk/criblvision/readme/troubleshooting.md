# Troubleshooting the CriblVision for Splunk App

CriblVision for Splunk is a community-supported Splunk Add-on. If you have any questions or queries, please reach out in the #criblvision [Community Slack](https://cribl-community.slack.com/) channel.

## Missing Events

This app can function with just the logs/metrics from the Cribl Internal log/metric Sources, but it does use data collected from other sources to aid in accurate reporting. See the `Getting Data In` page for all the data sources used and how they are collected.

## Potential for Duplicate Fields

The way the logs from the Internal Cribl Stream Log Source are formatted can result in fields getting extracted twice: once and index-time fields and again as search-time fields. This results in some fields at search-time being multi-value fields with duplicate data in them. This can be diagnosed by selecting a common field like channel from the Interesting Fields list and checking if the total percentage adds up to over 100%.

The following props have been included to work around this:
```conf
[source::cribl]
AUTO_KV_JSON = false
```
This configuration will stop Splunk from parsing the fields at search-time for any event with the cribl source (the default source from the Internal Cribl Stream Logs Source). This will still allow internal logs collected via other means (e.g., an Edge Node on an Leader Node, the CriblStream for Splunk Pack) to extract fields at search-time, as they will not have the same source value.

## Accurate Representation with Metrics

When comparing the results in CriblVision with the Monitoring Console in Cribl Stream, there can be some discrepancies in the accuracy between the two. By default, the Internal Cribl Stream Metrics Source rolls up metrics with the cribl_metrics_rollup Pipeline. To have the results in CriblVision match more closely with the Monitoring Console, update the Pre-Processing Pipeline on the Cribl Metrics Source to be the passthru Pipeline.