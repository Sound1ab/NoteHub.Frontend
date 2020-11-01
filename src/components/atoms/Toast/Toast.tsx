import React from 'react'
import { Slide, ToastContainer } from 'react-toastify'

import { styled } from '../../../theme'
import { Icon } from '..'

export function Toast() {
  return (
    <StyledToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      transition={Slide}
      closeButton={<Icon size="1x" icon="times" />}
    />
  )
}

const StyledToastContainer = styled(ToastContainer)`
  z-index: 9999;
  transform: translate3d(0, 0, 9999px);
  position: fixed;
  width: 100vw;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.primary};
  top: 0;
  right: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: ${({ theme }) => theme.spacing.xxxl};
    top: ${({ theme }) => theme.spacing.xs};
    right: ${({ theme }) => theme.spacing.xs};
  }

  .Toastify__toast {
    position: relative;
    min-height: ${({ theme }) => theme.spacing.l};
    box-sizing: border-box;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    border-radius: 1px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1),
      0 2px 15px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    max-height: 800px;
    overflow: hidden;
    cursor: pointer;
  }
  }
  .Toastify__toast--default {
    background: ${({ theme }) => theme.colors.background.quinary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  .Toastify__toast--info {
    background: #3498db;
  }
  .Toastify__toast--success {
    background: #07bc0c;
  }
  .Toastify__toast--warning {
    background: #f1c40f;
  }
  .Toastify__toast--error {
    background: #e74c3c;
  }
  .Toastify__toast-body {
    margin: auto 0;
    flex: 1 1 auto;
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast {
      margin-bottom: 0;
    }
  }
  .Toastify__close-button {
    color: ${({ theme }) => theme.colors.text.primary};
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: 0.3s ease;
    align-self: flex-start;
  }
  .Toastify__close-button > svg {
    fill: currentColor;
    height: 16px;
    width: 14px;
  }
  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    opacity: 1;
  }

  @keyframes Toastify__trackProgress {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
  .Toastify__progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${({ theme }) => theme.spacing.xxs};
    z-index: 9999;
    background-color: ${({ theme }) => theme.colors.background.primary};
    transform-origin: left;
  }
  .Toastify__progress-bar--animated {
    animation: Toastify__trackProgress linear 1 forwards;
  }
  .Toastify__progress-bar--controlled {
    transition: transform 0.2s;
  }
  .Toastify__progress-bar--default {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  @keyframes Toastify__slideInRight {
    from {
      transform: translate3d(110%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(110%, 0, 0);
    }
  }
  .Toastify__slide-enter--top-right,
  .Toastify__slide-enter--bottom-right {
    animation-name: Toastify__slideInRight;
  }
  .Toastify__slide-exit--top-right,
  .Toastify__slide-exit--bottom-right {
    animation-name: Toastify__slideOutRight;
  }
`
