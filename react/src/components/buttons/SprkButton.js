import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SprkSpinner from '../spinners/SprkSpinner';

const SprkButton = ({
  additionalClasses,
  analyticsString,
  children,
  isDisabled,
  disabled,
  element,
  idString,
  isSpinning,
  loading,
  variant,
  href,
  spinningAriaLabel,
  ...rest
}) => {
  let TagName;
  if (href && !element) {
    TagName = 'a';
  } else if (element) {
    TagName = element;
  } else {
    TagName = 'button';
  }
  let spinnerVariant;
  // TODO: Deprecate loading
  if (loading || isSpinning) {
    if (variant === 'secondary') {
      spinnerVariant = 'primary';
    }
    if (variant === 'tertiary') {
      spinnerVariant = 'secondary';
    }
    if (variant === 'quaternary') {
      spinnerVariant = 'dark';
    }
  }
  return (
    <TagName
      className={classnames(
        'sprk-c-Button',
        { 'sprk-c-Button--secondary': variant === 'secondary' },
        { 'sprk-c-Button--tertiary': variant === 'tertiary' },
        { 'sprk-c-Button--quaternary': variant === 'quaternary' },
        { 'sprk-is-Disabled': isDisabled || disabled },
        additionalClasses,
      )}
      role={TagName !== 'button' ? 'button' : undefined}
      data-id={idString}
      data-analytics={analyticsString}
      disabled={TagName !== 'a' ? isDisabled || disabled : undefined}
      href={TagName !== 'button' ? href : undefined}
      {...rest}
      // TODO: Deprecate loading
      {...((loading || isSpinning) && { 'aria-label': spinningAriaLabel })}
    >
      {/* TODO: Deprecate loading */}
      {((loading || isSpinning) && <SprkSpinner variant={spinnerVariant} />) ||
        children}
    </TagName>
  );
};

SprkButton.propTypes = {
  /**
   * A space-separated string of classes to
   * add to the outermost container of the component.
   */
  additionalClasses: PropTypes.string,
  /**
   * Assigned to the `data-analytics` attribute
   * serving as a unique selector for outside
   * libraries to capture data.
   */
  analyticsString: PropTypes.string,
  /** Content to render inside of the SprkButton */
  children: PropTypes.node,
  // TODO: Deprecate on next release
  /**
   * Deprecated: Use `isDisabled` instead.
   * Applies disabled style and the
   * disabled attribute to the element.
   */
  disabled: PropTypes.bool,
  /**
   * Applies disabled style and the
   * disabled attribute to the element.
   */
  isDisabled: PropTypes.bool,
  /**
   * Determines what element is rendered.
   * If an href is provided and an element is not,
   * an anchor tag will be rendered.
   * If no href or element is provided,
   * it will default to a button.
   */
  element: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
    PropTypes.elementType,
  ]),
  /**
   * Assigned to the `data-id` attribute serving as a
   * unique selector for automated tools.
   */
  idString: PropTypes.string,
  /**
   * Will cause a spinner to be
   * rendered in place of the button content.
   */
  isSpinning: PropTypes.bool,
  /**
   * Deprecated: Use `isSpinning` instead.
   * Will cause a spinner to be
   * rendered in place of the button content.
   */
  loading: PropTypes.bool,
  /**
   * Optional string value that is
   * set for the aria-label when `loading` is `true`.
   */
  spinningAriaLabel: PropTypes.string,
  /**
   *  Determines the corresponding button style.
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary']),
  /**
   * If an href is provided and no element is provided,
   * an anchor tag will be rendered.
   * The actual value is what is applied to the href attribute.
   */
  href: PropTypes.string,
};

// TODO: Remove loading and disabled at next release
SprkButton.defaultProps = {
  isDisabled: false,
  disabled: false,
  variant: 'primary',
  loading: false,
  isSpinning: false,
  spinningAriaLabel: 'Loading',
};

export default SprkButton;
