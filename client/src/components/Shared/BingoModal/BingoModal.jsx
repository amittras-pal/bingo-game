import React from "react";
import { Modal } from "react-bootstrap";
import "./BingoModal.scss";

/**
 *
 * @param { show } Boolean control the visibility of the modal
 * @param { showCloseBtn } Boolean control whether to show the close button on the header.
 * @param { centered } Boolean whether to center the dialog vertically.
 * @param { size } Boolean modal's size *
 *
 * @param { className } CSS Classname to add to the dialog
 *
 * @param { rootClose } Function whether user can close the modal by clicking outside. Must flip the 'show state'.
 *
 * @param { primaryLabel } String the label of the primary Action btn
 * @param { secondaryLabel } String the label of the secondary Action btn
 *
 * @param { headerContent } String text to show on the header
 * @param { bodyContent } Node JSX template to show in the modal body
 *
 * @param { footerActions } Array Array of 2 funtions
 * [secondaryAction: should close modal mandatorily, primaryAction: action for the right btn]
 * if not provided, rootClose is mandatory.
 */

function BingoModal({
  show,
  showCloseBtn = false,
  centered = true,
  size = "lg",
  className = "",
  rootClose,
  primaryLabel = "",
  secondaryLabel = "",
  headerContent,
  bodyContent,
  footerActions = null,
  primaryBtnColor,
  secondaryBtnColor,
}) {
  return (
    <Modal
      show={show}
      size={size}
      centered={centered}
      onHide={rootClose}
      dialogClassName={className}>
      <Modal.Header closeButton={showCloseBtn || !footerActions}>
        {headerContent}
      </Modal.Header>
      <Modal.Body>{bodyContent}</Modal.Body>
      {footerActions && (
        <Modal.Footer>
          <button
            className={`text-${secondaryBtnColor}`}
            onClick={footerActions?.[0]}>
            {secondaryLabel}
          </button>
          <div className="divider"></div>
          <button
            className={`text-${primaryBtnColor}`}
            onClick={footerActions?.[1]}>
            {primaryLabel}
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default BingoModal;
