import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Height } from '@material-ui/icons';

// Create your theme configuration
const theme = createTheme({
  //theme configuration goes here
});

// Defining a reusable HaiBox component
export const HaiBox = ({
  body,
  component,
  scroll,
  children,
  height,
  display,
  flexDirection,
  alignItems,
  gap,
  width,
  padding,
  backgroundColor,
  border,
  textAlign,
  flexGrow,
  ...props
}) => {
  return (
    <Box
      className={scroll ? "no-scrollbars" : ""}
      sx={{ mb: 2 }}
      height={height}
      component={component} // Set the type of container element (div, span, button, etc.)
      {...props} // Spread other props that are not explicitly used here
    // sx={{
    //   display: { display }, // Set the flex display property
    //   flexDirection: { flexDirection }, // Set the direction of flex items
    //   alignItems: { alignItems }, // Set horizontal alignment of flex items
    //   gap: { gap }, // Set the spacing between flex items
    //   width: { width }, // Set the width of the box
    //   padding: { padding }, // Set the padding of the box
    //   backgroundColor: { backgroundColor }, // Set the background color
    //   border: { border }, // Set the border styling
    //   textAlign: { textAlign }, // Set the text alignment
    //   flexGrow: { flexGrow },
    // }}
    >
      {children}
      {body} {/* Render the content passed to the component */}
    </Box >
  );
};

// Prop type validation
HaiBox.propTypes = {
  body: PropTypes.string, // Content inside the box
  component: PropTypes.oneOf(['div', 'span', 'button']), // Type of container element
  display: PropTypes.string, // Flex display property
  flexDirection: PropTypes.string, // Direction of flex items
  alignItems: PropTypes.string, // Horizontal alignment of flex items
  gap: PropTypes.number, // Spacing between flex items
  width: PropTypes.number, // Width of the box
  padding: PropTypes.number, // Padding of the box
  backgroundColor: PropTypes.string, // Background color
  border: PropTypes.string, // Border styling
  textAlign: PropTypes.string, // Text alignment
  flexGrow: PropTypes.number,
  scroll: PropTypes.bool,
  height: PropTypes.string,
};

// Default prop values for the HaiBox component
HaiBox.defaultProps = {
  body: '',
  component: 'div',
  display: 'flex',
  flexDirection: 'column',
  alignItems: '',
  gap: 16,
  width: '50%',
  padding: 2,
  backgroundColor: 'primary.main',
  border: '2px solid primary.main',
  textAlign: 'center',
  flexGrow: 0,
  scroll: true,
};
