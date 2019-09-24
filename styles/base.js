import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  // base.css
  html{
    font-size: 62.5%;
  }
  body {
    margin: 0;
    word-wrap: break-word;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }
  a {
    cursor: pointer;

    &:link,
    &:visited {
      color: inherit;
      text-decoration: none;
    }

  }
  h1,h2,h3,h4,h5, h6 {
    margin: 0;
    font-weight: 800;
  }
  #root {
    font-size: 1.6rem;
  }
`

export default GlobalStyle