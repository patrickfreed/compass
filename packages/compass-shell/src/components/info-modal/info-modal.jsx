import { TextButton } from 'hadron-react-buttons';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Modal } from 'react-bootstrap';
import { H3, Link } from '@mongodb-js/compass-components';
import { createLoggerAndTelemetry } from '@mongodb-js/compass-logging';
const { track } = createLoggerAndTelemetry('COMPASS-IMPORT-EXPORT-UI');

import packageJson from '../../../package.json';

const mongoshVersion = `v${packageJson.dependencies['@mongosh/browser-repl'].replace('^', '')}`;

import styles from './info-modal.module.less';

const hotkeys = [
  {
    key: 'Ctrl+`',
    description: 'Toggle shell.'
  },
  {
    key: 'Ctrl+A',
    description: 'Moves the cursor to the beginning of the line.'
  },
  {
    key: 'Ctrl+B',
    description: 'Moves the cursor Backward one character.'
  },
  {
    key: 'Ctrl+C',
    description: 'Stop currently running command.'
  },
  {
    key: 'Ctrl+D',
    description: 'Deletes the next character.'
  },
  {
    key: 'Ctrl+E',
    description: 'Moves the cursor to the end of the line.'
  },
  {
    key: 'Ctrl+F',
    description: 'Moves the cursor Forward one character.'
  },
  {
    key: 'Ctrl+H',
    description: 'Erases one character, similar to hitting backspace.'
  },
  {
    key: 'Ctrl/Cmd+L',
    description: 'Clears the screen, similar to the clear command.'
  },
  {
    key: 'Ctrl+T',
    description: 'Swap the last two characters before the cursor.'
  },
  {
    key: 'Ctrl+U',
    description: 'Changes the line to Uppercase.'
  }
];

/**
 * Show information on how to use the shell in compass.
 */
export class InfoModal extends PureComponent {
  static propTypes = {
    hideInfoModal: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  };

  showHandler = () => {
    track('Screen', { name: 'shell_info_modal' });
  };

  /**
   * Render the component.
   *
   * @returns {React.Component} The component.
   */
  render() {
    const {
      hideInfoModal,
      show
    } = this.props;

    return (
      <Modal
        restoreFocus={false}
        onEscapeKeyDown={hideInfoModal}
        show={show}
        onShow={this.showHandler}
        // Because this modal is rendered outside of the
        // react root we need to apply the deprecated bootstrap styles here.
        className="with-global-bootstrap-styles"
      >
        <Modal.Header closeButton onHide={hideInfoModal}>
          <H3>mongosh {mongoshVersion}</H3>
        </Modal.Header>
        <Modal.Body>
          <div className={styles['info-modal-banner']}>
            More information on this release of the&nbsp;
            <Link
              id="mongosh-info-link"
              rel="noreopener"
              href="https://docs.mongodb.com/compass/beta/embedded-shell/"
              target="_blank"
            >MongoDB Shell</Link>
          </div>
          <div className={styles['info-modal-shortcuts-title']}>
            Keyboard Shortcuts
          </div>
          <div className={styles['info-modal-shortcuts']}>
            {hotkeys.map(shortcut => (
              <div
                className={styles['info-modal-shortcuts-hotkey']}
                key={`short-cut-${shortcut.key}`}
              >
                <span
                  className={styles['info-modal-shortcuts-hotkey-key']}
                >{shortcut.key}</span>{shortcut.description}
              </div>
            ))}
            <div className={styles['info-modal-shortcuts-hotkey']}>
              <span
                className={styles['info-modal-shortcuts-hotkey-key']}
              >&uarr;</span>Cycle backwards through command history.
            </div>
            <div className={styles['info-modal-shortcuts-hotkey']}>
              <span
                className={styles['info-modal-shortcuts-hotkey-key']}
              >&darr;</span>Cycle forwards through command history.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <TextButton
            id="close-info-modal"
            className="btn btn-default btn-sm"
            text="Close"
            clickHandler={hideInfoModal}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default InfoModal;
