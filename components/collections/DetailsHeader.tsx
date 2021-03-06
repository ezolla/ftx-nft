import Image from 'next/image'
import styled from 'styled-components'
import CurrencyFormat from 'react-currency-format'

import { Discord, Twitter, Web } from 'components/Icons'
import { CollectionDetails } from '../../safety/interfaces'

interface Props extends React.HTMLProps<HTMLDivElement> {
  details: CollectionDetails
}

const DetailsHeader = ({ details }: Props) => {
  return (
    <StyledHeader>
      {/* Banner */}
      <BannerContainer>
        {details && details.collectionDict.bannerImageUrl ? (
          <Image
            src={details.collectionDict.bannerImageUrl}
            alt={details.collectionDict.displayName}
            width={1512}
            height={220}
            layout='responsive'
          />
        ) : (
          <Image
            src='https://i.imgur.com/yQmxCQS.png'
            alt='Placeholder'
            width={1512}
            height={220}
            layout='responsive'
          />
        )}
      </BannerContainer>

      {/* Details */}
      <CollectionDetails>
        {/* Logo */}
        <LogoContainer>
          {details &&
          details.collectionDict.avatarImageUrl &&
          details.collectionDict.displayName ? (
            <Image
              src={details.collectionDict.avatarImageUrl}
              alt={details.collectionDict.displayName}
              width={150}
              height={150}
            />
          ) : (
            <Image
              src='https://i.imgur.com/AWgnjF3.png'
              alt='Placeholder'
              width={150}
              height={150}
            />
          )}
        </LogoContainer>

        {/* Title & Description */}
        <TextContainer>
          <h1>{details ? details.collectionDict.displayName : 'None'}</h1>
          {details && details.collectionDict.description ? (
            <p>{details.collectionDict.description}</p>
          ) : null}
        </TextContainer>

        {/* Socials */}
        <SocialContainer>
          {/* Twitter */}
          {details && details.collectionDict.twitterUrl ? (
            <a href={details.collectionDict.twitterUrl} target='_blank'>
              <Twitter />
            </a>
          ) : null}

          {/* Discord */}
          {details && details.collectionDict.discordUrl ? (
            <a href={details.collectionDict.discordUrl} target='_blank'>
              <Discord />
            </a>
          ) : null}

          {/* Website */}
          {details && details.collectionDict.homepageUrl ? (
            <a href={details.collectionDict.homepageUrl} target='_blank'>
              <Web />
            </a>
          ) : null}
        </SocialContainer>

        {/* Analytics */}
        <AnalyticsContainer>
          <AnalyticsContent>
            <Analytic>
              <p>NFTs</p>
              <p>{details && details.total ? details.total : '-'}</p>
            </Analytic>
            <Analytic>
              <p>Floor</p>
              <p>
                {details && details.floor_price ? details.floor_price : '-'}
              </p>
            </Analytic>
            <Analytic>
              <p>Volume</p>
              <p>
                {details && details.volume ? (
                  <CurrencyFormat
                    value={details.volume.toFixed()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                ) : (
                  '-'
                )}
              </p>
            </Analytic>
            <Analytic>
              <p>Open Auctions</p>
              <p>{details ? details.open_auctions : '-'}</p>
            </Analytic>
          </AnalyticsContent>
        </AnalyticsContainer>
      </CollectionDetails>
    </StyledHeader>
  )
}

export default DetailsHeader

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--color-mercury);
  padding-bottom: 64px;
`

const BannerContainer = styled.div`
  @media (max-width: 820px) {
    display: none;
  }
`

const LogoContainer = styled.div`
  img {
    border-radius: 100%;
  }
`

const CollectionDetails = styled.div`
  margin: -80px auto 0;
  text-align: center;

  @media (max-width: 820px) {
    margin-top: 20px;
  }
`

const TextContainer = styled.div`
  h1 {
    margin-top: 16px;
  }

  p {
    max-width: 400px;
    margin: 16px auto 0;
  }
`

const SocialContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;

  a {
    border: 1px solid var(--color-mercury);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    transition: 0.2s ease;

    path {
      transition: 0.2s ease;
    }

    :not(:last-child) {
      margin-right: 10px;
    }

    :hover {
      background: var(--color-alabaster);

      path {
        fill: var(--color-black);
      }
    }
  }
`

const AnalyticsContainer = styled.div`
  max-width: 600px;
  padding: 0 24px;
  margin: 0 auto;
`

const AnalyticsContent = styled.div`
  border: 1px solid var(--color-mercury);
  border-radius: 10px;
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 680px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Analytic = styled.div`
  padding: 20px;
  text-align: left;

  p:last-child {
    color: var(--color-black);
    font-size: 18px;
    font-weight: 500;
    margin-top: 8px;
  }

  :not(:last-child) {
    border-right: 1px solid var(--color-mercury);
  }

  @media (max-width: 680px) {
    :nth-child(1),
    :nth-child(3) {
      border-right: 1px solid var(--color-mercury);
    }

    :nth-child(1),
    :nth-child(2) {
      border-bottom: 1px solid var(--color-mercury);
    }

    :nth-child(2) {
      border-right: none;
    }
  }
`
