import * as Setup from './store_criblvision_properties.js';

define(['react', 'splunkjs/splunk'], function(react, splunk_js_sdk){
  const e = react.createElement;

  class CriblVisionSetupPage extends react.Component {
    constructor(props){
      super(props);

      this.state = {
        set_cribl_internal_log_index: 'cribl_logs',
        set_cribl_log_sourcetype: '',
        set_cribl_metrics_index: 'cribl_metrics',
        set_cribl_metrics_prefix: 'cribl.logstream.',
        set_cribl_environment_field_name: 'env'
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
      this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    async handleSubmit(event){
      event.preventDefault();

      await Setup.perform(splunk_js_sdk, this.state);
    }

    render(){
      return e('div', { style: { textAlign: 'center' } }, [
        e('h1', null, 'CriblVision Setup'),
        e('hr', { style: { borderTop: '3px solid #bbb' } }),
        e('div', null, [
          e('h2', { style: { fontWeight: 'bold' } }, 'Logs and Metrics'),
          e('p', null, [
            'Cribl internal logs and metrics must be enabled and forwarded to Splunk in order for all of the panels to populate with events. Refer to the documentation ',
            e('a', { href: 'https://docs.cribl.io/stream/sources-cribl-internal/#configuring-cribl-internal-logsmetrics-as-a-datasource', target: '_blank' }, 'here'),
            ' for instructions on configuring this source. Be sure to configure a corresponding index and sourcetype field for logs and a corresponding index for metrics.'
          ])
        ]),
        e('div', null, [
          e('h2', { style: { fontWeight: 'bold' } }, 'Macros'),
          e('p', null, 'This app ships with four macros which must be configured in accordance with your Splunk index naming schema:'),
          e('div', { style: { display: 'block' } }, e('form', { style: { display: 'table', marginLeft: 'auto', marginRight: 'auto' } }, [
            e('p', { style: { display: 'table-row' } }, [
              e('label', { style: { display: 'table-cell', textAlign: 'left', marginBottom: '1em', paddingRight: '1em' } }, 'Cribl Internal Log Splunk Index:'),
              e('input', { style: { display: 'table-cell', marginBottom: '1em' }, type: 'text', name: 'set_cribl_internal_log_index', value: this.state.set_cribl_internal_log_index, onChange: this.handleChange })
            ]),
            e('p', { style: { display: 'table-row' } }, [
              e('label', { style: { display: 'table-cell', textAlign: 'left', marginBottom: '1em', paddingRight: '1em' } }, 'Cribl Internal Log Sourcetype(s):'),
              e('input', { style: { display: 'table-cell', marginBottom: '1em' }, type: 'text', name: 'set_cribl_log_sourcetype', value: this.state.set_cribl_log_sourcetype, onChange: this.handleChange })
            ]),
            e('p', { style: { display: 'table-row' } }, [
              e('label', { style: { display: 'table-cell', textAlign: 'left', marginBottom: '1em', paddingRight: '1em' } }, 'Cribl Metrics Splunk Index:'),
              e('input', { type: 'text', name: 'set_cribl_metrics_index', value: this.state.set_cribl_metrics_index, onChange: this.handleChange })
            ]),
            e('p', { style: { display: 'table-row' } }, [
              e('label', { style: { display: 'table-cell', textAlign: 'left', marginBottom: '1em', paddingRight: '1em' } }, 'Cribl Metrics Prefix:'),
              e('input', { style: { display: 'table-cell', marginBottom: '1em' }, type: 'text', name: 'set_cribl_metrics_prefix', value: this.state.set_cribl_metrics_prefix, onChange: this.handleChange })
            ]),
            e('p', { style: { display: 'table-row' } }, [
              e('label', { style: { display: 'table-cell', textAlign: 'left', marginBottom: '1em', paddingRight: '1em' } }, 'Cribl Environment Field Name:'),
              e('input', { style: { display: 'table-cell', marginBottom: '1em' }, type: 'text', name: 'set_cribl_environment_field_name', value: this.state.set_cribl_environment_field_name, onChange: this.handleChange })
            ])
          ]))
        ]),
        e('div', null, [
          e('h2', { style: { fontWeight: 'bold' } }, 'Leader Logs'),
          e('p', null, [
            'Some of the views in this app will require Leader logs to be forwarded onto Splunk. In distributed Cribl Stream environments, Leader logs are currently ',
            e('b', null, 'NOT'),
            ' sent via our internal source. You will need to install an Edge node on your Leader node and configure local log collection via a file monitoring input. Configure the file monitor input to collect logs by configuring the filename allow-list modal to ',
            e('code', null, '/opt/cribl/log/*.log'),
            '. For more information on how to deploy an Edge node, please refer to our documentation ',
            e('a', { href: 'https://docs.cribl.io/edge/deploy-planning', target: '_blank' }, 'here'),
            '. ',
            e('b', null, 'NOTE:'),
            ' When deploying the Edge Node to your Leader Node, we recommend having a separate Fleet just for this Node. Be sure to disable all other inputs on that Edge Node except for file monitor inputs.'
          ])
        ]),
        e('div', null, [
          e('h2', { style: { fontWeight: 'bold' } }, 'Cribl Stream Assets Lookup'),
          e('p', null, 'The CriblVision app utilizes a lookup to add context to its searches. This needs to be created to have the dashboards, searches, and reports work as expected. To create this lookup, either follow the instructions on the Welcome page after saving this configuration, or click the "Populate Cribl Stream Asset Lookup" item in the navigation bar.')
        ]),
        e('hr', { style: { borderTop: '3px solid #bbb' } }),
        e('button', { className: 'btn btn-primary', onClick: this.handleSubmit }, 'Save Configuration')
      ]);
    }
  }

  return e(CriblVisionSetupPage);
});
