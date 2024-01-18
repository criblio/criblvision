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
        set_cribl_metrics_prefix: 'cribl.logstream.'
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
      return e('div', null, [
        e('div', null, [
          e('h1', null, 'Logs and Metrics'),
          e('p', null, [
            'Cribl internal logs and metrics must be enabled and forwarded to Splunk in order for all of the panels to populate with events. Refer to the documentation ',
            e('a', { href: 'https://docs.cribl.io/stream/sources-cribl-internal/#configuring-cribl-internal-logsmetrics-as-a-datasource', target: '_blank' }, 'here'),
            ' for instructions on configuring this source. Be sure to configure a corresponding index and sourcetype field for logs and a corresponding index for metrics.'
          ])
        ]),
        e('div', null, [
          e('h1', null, 'Macros'),
          e('p', null, 'This app ships with four macros which must be configured in accordance with your Splunk index naming schema:'),
          e('form', null, [
            e('p', null, [
              e('label', null, [
                'Cribl Internal Log Splunk Index: ',
                e('input', { type: 'text', name: 'set_cribl_internal_log_index', value: this.state.set_cribl_internal_log_index, onChange: this.handleChange })
              ])
            ]),
            e('p', null, [
              e('label', null, [
                'Cribl Internal Log Sourcetype(s): ',
                e('input', { type: 'text', name: 'set_cribl_log_sourcetype', value: this.state.set_cribl_log_sourcetype, onChange: this.handleChange })
              ])
            ]),
            e('p', null, [
              e('label', null, [
                'Cribl Metrics Splunk Index: ',
                e('input', { type: 'text', name: 'set_cribl_metrics_index', value: this.state.set_cribl_metrics_index, onChange: this.handleChange })
              ])
            ]),
            e('p', null, [
              e('label', null, [
                'Cribl Metrics Prefix: ',
                e('input', { type: 'text', name: 'set_cribl_metrics_prefix', value: this.state.set_cribl_metrics_prefix, onChange: this.handleChange })
              ])
            ])
          ])
        ]),
        e('div', null, [
          e('h1', null, 'Leader Logs'),
          e('p', null, [
            'Some of the views in this app will require Leader logs to be forwarded onto Splunk. In distributed Cribl Stream environments, Leader logs are currently ',
            e('b', null, 'NOT'),
            ' sent via our internal source. You will need to install an Edge node on your Leader node and configure local log collection via a file monitoring input. Configure the file monitor input to collect logs by configuring the filename allow-list modal to ',
            e('code', null, '/opt/cribl/log/*.log'),
            '. For more information on how to deploy an Edge node, please refer to our documentation ',
            e('a', { href: 'https://docs.cribl.io/edge/deploy-planning', target: '_blank' }, 'here'),
            '. ',
            e('b', null, 'NOTE:'),
            ' When deploying the Edge node to your Leader node, we recommend having a separate fleet just for this node. Be sure to disable all other inputs on that Edge node except for file monitor inputs.'
          ])
        ]),
        e('button', { onClick: this.handleSubmit }, 'Save Configuration')
      ]);
    }
  }

  return e(CriblVisionSetupPage);
});
