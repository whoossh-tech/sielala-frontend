// fontStyles.js
import { css } from 'styled-components';

export const reynaldoStyles = css`
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
  
  @font-face {
    font-family: 'Reynaldo';
    src: local('Reynaldo-Serif-Lean'), url('./reynaldo-serif-lean.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Reynaldo';
    src: local('Reynaldo-Italic-Lean'), url('./reynaldo-italic-lean.ttf') format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'Reynaldo';
    src: local('Reynaldo-Serif-Medium'), url('./reynaldo-serif-medium.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Reynaldo';
    src: local('Reynaldo-Italic-Medium'), url('./reynaldo-italic-medium.ttf') format('truetype');
    font-weight: 700;
    font-style: italic;
  }

  p {
    font-family: 'Montserrat';
  }

  .montserrat-lean {
    font-family: 'Montserrat';
  }

  .montserrat-med {
    font-family: 'Montserrat';
    font-weight: 800;
  }

  h1 {
    font-family: 'Reynaldo';
    src: local('Reynaldo-Serif-Medium'), url('./reynaldo-serif-medium.ttf') format('truetype');
    font-weight: 700;
    font-size: 2rem;
    font-style: normal;
  }

  .reynaldo-italic-med {
    font-family: 'Reynaldo';
    src: local('Reynaldo-Italic-Medium'), url('./reynaldo-italic-medium.ttf') format('truetype');
    font-weight: 700;
    font-style: italic;
  }

  .reynaldo-italic-lean {
    font-family: 'Reynaldo';
    src: local('Reynaldo-Italic-Lean'), url('./reynaldo-italic-lean.ttf') format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  .reynaldo-serif-med {
    font-family: 'Reynaldo';
    src: local('Reynaldo-Serif-Medium'), url('./reynaldo-serif-medium.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  .reynaldo-serif-lean {
    font-family: 'Reynaldo';
    src: local('Reynaldo-Serif-Lean'), url('./reynaldo-serif-lean.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
`;
