import { React } from 'react';
import { Drawer, Box, } from '@mui/material';
import PropTypes from 'prop-types';
import { HaiIconButton } from '../HaiIconButton';
import { HaiTypography } from '../HaiTypography';
import { HaiGrid } from '../HaiGrid';
import { HaiDivider } from '../HaiDivider';

export const HaiDrawer = ({ text, isOpen, onClose, hideCloseIcon, title, bottom, top, ...props }) => {
  return (
    <>
      <Drawer
        text={text}
        anchor={props.anchor}
        onClose={onClose}
        open={isOpen}
        slotProps={{
          backdrop: {
            sx: {
              //backgroundColor: '#121621cc', // Custom backdrop color
            }
          }
        }}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: '0rem',
            margin: '0rem', 
            width: props.width,
            maxHeight: 'calc(100vh - 0rem)', 
            bgcolor: '##fbfbfb',
            boxShadow: '0px 8px 28px rgb(46 38 61 / 0.24)', 
          }
        }}
        {...props}
      >
        {hideCloseIcon ? null : (
          <>
            <HaiGrid container direction="row" p={2}>
              <HaiGrid p={1} item xs={11}>
                <HaiTypography variant="h5" body={title} sx={{
                  fontWeight: 500,
                  fontSize: '1.125rem',
                  lineHeight: 1.2,
                  color: '#212636',
                }} />
              </HaiGrid>
              <HaiGrid item xs={1} sx={{ justifyContent: 'flex-end' }} container alignItems="center">
                <HaiIconButton
                  icon="Clear"
                  onClick={onClose}
                  sx={{
                    color: '#656565', // Custom close button color
                    transition: 'transform 0.5s ease', // Smooth transition
                    "&:hover": {
                      transform: 'rotate(360deg)', // Rotate on hover
                    }
                  }}
                />
              </HaiGrid>
            </HaiGrid>
            <HaiDivider sx={{ml: '25px', mr: '25px'}} /> {/* No border for Divider */}
          </>
        )}
        {top ? (
          <HaiGrid container justifyContent="center" spacing={1} p={1} sx={{ padding: '1rem' }}>
            <HaiGrid item xs={12} md={6} >
              {top}
            </HaiGrid>
          </HaiGrid>
        ) : null}

        <Box className="no-scrollbars" p={1} sx={{ width: props.width, maxHeight: '100vh', height: '100vh', bgcolor: '##fbfbfb', padding: '1.8rem' }}>
          {text}
        </Box>

        {bottom ? (
          <HaiGrid container justifyContent="center" spacing={1} p={1} sx={{ padding: '1rem' }}>
            <HaiGrid item xs={12} md={6}>
              {bottom}
            </HaiGrid>
          </HaiGrid>
        ) : null}
      </Drawer>
    </>
  );
};




HaiDrawer.propTypes = {
  title: PropTypes.string,
  bottom: PropTypes.any,
  top: PropTypes.any,
  hideCloseIcon: PropTypes.bool,
  text: PropTypes.string,
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  elevation: PropTypes.any,
  hideBackdrop: PropTypes.bool,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

HaiDrawer.defaultProps = {
  text: 'text',
  anchor: 'right',
  elevation: 2,
  hideBackdrop: false,
  onClose: undefined,
  isOpen: false,
  variant: 'temporary',
};