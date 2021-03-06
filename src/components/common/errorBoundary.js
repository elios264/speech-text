import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DisplayMessage } from './displayMessage';
import { TextArea } from 'semantic-ui-react';

const b64EncodeUnicode = (str) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));

export class ErrorBoundary extends PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    const { children } = this.props;
    const { hasError, error, info } = this.state;

    if (!hasError)
      return children;

    const errorInfo = process.env.NODE_ENV === 'production'
      ? b64EncodeUnicode(JSON.stringify({ message: error.message, stack: error.stack, componentStack: info.componentStack }))
      : JSON.stringify({ message: error.message, stack: error.stack, componentStack: info.componentStack }, null, 2);

    return (
      <DisplayMessage
        helmet=':('
        header={<span className='f1' >:(</span>}
        content={(
          <>
              An intertal app error has ocurred
            <br/>
            <br />
              Click <a href='/' >her</a> to return to the main page.
            <br />
            <br />
              If you want to help, send me this error dump
            <br />
            <br />
            <TextArea
              className='w-100'
              value={errorInfo}
              rows={10}
              readOnly
            >
            </TextArea>
          </>)}
      />
    );

  }
}