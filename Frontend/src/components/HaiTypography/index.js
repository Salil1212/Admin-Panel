import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// import { HaiIcon } from '../HaiIcon';
import PropTypes from 'prop-types';

// Define the HaiTypography component
export const HaiTypography = (props) => {
  let { variant, color, align, body, label, display, margin, icon, component, noWrap, sx, iconColor, ...rest } = props;
  const theme = createTheme({
    typography: {
      htmlFontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: {
        fontWeight: 600,
        fontSize: '2.375rem',
        lineHeight: 1.21
      },
      h2: {
        fontWeight: 600,
        fontSize: '1.875rem',
        lineHeight: 1.27
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.33
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4
      },
      h5: {
        fontWeight: 700,
        fontSize: '1rem',
        lineHeight: 1.5
      },
      h6: {
        fontWeight: 600,
        fontSize: '0.875rem',
        lineHeight: 1.57
      },
      caption: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.66
      },
      body1: {
        fontSize: '0.8rem',
        lineHeight: 1.57
      },
      body2: {
        fontSize: '0.75rem',
        lineHeight: 1.66,
        fontWeight: 400,
        color: '#656565'
      },
      body3: {
        fontSize: '0.65rem',
        lineHeight: 1.66,
        fontWeight: 300,
        color: '#656565'
      },
      subtitle1: {
        fontSize: '0.875rem',
        fontWeight: 700,
        lineHeight: 1.57
      },
      subtitle2: {
        fontSize: '0.813rem',
        fontWeight: 500,
        lineHeight: 1.66
      },
      aichat: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 2
      },
      overline: {
        lineHeight: 1.66
      },
      button: {
        textTransform: 'capitalize'
      },
      link: {
        color: '#1976d2',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
          cursor: 'pointer'
        }
      },
      customLink: {
        fontSize: '1rem',
        color: '#6495ED !important',
        '&:hover': {
          textDecoration: 'underline',
          cursor: 'pointer'
        }
      },
      helperText: {
        fontWeight: "400",
        fontSize: "0.75rem",
      },
      value: {
        fontWeight: "600",
        fontSize: "0.75rem",
        color: '#333333'
      },
    },
  });

  return (
    <>
      {/* Use the Typography component for title display */}
      <ThemeProvider theme={theme}>
        <Typography
          variant={variant} // Specify typography variant (default: 'body1') 'body1' | 'body2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline' | 'subtitle1' | 'subtitle2' | string
          color={color} // Set text color (default: 'inherit')
          align={align} // Set text alignment (default: 'inherit')
          display={display} // Use flex display for icon-text alignment (default: 'flex')
          margin={margin} // Apply margin to Typography (default: 0)
          noWrap={noWrap}
          alignItems="center"
          onClick={props?.onClick}
          sx={sx}
          {...rest}
        // component={component}
        >
          {/* {icon && <HaiIcon icon={icon} color={iconColor} />} Render the provided icon component (if exists) */}
          {label && <Typography sx={{ lineHeight: 2, color: "#656565", minWidth: "100px" }} variant="body2">{label}: &nbsp;&nbsp;</Typography>} {/* Render the label */}
          {body}
          {component}
        </Typography>
      </ThemeProvider>
    </>
  );
};

// Prop type validation
HaiTypography.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string,
  body: PropTypes.any,
  component: PropTypes.any,
  display: PropTypes.string,
  margin: PropTypes.number,
  visibility: PropTypes.any,
  sx: PropTypes.any,
  onClick: PropTypes.func,
  icon: PropTypes.any,
  label: PropTypes.string,
  noWrap: PropTypes.bool,
  iconColor: PropTypes.string,
};

// Default props for the HaiTypography component
HaiTypography.defaultProps = {
  variant: 'body1',
  color: 'inherit',
  align: 'inherit',
  body: '',
  display: 'flex',
  margin: 0,
  label: '',
  iconColor: 'primary'
};