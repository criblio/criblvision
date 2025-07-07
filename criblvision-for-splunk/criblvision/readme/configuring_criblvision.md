# Configuration

This app and its associated dashboards rely on a few components which you must configure.

*Note:* On your initial entry into the application after it has been installed, you should be prompted to navigate to the setup page which will guide you through configuring the required macros. Once the `Save Configuration` button is pressed, the macro definitions will be saved, and automatic lookups will be created off the back of the provided sourcetype(s) to automatically enrich events with the Worker Group of the Worker Node from which that event came. If you are wanting to manually configure these (or you run into errors executing the setup page), the following instructions can be followed. You may experience errors when deploying this app within a Search Head Cluster or when changing the name of the app from `criblvision` to something else. For information on deploying to a Search Head Cluster, refer to Splunk's documentation [here](https://docs.splunk.com/Documentation/Splunk/latest/DistSearch/PropagateSHCconfigurationchanges#Deploy_a_configuration_bundle).

## Macros

This app ships with 4 macros which must be edited in accordance with your Splunk index naming schema. For more info on configuring macros, reference Splunk's documentation [here](https://docs.splunk.com/Documentation/SplunkCloud/latest/Knowledge/Definesearchmacros).

|Macro Name|Macro Description|
|----------|-----------------|
|`set_cribl_internal_log_index`|Set this macro definition to the index you configured for your Cribl logs.|
|`set_cribl_log_sourcetype`|Set this macro definition to the sourcetype you configured for Cribl logs.|
|`set_cribl_metrics_index`|Set this macro definition to the index your configured for Cribl metrics.|
|`set_cribl_metrics_prefix(1)`|Change the `cribl.logstream` value before `.$metric_name$` if you have changed the default namespace used for your Cribl metrics internal Source.|
|`set_cribl_environment_field_name`|(Optional) Set this macro definition to the name of the field that specifies the environment a Cribl Stream instance belongs to.|

For manual configuration of the macro definitions through the CLI, append and update the following to `$SPLUNK_HOME/etc/apps/criblvision/local/macros.conf` on standalone Search Heads or `$SPLUNK_HOME/etc/shcluster/apps/criblvision/local/macros.conf` on Search Head Deployers for a Search Head Cluster:

```conf
[set_cribl_internal_log_index]
definition = index=cribl_logs

[set_cribl_log_sourcetype]
definition = sourcetype IN (cribl)

[set_cribl_metrics_index]
definition = index=cribl_metrics

[set_cribl_metrics_prefix(1)]
definition = cribl.logstream.$metric_name$

[set_cribl_environment_field_name]
definition = env
```

## Automatic Lookups

This app uses an automatic lookup to enrich events with the Worker Group (the `worker_group` field) on events from a Worker Node in a distributed environment. For more on automatic lookups, see Splunk's documentation [here](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/DefineanautomaticlookupinSplunkWeb).

When configuring an automatic lookup from the Splunk UI, ensure that the following values are set before clicking the `Save` button:

* **Lookup table**: `cribl_stream_workers`
* **Apply to:** `sourcetype`
* **named:** Your Cribl log sourcetype *Note:* You cannot use wildcards in this definition
* **Lookup input fields:** `worker` = `host`
* **Lookup output fields:** `worker_group` = `worker_group`

 For manual configuration of the automatic lookup definiton(s) through the CLI, append and update the following stanza to `$SPLUNK_HOME/etc/apps/criblvision/local/props.conf` on standalone Search Heads or `$SPLUNK_HOME/etc/shcluster/apps/criblvision/local/props.conf` on Search Head Deployers for a Search Head Cluster:

```conf
[your_sourcetype]
LOOKUP-cribl_stream_workers = cribl_stream_workers worker AS host OUTPUTNEW worker_group AS worker_group`</pre>
```

If you are using multiple sourcetypes for your internal Cribl logs and would like to use a wildcarded props definition over configuring multiple automated lookups, you can use the following stanza template:

```conf
[(?::){0}your_wildcarded_sourcetype]
```

If configuring manually, update the `$SPLUNK_HOME/etc/apps/criblvision/local/app.conf` configuration file to tell Splunk that this app has been configured:

```conf
[install]
is_configured = true
```