# Cribl Stream Assets Lookup

The `cribl_stream_assets` lookup is used by the CriblVision for Splunk app to apply additional context to events:

 * `environment`: An optional field used to distinguish the environment that instances belong to.
 * `instance_type`: The type of Cribl Stream/Edge instance operating on that host.
 * `worker_group`: The Worker Group or Fleet an instance belongs to.

These are used by Alerts and Dashboards to filter content and apply additional context to events.

## Running the Populate Cribl Stream Asset Lookup Report

After installing or upgrading the CriblVision application, run the `Populate Cribl Stream Asset Lookup` Report to repopulate the `cribl_stream_assets` lookup. This can be done by selecting "Populate Cribl Stream Worker Lookup" from the navigation menu. This report is scheduled to run every hour, but can be updated to meet your requirements.

**Note:** When the report is initially run, you may see an error stating that the `cribl_stream_assets.csv` lookup file does not exist. This will not impact the search. Once the search is completed for the first time, the lookup file will be initiated and the results of the search will be written to it.

## Data Sources Used in the Report

The `Populate Cribl Stream Asset Lookup` Report can be run with only the events/metrics from the internal Cribl log/metric Sources, however; this can be inaccurate at times. The REST Collectors defined in the CriblVision for Splunk Pack are used to create events that contain accurate information about each Cribl Stream instance. The Pack defines the following templates that are used in this Report:

 * `cribl_instance_details`: Collects info on Leader/Single Cribl Stream instances (`channel=CriblInstanceDetails`)
 * `cribl_worker_details`: Collects info on Worker/Edge Nodes (`channel=CriblWorkerDetails`)

The report handles mutliple ways of collecting information about Cribl Stream/Edge instances by using the following precedence:

 1. **Collected Values**: The values collected from the `cribl_instance/worker_details` REST Collectors in the CriblVision for Splunk Pack.
 2. **Lookup Values**: The values from the last time the `cribl_stream_assets` lookup was updated.
 3. **Calculated Values**: The values calculated from the internal Cribl log/metric Sources.

## Manually Updating the Cribl Stream Asset Lookup

The values in the `cribl_stream_assets` lookup take precedence over calculated values in the `Populate Cribl Stream Asset Lookup` Report, therefore; these can be manually updated override incorrectly calculated instance information.

It is recommended to use the [Splunk App for Lookup File Editing](https://splunkbase.splunk.com/app/1724) to manually update the `cribl_stream_assets` lookup file.

If updating the `instance_type` or `status` fields expect specific values for filtering in Alerts and Dashboards. If updating either, ensure they are set to on of the following:

 * `instance_type`:
   * `edge`
   * `leader`
   * `managed-edge`
   * `single`
   * `worker` 
 * `status`:
   * `active`
   * `inactive`
   * `missing`
   * `shutdown`

## Setting Instances as Inactive

Instances that are in either a `missing` or `shutdown` state will trigger Missing/Shutdown Asset Alerts if they are enabled. These will continue to trigger while in either state. However, if these entries are removed from the `cribl_stream_assets` lookup then Dashboards that require the `instance_type` field to be set will no longer display data for that instance.

The `inactive` status is used when a instance is known to be missing or shutdown for valid reasons. This status will hide these instances from the `Cribl Stream Assets` Dashboard, but will still be visible in other Dashboards when running historical searches.

There are two methods for updating a instance to be in the `inactive` state:

 1. Manually update the `cribl_stream_assets` lookup (see the section above).
 2. Use the `set to inactive` action via the `Cribl Stream Assets` Dashboard.