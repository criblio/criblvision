'use strict';

import * as Splunk from './splunk_helpers.js'
import * as Config from './setup_configuration.js';

const CRIBL_ENVIRONMENT_FIELD_NAME = 'set_cribl_environment_field_name';
const CRIBL_INTERNAL_LOG_INDEX_MACRO = 'set_cribl_internal_log_index';
const CRIBL_LOG_SOURCETYPE_MACRO = 'set_cribl_log_sourcetype';
const CRIBL_METRICS_INDEX_MACRO = 'set_cribl_metrics_index';
const CRIBL_METRICS_PREFIX = 'set_cribl_metrics_prefix';
const POPULATE_CRIBL_STREAM_WORKER_LOOKUP_SAVEDSEARCH = 'Populate Cribl Stream Worker Lookup';

function extract_macro_properties(setup_options){
  let { 
    set_cribl_internal_log_index,
    set_cribl_log_sourcetype,
    set_cribl_metrics_index,
    set_cribl_metrics_prefix,
    set_cribl_environment_field_name
  } = setup_options;

  return {
    [CRIBL_ENVIRONMENT_FIELD_NAME]: {
      defaultValue: 'env',
      value: set_cribl_environment_field_name.trim(),
      definition: value => value,
      isRequired: false,
    },
    [CRIBL_INTERNAL_LOG_INDEX_MACRO]: {
      defaultValue: 'cribl_logs',
      value: set_cribl_internal_log_index.trim(),
      definition: index => `index=${index}`,
      isRequired: true
    },
    [CRIBL_LOG_SOURCETYPE_MACRO]: {
      value: set_cribl_log_sourcetype.trim(),
      definition: sourcetypes => `sourcetype IN (${sourcetypes})`,
      isRequired: true
    },
    [CRIBL_METRICS_INDEX_MACRO]: {
      defaultValue: 'cribl_metrics',
      value: set_cribl_metrics_index.trim(),
      definition: index => `index=${index}`,
      isRequired: true
    },
    [CRIBL_METRICS_PREFIX]: {
      defaultValue: 'cribl.logstream.',
      value: set_cribl_metrics_prefix.trim(),
      definition: prefix => `${prefix}$metric_name$`,
      args: ['metric_name'],
      isRequired: true
    }
  }
}

export async function perform(splunk_js_sdk, setup_options){
    const app_name = 'criblvision';

    const application_name_space = {
        owner: 'nobody',
        app: app_name,
        sharing: 'app',
    };

    try{
      const service = Config.create_splunk_js_sdk_service(splunk_js_sdk, application_name_space);
      const macros = extract_macro_properties(setup_options);

      // check that values have been provided for each macro
      Object.keys(macros).forEach(key => {
        if((macros[key].value === undefined || macros[key].value.length === 0)){
          if(macros[key].isRequired){
            throw new Error(`Please enter a value for the "${key}" macro.`);
          }
          else{
            macros[key].value = macros[key].defaultValue;
          }
        }
      });

      // configure the macros
      for(let key in macros){
        let stanza = key;
        let properties = {
          definition: macros[key].definition(macros[key].value),
          iseval: 0
        };

        // handle macros with arguments
        if(macros[key].args !== undefined){
          stanza = `${stanza}(${macros[key].args.length})`;
          properties.args = macros[key].args.reduce((accumulator, currentValue) => `${accumulator},${currentValue}`, '').substr(1);
        }

        await Splunk.update_configuration_file(service, 'macros', stanza, properties);
      }

      // configure the automatic lookup(s)
      const lookup_property = { 'LOOKUP-cribl_stream_workers': 'cribl_stream_assets host AS host OUTPUTNEW instance_type AS instance_type worker_group AS worker_group' };
      for(let sourcetype of macros[CRIBL_LOG_SOURCETYPE_MACRO].value.split(',')){
        await Splunk.update_configuration_file(service, 'props', sourcetype.trim(), lookup_property);
      }

      await Config.complete_setup(service);
      await Config.reload_splunk_app(service, app_name);
      Config.redirect_to_splunk_app_homepage(app_name);
    }catch(error){
      console.log(error);
      alert(error);
    }
}
