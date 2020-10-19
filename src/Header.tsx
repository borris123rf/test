import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { typography, TypographyProps, flexbox, FlexboxProps, layout, LayoutProps, color, ColorProps, space, SpaceProps, fontSize, FontSizeProps, width, WidthProps, position, PositionProps } from 'styled-system'
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
type SystemT = { leftBorder?: boolean; visible?: boolean; transition?: string; uppercase?: boolean } & TypographyProps & FlexboxProps & LayoutProps & PositionProps & ColorProps & SpaceProps & FontSizeProps & WidthProps
const GlobalStyle = createGlobalStyle<{ isScrollable: boolean }>`
  body {
    overflow: ${props => (props.isScrollable ? 'auto' : 'hidden')};
  }
  *, ::after, ::before {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
`
const Box = styled.div<SystemT>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${layout}
  ${flexbox}
  ${typography}
  ${position}
  ${p => p.uppercase && `text-transform: uppercase;`}
  ${p => p.transition && `transition: ${p.transition};`}
  ${p => p.visible === true && `opacity: 1; visibility: visible;`}
  ${p => p.visible === false && 'opacity:0; visibility: hidden;'}
`

const Bar = styled(Box) <{ transparent?: boolean; transform?: string; open?: boolean }>`
  ${p => p.open && `
   ${p.transform ? `transform: ${p.transform};` : ''}
   ${p.transparent ? `opacity: 0;` : ''}
    `}
`

const A = styled.a`
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  display: flex;
  align-items: center;
  @media only screen and (min-width: 425px) {
    margin-left: 20px;
  }
  img {
    width: auto;
    height: auto;
    max-height: 18px;
    max-width: 100%;
    @media only screen and (min-width: 425px) {
      max-height: 24px;
    }
  }
  hr {
    margin: 0 10px 0 0;
    border-left: 2px solid #333;
    height: 32px;
    @media only screen and (min-width: 425px) {
      margin: 0 20px 0 0;
    }
  }
`

const Img = styled.img<SystemT>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${layout}
  ${typography}
  ${flexbox}
  ${p => p.uppercase && `text-transform: uppercase;`}
`

const Header = styled.header<SystemT>`
  ${space}
  ${layout}
  ${width}
  ${fontSize}
  ${position}
  ${flexbox}
  ${color}`

interface BaseProps {
  tools: 'fonts' | 'colors' | 'graphicmaker' | 'calendar' | 'speechmaker' | 'designsai'
  env: 'development' | 'production' | 'local'
}

interface PropsWithAuth {
  authentication: true
  isLogin: boolean
  name: string
  client: string
  redirect: string
}

interface PropsWithNoAuth {
  authentication: false
  isLogin?: boolean
  name?: string
  client?: string
  redirect?: string
}

type Props = BaseProps & (PropsWithAuth | PropsWithNoAuth)
const Logo = ({ apiUrl, origin, tools }: { apiUrl: string, origin: string, tools: string }) => {
  return (
    <Box m={12} display='flex' alignItems='center'>
      <a href={origin}>
        <Img src={`${apiUrl}/utilities/images/logo.png`} display={['none', 'none', 'block']} />
        <Img src={`${apiUrl}/utilities/images/logo-mobile.png`} width={40} display={['block', 'block', 'none']} />
      </a>
      <A href={`${origin}/${tools}`}>
        <hr />
        <Img src={`${apiUrl}/utilities/images/${tools}.png`} />
      </A>
    </Box>
  )
}

const Burger: React.FC<{ open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>, bg?: string }> = ({ open, setOpen, bg = 'purple' }) => {
  return <Box display={['block', 'block', 'none']} onClick={() => setOpen(!open)}>
    <Bar open={open} transform={'rotate(-45deg) translate(-6px, 6px)'} width={30} height={4} my={'6px'} transition='0.4s' bg={bg} />
    <Bar open={open} transparent width={30} height={4} my={'6px'} transition='0.4s' bg={bg} />
    <Bar open={open} transform={'rotate(45deg) translate(-8px, -8px)'} width={30} height={4} my={'6px'} transition='0.4s' bg={bg} />
  </Box>
}

export default function ({ env, tools, authentication, isLogin, name, client, redirect }: Props) {
  const [open, setOpen] = React.useState(false);
  let origin: string, apiUrl: string
  switch (env) {
    case 'local':
      origin = 'https://designs-ai.loc'
      apiUrl = 'https://api.designs-ai.loc'
      break
    case 'development':
      origin = 'https://dev.designs.ai'
      apiUrl = 'https://api.designs-ai.loc'
      break
    case 'production':
      origin = 'https://designs.ai'
      apiUrl = 'https://api.designs.ai'
      break
  }
  const loginUrl = '/user/login'
  const logoutUrl = '/user/logout'
  console.log(authentication, tools)
  return <React.Fragment>
    <GlobalStyle isScrollable={!open}></GlobalStyle>
    <Header bg='white' justifyContent='space-between' display='flex' position='fixed' zIndex={300} width={'100%'}>
      <Logo apiUrl={apiUrl} origin={origin} tools={tools} />
      <Box mx={12} display='flex' alignItems='center' justifyContent='center'>
        <Burger {...{ open, setOpen }} />
        <Box m={12} uppercase display={['none', 'none', 'flex']}>
          <Box>
            Products
          </Box>
          {isLogin ?
            <React.Fragment>
              {name}
            </React.Fragment>
            : <button onClick={() => {
              location.href = `${origin}${loginUrl}?client=${client}&redirect=${redirect}`
            }}>
              Login
            </button>
          }
        </Box>
      </Box>
      <Box width={[1, 1 / 2]} display={['block', 'block', 'none']} visible={open} transition='0.5s' bg='#333' zIndex={1001} position='fixed' height='100vh' overflow='auto' left={[0, '50%']} top={0}>
        <Box position='fixed' right={30} top={25} zIndex={1003}>
          <Burger {...{ open: true, setOpen, bg: 'white' }} />
        </Box>
        <Box height={65} width='100%' zIndex={1002} position='fixed' bg='linear-gradient(180deg, #333 0%, #333 15%, transparent 100%)' />
        <Box pt={65}>
          <Box>
            {isLogin ?
              <React.Fragment>
                {name}
              </React.Fragment>
              : <button onClick={() => {
                location.href = `${origin}${loginUrl}?client=${client}&redirect=${redirect}`
              }}>
                Login
                    </button>
            }
          </Box>
          <Box>

          </Box>
          <Box>
            <a href={`${origin}${logoutUrl}?client=${client}&redirect=${redirect}`}>Logout</a>
          </Box>
          <Box display='flex' >
            {socialMedia.map((Media, i) => (
              <a href={Media.url} key={i} target='_blank' rel='noreferrer noopener'>
                <Media.Icon />
              </a>
            ))}
          </Box>
        </Box>
      </Box>

      {/* <Box onClick={() => { console.log('close menu') }} /> */}

    </Header>
  </React.Fragment>
}


const socialMedia = [{
  Icon: FaFacebookF,
  url: 'https://facebook.com/DesignsdotAIOfficial'
},
{
  Icon: FaInstagram,
  url: 'https://www.instagram.com/DesignsdotAI/'
},
{
  Icon: FaTwitter,
  url: ' https://twitter.com/DesignsdotAI'
},
{
  Icon: FaLinkedin,
  url: ' https://www.linkedin.com/company/designs-ai/'
},
{
  Icon: FaYoutube,
  url: ' https://www.youtube.com/channel/UCHlJ9ySy3e7gQRQKaa4SUHA/'
}]