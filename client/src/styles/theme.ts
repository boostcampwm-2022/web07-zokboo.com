export const widths = {
  base: `width: 1200px; 
  @media screen and (max-width: 1200px) { width: 1000px; }
  `,
  responsive: '100%',
};

export const margins = {
  sm: '',
  base: '',
  lg: '',
  xl: '',
};

export const paddings = {
  responsive: '0 20px',
  base: '',
  lg: '',
  xl: '',
};

export const fonts = {
  family: {
    base: '',
    title: '',
  },
  size: {
    xxs: '8px',
    xs: '12px',
    sm: '16px',
    lg: '18px',
    xl: '24px',
    xxl: '28px',
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

export const colors = {
  primary: '#EE842C',
  secondary: '#E8B387',
  error: '#FF322F',
  alert: '#3FFF3C',
  white: '#FFFFFF',
  offWhite: '#F8F8F8',
  line: '#D7D7D7',
  placeholder: '#BBBBBB',
  text: '#222222',
  gray1: '#ecf0f1',
  gray2: '#bdc3c7',
  gray3: '#95a5a6',
  gray4: '#7f8c8d',
};

export const device = {
  mobileLength: '575.98px', // 스마트폰 세로
  mobileWidth: '767.98px', // 스마트폰 가로
  tablet: '991.98px', // 타블렛
};

export const media = {
  mobileLength: `@media screen and (max-width: ${device.mobileLength})`, // 스마트폰 세로
  mobileWidth: `@media screen and (max-width: ${device.mobileWidth})`, // 스마트폰 가로
  tablet: `@media screen and (max-width: ${device.tablet})`, // 타블렛
};
