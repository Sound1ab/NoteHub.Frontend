import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import { Heading, Icon } from '..'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'

ReactModal.setAppElement('#root')

interface IModal {
  isOpen: boolean
  onRequestClose: () => void
  title: string
  onContinue: () => void
  className?: string
  children?: ReactNode
  contentLabel?: string
  role?: string
}

export function ReactModalAdapter({
  isOpen,
  onRequestClose,
  onContinue,
  title,
  className = 'ReactModal',
  contentLabel,
  role,
  children,
}: IModal) {
  const contentClassName = `${className}__content`
  const overlayClassName = `${className}__overlay`
  return (
    <ReactModal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      isOpen={isOpen}
      contentLabel={contentLabel}
      closeTimeoutMS={150}
      role={role}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      <div className="heading-wrapper">
        <Heading type="h3">{title}</Heading>
        <span className="close" onClick={onRequestClose}>
          <Icon icon="times" color={COLOR.MEDIUM} size="lg" />
        </span>
      </div>
      {children}
      <div className="button-wrapper">
        <button onClick={onRequestClose}>Cancel</button>
        <button onClick={onContinue}>Continue</button>
      </div>
    </ReactModal>
  )
}

export const Modal = styled(ReactModalAdapter)`
  &__overlay {
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 12;
    outline: none;

    & :-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0 #000;
    }

    &.ReactModal__Overlay--after-open {
      opacity: 1;
      transition: opacity 150ms;
    }

    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    overflow: auto;
    transform: translate(-50%, -50%);
    max-width: ${({ theme }) => theme.spacing.xxxl};
    width: 80%;
    padding: ${({ theme }) => theme.spacing.s};
    z-index: 12;
    outline: none;
    background-color: ${({ theme }) => theme.colors.background.primary};
    border: 1px solid ${({ theme }) => theme.colors.text.secondary};

    &.ReactModal__Content--after-open {
    }

    &.ReactModal__Content--before-close {
    }
  }

  .heading-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .close {
    cursor: pointer;
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-start;

    * + * {
      margin-left: ${({ theme }) => theme.spacing.s};
    }
  }

  button {
    margin-top: ${({ theme }) => theme.spacing.s};
  }
`
