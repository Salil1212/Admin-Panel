import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import cx from 'clsx';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import PropTypes from 'prop-types';
import { Icon } from '@mui/material';

const useStyles = makeStyles(() => ({
  card: {
    display: 'grid',
    borderRadius: 8,
    minWidth: 25,
    margin: '10 px auto',
    textAlign: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    margin: 'auto',
  },
  CardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 14,
    marginBottom: '0.875em',
  },
}));

export const HaiCard = ({
  raised,
  title,
  subTitle,
  body,
  titleIcon,
  titleRequired,
  subTitleRequired,
  cardScroll,
  autoHeight,
  height,
  src,
  component,
  cardWidth,
  cardHeight,
  ...props
}) => {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();

  return (
    <Card
      // className={cx(styles.card, shadowStyles.root)}
      sx={{ width: cardWidth, height: cardHeight, ...props.sx }}
      raised={raised}
    >
      {(title || subTitle || titleIcon) && <CardHeader
        // className={cx(styles.CardHeader)}
        // sx={{ textAlign: 'center', fontSize: 40 }}
        title={titleRequired ? title : ''}
        subheader={subTitleRequired ? subTitle : ''}
        avatar={titleIcon && <Icon>{titleIcon}</Icon>}
        sx={{ ...props.header }}
      // action={titleRequired ? (title = { title }) : (title = '')}
      />}
      <CardActionArea>
        <CardMedia
          component={component}
          height={height}
          src={src}
          // image="https://picsum.photos/id/237/536/354"
          alt="black dog"
        />
      </CardActionArea>
      <CardContent
        style={{
          // overflowY: cardScroll ? 'scroll' : 'visible',
          // height: autoHeight ? 'auto' : '100px',
          ...props.content
        }}
      >
        {body}
      </CardContent>
    </Card>
  );
};

HaiCard.propTypes = {
  raised: PropTypes.bool,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  body: PropTypes.any,
  titleIcon: PropTypes.any,
  titleRequired: PropTypes.bool,
  subTitleRequired: PropTypes.bool,
  cardScroll: PropTypes.bool,
  autoHeight: PropTypes.bool,
  height: PropTypes.number,
  src: PropTypes.string,
  component: PropTypes.oneOf('video', 'audio', 'picture', 'iframe', 'img'),
  cardWidth: PropTypes.number,
  cardHeight: PropTypes.number,
};
HaiCard.defaultProps = {
  raised: true,
  // title: ' Title over here',
  // subTitle: 'Sub Title over here',
  // body: <></>,
  // titleIcon: <AccountCircleIcon />,
  titleRequired: true,
  subTitleRequired: true,
  // cardScroll: true,
  // autoHeight: true,
  // height: 300,
  // src: '',
  // component: '',
  // cardWidth: 300,
  // cardHeight: 500,
};
